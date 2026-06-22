// Get your free key at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "eaf73174-cf4c-4435-b8e0-20f47259aa93";

document.addEventListener("DOMContentLoaded", () => {
    const titles = [
        "Full-Stack Software Engineer",
        "Laravel & FastAPI Specialist",
        "AI Systems Builder",
        "API Architecture Expert",
    ];

    const el = document.querySelector(".typing");
    if (el) {
        let idx = 0, char = 0, forward = true, delay = 0;
        setInterval(() => {
            if (delay > 0) { delay--; return; }
            if (forward) {
                el.textContent = titles[idx].substring(0, char++);
                if (char > titles[idx].length) { forward = false; delay = 12; }
            } else {
                el.textContent = titles[idx].substring(0, char--);
                if (char < 0) { forward = true; idx = (idx + 1) % titles.length; delay = 4; }
            }
        }, 80);
    }

    const navbar = document.querySelector(".site-navbar");
    if (navbar) {
        window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 20), { passive: true });
    }

    const navSections = ["home","about","architecture","skills","projects","education","work","contact"];
    const navLinks = document.querySelectorAll("[data-nav]");
    const setActiveNav = () => {
        let current = "home";
        navSections.forEach(id => {
            const section = document.getElementById(id);
            if (section && window.scrollY >= section.offsetTop - 120) current = id;
        });
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + current));
    };
    window.addEventListener("scroll", setActiveNav, { passive: true });
    setActiveNav();

    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => backToTopBtn.classList.toggle("show", window.scrollY > 400), { passive: true });
    }

    const navCollapse = document.getElementById("navbarNav");
    navLinks.forEach(link => link.addEventListener("click", () => {
        if (navCollapse?.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }));

    const contactForm = document.getElementById("contactForm");
    const formAlert = document.getElementById("formAlert");
    const submitBtn = document.getElementById("submitBtn");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "REPLACE_WITH_YOUR_WEB3FORMS_KEY") {
                showAlert("Contact form is not configured yet. Please try again later.", "warning");
                return;
            }
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
            const formData = new FormData(contactForm);
            formData.append("access_key", WEB3FORMS_ACCESS_KEY);
            formData.append("subject", "Portfolio contact from " + formData.get("name"));
            try {
                const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
                const data = await res.json();
                if (data.success) { contactForm.reset(); showAlert("Your message has been sent successfully!", "success"); }
                else showAlert("Something went wrong. Please try again later.", "danger");
            } catch {
                showAlert("Network error. Please try again later.", "danger");
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = "Send Message <i class=\"bi bi-send ms-2\"></i>";
            }
        });
    }
    function showAlert(message, type) {
        if (!formAlert) return;
        formAlert.className = "alert alert-" + type + " mt-3 mb-0";
        formAlert.innerHTML = message;
        formAlert.classList.remove("d-none");
    }

    // KaamFind screenshot gallery
    const kaamfindMain = document.getElementById("kaamfindMain");
    const kaamfindCaption = document.getElementById("kaamfindCaption");
    const kaamfindBadge = document.getElementById("kaamfindBadge");
    const gallery = document.querySelector('[data-gallery="kaamfind"]');
    if (!gallery || !kaamfindMain) return;

    const setScreenshot = (tab) => {
        kaamfindMain.style.opacity = "0.4";
        kaamfindMain.src = tab.dataset.src;
        kaamfindMain.alt = tab.dataset.label || "KaamFind screenshot";
        kaamfindMain.onload = () => { kaamfindMain.style.opacity = "1"; };
        if (kaamfindCaption) kaamfindCaption.textContent = tab.dataset.label || "";
    };

    const activateTab = (tab) => {
        const portal = tab.closest("[data-portal-tabs]");
        portal?.querySelectorAll(".screenshot-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        setScreenshot(tab);
    };

    gallery.querySelectorAll(".screenshot-tab").forEach(tab => {
        tab.addEventListener("click", () => activateTab(tab));
    });

    gallery.querySelectorAll(".portal-switch").forEach(btn => {
        btn.addEventListener("click", () => {
            const portal = btn.dataset.portal;
            gallery.querySelectorAll(".portal-switch").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            gallery.querySelectorAll("[data-portal-tabs]").forEach(tabs => {
                tabs.classList.toggle("d-none", tabs.dataset.portalTabs !== portal);
            });
            if (kaamfindBadge) {
                kaamfindBadge.textContent = btn.dataset.badge || "";
                kaamfindBadge.className = "badge-portal " + (btn.dataset.badgeClass || "");
            }
            const firstTab = gallery.querySelector(`[data-portal-tabs="${portal}"] .screenshot-tab.active`)
                || gallery.querySelector(`[data-portal-tabs="${portal}"] .screenshot-tab`);
            if (firstTab) activateTab(firstTab);
        });
    });
});

AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });
