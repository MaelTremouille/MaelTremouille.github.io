document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
    if (!menuButton || !navLinks) return;
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
        const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
        menuButton.setAttribute("aria-expanded", String(willOpen));
        navLinks.classList.toggle("is-open", willOpen);
        document.body.classList.toggle("menu-open", willOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) closeMenu();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            instance.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Re-align direct section links after the web fonts settle; otherwise a font
// swap can move the requested section underneath the sticky navigation.
if (window.location.hash) {
    document.fonts.ready.then(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ block: "start" });
    });
}

document.querySelectorAll("[data-print]").forEach((button) => {
    button.addEventListener("click", () => window.print());
});

const workToggles = document.querySelectorAll(".work-toggle");

function setWorkItemState(button, open) {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    button.setAttribute("aria-expanded", String(open));
    panel.hidden = !open;
    button.closest(".work-item")?.classList.toggle("is-open", open);
}

workToggles.forEach((button) => {
    button.addEventListener("click", () => {
        const willOpen = button.getAttribute("aria-expanded") !== "true";

        if (willOpen) {
            workToggles.forEach((otherButton) => {
                if (otherButton !== button) setWorkItemState(otherButton, false);
            });
        }

        setWorkItemState(button, willOpen);
    });
});
