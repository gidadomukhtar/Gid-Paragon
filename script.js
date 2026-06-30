document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOBILE MENU
    ====================================== */

    const menu = document.getElementById("menu");
    const nav = document.getElementById("nav-links");

    menu.addEventListener("click", () => {
        nav.classList.toggle("show");
    });

    document.querySelectorAll("#nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("show");
        });
    });

    /* =====================================
       SMOOTH SCROLL
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /* =====================================
       NAVBAR ON SCROLL
    ====================================== */

    const navbar = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.padding = "12px 8%";
            navbar.style.background = "rgba(8,17,32,.92)";
            navbar.style.boxShadow = "0 12px 35px rgba(0,0,0,.35)";

        } else {

            navbar.style.padding = "18px 8%";
            navbar.style.background = "rgba(8,17,32,.72)";
            navbar.style.boxShadow = "none";

        }

    });

    /* =====================================
       TYPING EFFECT
    ====================================== */

    const words = [

        "Modern Software Engineering",

        "AI Powered Solutions",

        "Cloud Native Applications",

        "Scalable SaaS Platforms",

        "Enterprise Software",

        "Secure Digital Infrastructure"

    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const typing = document.getElementById("typing");

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {

            typing.textContent = currentWord.substring(0, charIndex++);

            if (charIndex > currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1500);

                return;

            }

        } else {

            typing.textContent = currentWord.substring(0, charIndex--);

            if (charIndex < 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

            }

        }

        setTimeout(typeEffect, deleting ? 45 : 90);

    }

    typeEffect();

    /* =====================================
       SCROLL REVEAL
    ====================================== */

    const reveals = document.querySelectorAll(

        ".service-card,.product-card,.why-card,.floating-card,.section-header,.about-text,.about-circle"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: 0.15

    });

    reveals.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(50px)";
        item.style.transition = ".8s ease";

        observer.observe(item);

    });

    /* =====================================
       ACTIVE NAVIGATION
    ====================================== */

    const sections = document.querySelectorAll("section");

    const links = document.querySelectorAll("#nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            if (scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* =====================================
       HERO FLOATING CARDS
    ====================================== */

    const cards = document.querySelectorAll(".floating-card");

    cards.forEach((card, index) => {

        card.animate([

            {

                transform: "translateY(0px)"

            },

            {

                transform: "translateY(-15px)"

            },

            {

                transform: "translateY(0px)"

            }

        ], {

            duration: 3500 + (index * 700),

            iterations: Infinity

        });

    });

    /* =====================================
       PARALLAX BACKGROUND
    ====================================== */

    window.addEventListener("mousemove", (e) => {

        const blobs = document.querySelectorAll(".bg-animation span");

        blobs.forEach((blob, i) => {

            const speed = (i + 1) * 0.008;

            const x = (window.innerWidth / 2 - e.clientX) * speed;

            const y = (window.innerHeight / 2 - e.clientY) * speed;

            blob.style.transform = `translate(${x}px, ${y}px)`;

        });

    });

});