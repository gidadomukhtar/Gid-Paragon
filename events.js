
"use strict";

/*
 * CHAINDEV EVENTS HUB
 *
 * Add only confirmed events to these arrays.
 *
 * Upcoming event fields:
 * id, title, description, category, date, endDate,
 * time, location, format, status, registrationUrl,
 * detailsUrl, featured
 *
 * Dates must use YYYY-MM-DD format.
 */

const upcomingEvents = [
    /*
    {
        id: "chaindev-hackathon-2027",
        title: "ChainDev Community Hackathon",
        description: "Add a confirmed description of the event and what participants will build.",
        category: "hackathon",
        date: "2027-03-20",
        endDate: "2027-03-20",
        time: "10:00 AM",
        location: "Confirmed venue, Dutsin-Ma",
        format: "In person",
        status: "Registration Open",
        registrationUrl: "https://your-real-registration-link",
        detailsUrl: "",
        featured: true
    }
    */
];

/*
 * Past event fields:
 * id, title, description, date, location, recapUrl
 *
 * Add an event here only after it has actually happened.
 */

const pastEvents = [
    /*
    {
        id: "chaindev-past-event",
        title: "Your Completed ChainDev Event",
        description: "Describe what participants learned or built.",
        date: "2026-10-18",
        location: "Dutsin-Ma, Katsina State",
        recapUrl: ""
    }
    */
];

const eventsGrid = document.getElementById("events-grid");
const featuredContainer = document.getElementById("featured-event");
const pastGrid = document.getElementById("past-events-grid");
const pastEmpty = document.getElementById("past-events-empty");
const eventsEmpty = document.getElementById("events-empty");

const searchInput = document.getElementById("event-search");
const categoryFilter = document.getElementById("event-filter");
const resetFiltersButton = document.getElementById("reset-filters");

const categoryNames = {
    hackathon: "Hackathon",
    workshop: "Workshop",
    meetup: "Meetup",
    "build-session": "Build Session",
    online: "Online Event"
};

const categorySymbols = {
    hackathon: "</>",
    workshop: "{ }",
    meetup: "⌘",
    "build-session": "↗",
    online: "◎"
};

/* Create elements safely without inserting user content as HTML. */

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined && text !== null) {
        element.textContent = text;
    }

    return element;
}

function createLink(text, url, className) {
    const link = createElement("a", className, text);

    if (url) {
        link.href = url;
    }

    return link;
}

function formatDate(dateString) {
    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) {
        return "Date to be announced";
    }

    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(date);
}

function getCategoryName(category) {
    return categoryNames[category] || "Community Event";
}

function getCategorySymbol(category) {
    return categorySymbols[category] || "</>";
}

function getStatus(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(`${event.date}T00:00:00`);
    const end = new Date(
        `${event.endDate || event.date}T23:59:59`
    );

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return "Details to be confirmed";
    }

    if (today > end) {
        return "Completed";
    }

    if (today >= start && today <= end) {
        return "Happening Now";
    }

    return event.status || "Coming Soon";
}

function isUpcoming(event) {
    const end = new Date(
        `${event.endDate || event.date}T23:59:59`
    );

    return !Number.isNaN(end.getTime()) && end >= new Date();
}

function isPast(event) {
    const end = new Date(
        `${event.endDate || event.date}T23:59:59`
    );

    return !Number.isNaN(end.getTime()) && end < new Date();
}

function isSafeHttpUrl(url) {
    if (!url) {
        return false;
    }

    try {
        const parsed = new URL(url, window.location.href);

        return parsed.protocol === "https:" ||
            parsed.protocol === "http:";
    } catch {
        return false;
    }
}

function addEventBadges(container, event) {
    container.append(
        createElement(
            "span",
            "event-badge",
            getCategoryName(event.category)
        )
    );

    container.append(
        createElement(
            "span",
            "event-badge status",
            getStatus(event)
        )
    );
}

function createEventMeta(event) {
    const meta = createElement("div", "event-meta");

    const rows = [
        ["◷", formatDate(event.date) + (
            event.time ? ` · ${event.time}` : ""
        )],
        ["⌖", event.location || "Location to be announced"],
        ["◎", event.format || "Format to be announced"]
    ];

    rows.forEach(([symbol, value]) => {
        const row = createElement("span");
        row.append(
            createElement("span", "meta-icon", symbol),
            createElement("span", "", value)
        );
        meta.append(row);
    });

    return meta;
}

function createEventCard(event) {
    const card = createElement("article", "event-card");

    const art = createElement("div", "event-card-art");
    art.setAttribute("aria-hidden", "true");
    art.append(
        createElement("span", "", getCategorySymbol(event.category))
    );

    const body = createElement("div", "event-card-body");
    const badges = createElement("div", "event-badges");

    addEventBadges(badges, event);

    const title = createElement("h3", "", event.title);
    const description = createElement(
        "p",
        "event-card-description",
        event.description
    );

    body.append(
        badges,
        title,
        description,
        createEventMeta(event)
    );

    const footer = createElement("div", "event-card-footer");

    if (isSafeHttpUrl(event.registrationUrl)) {
        const link = createLink(
            "Register for event ↗",
            event.registrationUrl,
            "event-link"
        );

        link.target = "_blank";
        link.rel = "noopener noreferrer";
        footer.append(link);
    } else if (isSafeHttpUrl(event.detailsUrl)) {
        const link = createLink(
            "View event details ↗",
            event.detailsUrl,
            "event-link"
        );

        link.target = "_blank";
        link.rel = "noopener noreferrer";
        footer.append(link);
    } else {
        footer.append(
            createElement(
                "span",
                "event-link disabled",
                "Registration details coming soon"
            )
        );
    }

    body.append(footer);
    card.append(art, body);

    return card;
}

