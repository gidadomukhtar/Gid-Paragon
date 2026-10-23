document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav-links");
    const navbar = document.querySelector("nav");

    if (menu && nav) {
        menu.addEventListener("click", () => {
            const isOpen = nav.classList.toggle("show");
            menu.setAttribute("aria-expanded", String(isOpen));
            menu.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("show");
                menu.setAttribute("aria-expanded", "false");
                menu.setAttribute("aria-label", "Open navigation menu");
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (navbar) {
        const updateNavbar = () => navbar.classList.toggle("scrolled", window.scrollY > 16);
        updateNavbar();
        window.addEventListener("scroll", updateNavbar, { passive: true });
    }

    const sections = document.querySelectorAll("main section[id], section[id]");
    const links = document.querySelectorAll("#nav-links a");
    if (sections.length && links.length) {
        const updateActiveLink = () => {
            let current = "";
            sections.forEach((section) => {
                if (window.scrollY >= section.offsetTop - 180) current = section.id;
            });
            links.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === "#" + current);
            });
        };
        updateActiveLink();
        window.addEventListener("scroll", updateActiveLink, { passive: true });
    }
});
