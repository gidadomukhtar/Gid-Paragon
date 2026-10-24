(function () {
    "use strict";

    const fallbackPosts = [
        {
            "id": "why-beginners-should-learn-csharp-dotnet",
            "title": "Why Every Beginner Should Consider, Learning C# and .NET",
            "excerpt": "From web APIs to cloud applications, discover what C# and .NET offer beginners, what makes the ecosystem useful, and how to start learning real projects.",
            "date": "2026-10-24",
            "category": "Software Engineering",
            "featured": true,
            "tags": [
                "C#",
                ".NET",
                "Software Engineering",
                "Programming for beginners"
            ],
            "author": "Gid Paragon Team",
            "readTime": 8,
            "CoverImage": "",
            "url": "",
            "content": [
                {
                    "type": "paragraph",
                    "text": "choosing your first programming language cab feel overwhelming. There are many languages, frameworks, and career paths to explore. C# and .NET are worth considering because they provide a practical foundation for building different kinds of sofware, from web applications and APIs to desktop applications and cloud services."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "First, what are C# and .NET?"
                },
                {
                    "type": "paragraph",
                    "text": "C# is a modern, general-purpose programming language. It supports object oriented programming, strong typing, asynchronous programming, and many other features that help developers organize and maintain software."
                },
                {
                    "type": "paragraph",
                    "text": ".NET is a development platform that includes a runtime, libraries, tools, and frameworks for building and running applications. C# is one of the primary languages used with .NET, although .NET supports other languages too."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "what can you build with C# and .NET?"
                },
                {
                    "type": "list",
                    "items": [
                        "web applications using ASP.NET Core and Blazor",
                        "REST APIs for mobile apps, websites, and other servicess",
                        "Desktop applications using supported .NET UI frameworks",
                        "Cloud services and background processing systems",
                        "Games Using platforms such as Unity"
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "text": "Why beginners should consider this ecosystm"
                },
                {
                    "type": "paragraph",
                    "text": "C# offers clear syntax, useful compiler feedback, and features that help developers express their intentions in code. As projects grow, its type system and development tools can help catch mistakes and make code easier to maintain."
                },
                
                
    
            ]
        },
        {
            id: "building-a-stronger-gid-paragon-community",
            title: "Building a stronger Gid Paragon community",
            excerpt: "We are bringing our engineering, product, and learning conversations into one open community for people building the future with technology.",
            date: "2026-10-15",
            category: "Company Update",
            featured: true,
            tags: ["Gid Paragon", "Community", "Company News"],
            author: "Gid Paragon Team",
            readTime: 4,
            coverImage: "",
            url: "",
            content: [
                { type: "paragraph", text: "Gid Paragon is a technology community and company focused on building useful, secure, and accessible software." },
                { type: "heading", level: 2, text: "What is changing" },
                { type: "paragraph", text: "We are creating more spaces for developers, students, founders, and technology teams to learn from one another and share practical ideas." },
                { type: "list", items: ["More technical learning resources", "Community-led conversations and events", "Regular updates about our products and experiments"] },
                { type: "paragraph", text: "Thank you to everyone contributing their time, questions, and experience. We are excited to build the next chapter together." }
            ]
        },
        {
            id: "why-observability-matters-for-small-teams",
            title: "Why observability matters for small engineering teams",
            excerpt: "A practical introduction to logs, metrics, and traces, and how small teams can use them to make systems easier to understand.",
            date: "2026-09-28",
            category: "Technology",
            featured: false,
            tags: ["Observability", "Cloud", "Engineering"],
            author: "Gid Paragon Team",
            readTime: 6,
            coverImage: "",
            url: "",
            content: [
                { type: "paragraph", text: "Observability helps a team answer an important question: what is happening inside our system right now?" },
                { type: "heading", level: 2, text: "Three useful signals" },
                { type: "paragraph", text: "Logs provide detailed events, metrics show changes over time, and traces follow a request across services. Together, these signals turn an outage from a guessing exercise into an investigation." },
                { type: "heading", level: 3, text: "Start with the questions your team asks" },
                { type: "paragraph", text: "You do not need a complex platform on day one. Begin by recording the signals that help answer your most common support and reliability questions." }
            ]
        },
        {
            id: "a-small-javascript-project-with-big-learning",
            title: "A small JavaScript project with big learning",
            excerpt: "How a focused community exercise can teach the fundamentals of data, rendering, and accessible interaction without a framework.",
            date: "2026-08-12",
            category: "Learning",
            featured: false,
            tags: ["JavaScript", "Learning", "Community"],
            author: "Gid Paragon Team",
            readTime: 5,
            coverImage: "",
            url: "",
            content: [
                { type: "paragraph", text: "Small projects are a great way to practice the complete path from data to interface. A simple reading list can teach useful habits that transfer to larger applications." },
                { type: "heading", level: 2, text: "Keep rendering predictable" },
                { type: "code", language: "javascript", text: "const visiblePosts = posts.filter(post => post.title.includes(query));\nrenderPosts(visiblePosts);" },
                { type: "paragraph", text: "The important lesson is not the size of the project. It is learning to keep data, state, and UI updates clear enough that another person can understand and improve them." },
                { type: "list", items: ["Use meaningful names", "Make keyboard interactions work", "Handle empty and error states"] }
            ]
        }
    ];

    let posts = [];
    let activeCategory = "All";
    let searchTerm = "";

    const $ = (selector) => document.querySelector(selector);
    const text = (value) => document.createTextNode(String(value || ""));

    function safeImageSource(source) {
        if (!source || typeof source !== "string") return "";
        if (/^(https?:\/\/|\/|\.\/|\.\.\/|[a-zA-Z0-9_.-]+\/)/.test(source) && !/^javascript:/i.test(source)) {
            return source;
        }
        return "";
    }

    function formatDate(date) {
        const parsed = new Date(date + "T00:00:00");
        if (Number.isNaN(parsed.getTime())) return date;
        return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(parsed);
    }

    function createMeta(post) {
        const meta = document.createElement("div");
        meta.className = "post-meta";
        meta.append(text(formatDate(post.date)), text("•"), text(post.author || "Gid Paragon Team"), text("•"), text((post.readTime || 1) + " min read"));
        return meta;
    }

    function createTags(post) {
        const tags = document.createElement("div");
        tags.className = "post-tags";
        (Array.isArray(post.tags) ? post.tags : []).forEach((tag) => {
            const tagElement = document.createElement("span");
            tagElement.className = "post-tag";
            tagElement.append(text(tag));
            tags.append(tagElement);
        });
        return tags;
    }

    function createImage(post) {
        const source = safeImageSource(post.coverImage);
        if (!source) return null;
        const image = document.createElement("img");
        image.className = "card-image";
        image.src = source;
        image.alt = post.title + " cover";
        image.loading = "lazy";
        return image;
    }

    function createCard(post, featured) {
        const card = document.createElement("article");
        card.className = featured ? "featured-card" : "post-card";
        if (!featured) {
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", "Read " + post.title);
            card.addEventListener("click", () => openPost(post.id));
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPost(post.id);
                }
            });
        }

        const body = document.createElement("div");
        const badge = document.createElement("span");
        badge.className = "category-badge";
        badge.append(text(post.category));
        body.append(badge);

        const title = document.createElement("h3");
        title.append(text(post.title));
        body.append(title);

        const excerpt = document.createElement("p");
        excerpt.className = "post-excerpt";
        excerpt.append(text(post.excerpt));
        body.append(excerpt, createMeta(post), createTags(post));

        if (featured) {
            const image = createImage(post);
            if (image) card.append(image);
            card.append(body);
            card.addEventListener("click", () => openPost(post.id));
            card.tabIndex = 0;
            card.setAttribute("role", "button");
            card.setAttribute("aria-label", "Read " + post.title);
            card.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openPost(post.id);
                }
            });
        } else {
            const image = createImage(post);
            if (image) card.append(image);
            card.append(body);
        }
        return card;
    }

    function renderCategories() {
        const container = $("#category-filters");
        container.replaceChildren();
        const categories = ["All", ...new Set(posts.map((post) => post.category).filter(Boolean).sort())];
        categories.forEach((category) => {
            const button = document.createElement("button");
            button.className = "category-button";
            button.type = "button";
            button.textContent = category;
            button.setAttribute("aria-pressed", String(category === activeCategory));
            button.addEventListener("click", () => {
                activeCategory = category;
                renderCategories();
                renderListing();
            });
            container.append(button);
        });
    }

    function filteredPosts() {
        return posts.filter((post) => {
            const matchesCategory = activeCategory === "All" || post.category === activeCategory;
            const searchable = [post.title, post.excerpt, ...(Array.isArray(post.tags) ? post.tags : [])].join(" ").toLowerCase();
            return matchesCategory && searchable.includes(searchTerm);
        });
    }

    function renderListing() {
        const list = $("#post-list");
        const featuredSection = $("#featured-section");
        const featuredContainer = $("#featured-post");
        const empty = $("#empty-state");
        const matching = filteredPosts();
        const featured = posts.find((post) => post.featured === true);
        list.replaceChildren();
        featuredContainer.replaceChildren();

        if (featured && activeCategory === "All" && !searchTerm) {
            featuredSection.hidden = false;
            featuredContainer.append(createCard(featured, true));
        } else {
            featuredSection.hidden = true;
        }

        matching.filter((post) => post !== featured).forEach((post) => list.append(createCard(post, false)));
        empty.hidden = matching.filter((post) => post !== featured).length > 0 || Boolean(featured && activeCategory === "All" && !searchTerm);
    }

    function appendContent(container, item) {
        if (!item || typeof item !== "object") return;
        if (item.type === "heading" && (item.level === 2 || item.level === 3)) {
            const heading = document.createElement("h" + item.level);
            heading.append(text(item.text));
            container.append(heading);
        } else if (item.type === "code") {
            const pre = document.createElement("pre");
            const code = document.createElement("code");
            if (item.language) code.className = "language-" + String(item.language).replace(/[^a-z0-9-]/gi, "");
            code.append(text(item.text));
            pre.append(code);
            container.append(pre);
        } else if (item.type === "list" && Array.isArray(item.items)) {
            const list = document.createElement("ul");
            item.items.forEach((entry) => {
                const listItem = document.createElement("li");
                listItem.append(text(entry));
                list.append(listItem);
            });
            container.append(list);
        } else if (item.type === "image") {
            const source = safeImageSource(item.src);
            if (source) {
                const image = document.createElement("img");
                image.className = "card-image";
                image.src = source;
                image.alt = item.alt || "Post image";
                image.loading = "lazy";
                container.append(image);
            }
        } else {
            const paragraph = document.createElement("p");
            paragraph.append(text(item.text));
            container.append(paragraph);
        }
    }

    function shareButton(label, action) {
        const button = document.createElement("button");
        button.type = "button";
        button.append(text(label));
        button.addEventListener("click", action);
        return button;
    }

    function openPost(id) {
        window.location.hash = "post=" + encodeURIComponent(id);
    }

    function renderPost() {
        const match = window.location.hash.match(/^#post=([^&]+)/);
        const postView = $("#post-view");
        const listing = $("#listing-view");
        const toolbar = $(".blog-toolbar");
        const featured = $("#featured-section");
        postView.replaceChildren();

        if (!match) {
            postView.hidden = true;
            listing.hidden = false;
            toolbar.hidden = false;
            featured.hidden = false;
            document.title = "Blog | Gid Paragon";
            renderListing();
            return;
        }

        const post = posts.find((entry) => entry.id === decodeURIComponent(match[1]));
        listing.hidden = true;
        toolbar.hidden = true;
        featured.hidden = true;
        postView.hidden = false;
        if (!post) {
            const message = document.createElement("p");
            message.className = "empty-state";
            message.append(text("That post could not be found."));
            postView.append(message, createBackLink());
            return;
        }

        document.title = post.title + " | Gid Paragon";
        postView.append(createBackLink());
        const header = document.createElement("header");
        const badge = document.createElement("span");
        badge.className = "category-badge";
        badge.append(text(post.category));
        const title = document.createElement("h1");
        title.append(text(post.title));
        header.append(badge, title, createMeta(post));
        const cover = createImage(post);
        if (cover) header.append(cover);
        postView.append(header);

        if (post.url) {
            const externalLink = document.createElement("a");
            externalLink.className = "external-link";
            externalLink.target = "_blank";
            externalLink.rel = "noopener noreferrer";
            externalLink.href = /^https?:\/\//i.test(post.url) ? post.url : "#";
            externalLink.append(text("Read on external site"));
            postView.append(externalLink);
        } else {
            const content = document.createElement("div");
            content.className = "post-content";
            (Array.isArray(post.content) ? post.content : []).forEach((item) => appendContent(content, item));
            postView.append(content);
        }

        const pageUrl = window.location.href;
        const share = document.createElement("div");
        share.className = "share-actions";
        share.setAttribute("aria-label", "Share this post");
        share.append(
            shareButton("Copy link", () => copyLink(pageUrl)),
            shareButton("LinkedIn", () => shareWindow("https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(pageUrl))),
            shareButton("X", () => shareWindow("https://x.com/intent/post?url=" + encodeURIComponent(pageUrl) + "&text=" + encodeURIComponent(post.title)))
        );
        postView.append(share);
    }

    function createBackLink() {
        const link = document.createElement("a");
        link.className = "back-link";
        link.href = "blog.html";
        link.append(text("← Back to all posts"));
        return link;
    }

    function shareWindow(url) {
        window.open(url, "_blank", "noopener,noreferrer");
    }

    function copyLink(url) {
        const button = document.activeElement;
        if (!navigator.clipboard) {
            if (button) button.textContent = "Copy the URL from your address bar";
            return;
        }
        navigator.clipboard.writeText(url).then(() => {
            if (button) button.textContent = "Link copied";
        }).catch(() => {
            if (button) button.textContent = "Copy failed — try again";
        });
    }

    function setupNavigation() {
        const menu = $("#menu");
        const nav = $("#nav-links");
        menu.addEventListener("click", () => {
            const expanded = nav.classList.toggle("show");
            menu.setAttribute("aria-expanded", String(expanded));
            menu.setAttribute("aria-label", expanded ? "Close navigation menu" : "Open navigation menu");
        });
        nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
            nav.classList.remove("show");
            menu.setAttribute("aria-expanded", "false");
            menu.setAttribute("aria-label", "Open navigation menu");
        }));
        window.addEventListener("scroll", () => {
            document.querySelector("nav").classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    function loadPosts() {
        return fetch("posts.json", { cache: "no-store" }).then((response) => {
            if (!response.ok) throw new Error("posts.json returned " + response.status);
            return response.json();
        }).then((data) => {
            if (!Array.isArray(data)) throw new Error("posts.json must contain an array");
            return data;
        }).catch((error) => {
            if (window.location.protocol === "file:") return fallbackPosts;
            throw error;
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        setupNavigation();
        $("#post-search").addEventListener("input", (event) => {
            searchTerm = event.target.value.trim().toLowerCase();
            renderListing();
        });
        window.addEventListener("hashchange", renderPost);
        loadPosts().then((data) => {
            posts = data.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
            renderCategories();
            renderPost();
        }).catch(() => {
            $("#load-error").hidden = false;
            $("#post-list").replaceChildren();
            $("#category-filters").replaceChildren();
        });
    });
}());