function renderFeaturedEvent() {
    const event = upcomingEvents.find(
        item => item.featured && isUpcoming(item)
    );

    featuredContainer.replaceChildren();

    if (!event) {
        const placeholder = createElement("div", "event-placeholder");

        placeholder.append(
            createElement("span", "placeholder-icon", "✳"),
            createElement("h3", "", "Something exciting is in the works."),
            createElement(
                "p",
                "",
                "Our next featured event will appear here once the details are confirmed."
            )
        );

        featuredContainer.append(placeholder);
        return;
    }

    const card = createElement("article", "featured-card");
    const content = createElement("div");
    const badges = createElement("div", "event-badges");

    addEventBadges(badges, event);

    content.append(
        badges,
        createElement("h3", "", event.title),
        createElement("p", "", event.description),
        createEventMeta(event)
    );

    if (isSafeHttpUrl(event.registrationUrl)) {
        const registerLink = createLink(
            "Register for this event ↗",
            event.registrationUrl,
            "btn btn-primary"
        );

        registerLink.target = "_blank";
        registerLink.rel = "noopener noreferrer";
        content.append(registerLink);
    } else if (isSafeHttpUrl(event.detailsUrl)) {
        const detailsLink = createLink(
            "View event details ↗",
            event.detailsUrl,
            "btn btn-primary"
        );

        detailsLink.target = "_blank";
        detailsLink.rel = "noopener noreferrer";
        content.append(detailsLink);
    }

    const art = createElement("div", "featured-art");
    art.setAttribute("aria-hidden", "true");
    art.append(
        createElement("span", "", getCategorySymbol(event.category))
    );

    card.append(content, art);
    featuredContainer.append(card);
}

function getFilteredEvents() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;

    return upcomingEvents
        .filter(isUpcoming)
        .filter(event => {
            const matchesCategory =
                category === "all" ||
                event.category === category ||
                (category === "online" &&
                    event.format?.toLowerCase().includes("online"));

            const searchableText = [
                event.title,
                event.description,
                event.category,
                event.location,
                event.format,
                event.status
            ].filter(Boolean).join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(query);

            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
}

function renderUpcomingEvents() {
    const events = getFilteredEvents();

    eventsGrid.replaceChildren();

    events.forEach(event => {
        eventsGrid.append(createEventCard(event));
    });

    eventsEmpty.hidden = events.length > 0;
    eventsGrid.hidden = events.length === 0;
}

function renderPastEvents() {
    const completedEvents = pastEvents
        .filter(event => event.date && isPast(event))
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    pastGrid.replaceChildren();

    completedEvents.forEach(event => {
        const card = createElement("article", "past-event-card");

        card.append(
            createElement("span", "past-date", formatDate(event.date)),
            createElement("h3", "", event.title),
            createElement("p", "", event.description),
            createElement("p", "", event.location || "Location not specified")
        );

        if (isSafeHttpUrl(event.recapUrl)) {
            const recapLink = createLink(
                "Read event recap ↗",
                event.recapUrl,
                ""
            );

            recapLink.target = "_blank";
            recapLink.rel = "noopener noreferrer";
            card.append(recapLink);
        }

        pastGrid.append(card);
    });

    pastEmpty.hidden = completedEvents.length > 0;
    pastGrid.hidden = completedEvents.length === 0;
}

function resetFilters() {
    searchInput.value = "";
    categoryFilter.value = "all";
    renderUpcomingEvents();
}

/* Mobile navigation, matching the existing site menu IDs. */

function setupNavigation() {
    const menu = document.getElementById("menu");
    const navLinks = document.getElementById("nav-links");

    if (!menu || !navLinks) {
        return;
    }

    menu.addEventListener("click", () => {
        const isOpen = menu.getAttribute("aria-expanded") === "true";

        menu.setAttribute("aria-expanded", String(!isOpen));
        menu.setAttribute(
            "aria-label",
            isOpen ? "Open navigation menu" : "Close navigation menu"
        );

        navLinks.classList.toggle("active", !isOpen);
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-label", "Open navigation menu");
            navLinks.classList.remove("active");
        });
    });
}

function initializeEventsPage() {
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderUpcomingEvents);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderUpcomingEvents);
    }

    if (resetFiltersButton) {
        resetFiltersButton.addEventListener("click", resetFilters);
    }

    setupNavigation();

    if (featuredContainer && eventsGrid && eventsEmpty && pastGrid && pastEmpty) {
        renderFeaturedEvent();
        renderUpcomingEvents();
        renderPastEvents();
    }
}

initializeEventsPage();