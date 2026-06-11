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

    const navSections = ["home","about","skills","projects","education","work","contact"];
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
            if (WEB3FORMS_ACCESS_KEY === "eaf73174-cf4c-4435-b8e0-20f47259aa93") {
                showAlert("Form not configured yet. Email me at shaktimaansingh376@gmail.com", "warning");
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
                else showAlert("Something went wrong. Please email me directly.", "danger");
            } catch {
                showAlert("Network error. Please email shaktimaansingh376@gmail.com", "danger");
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
});

AOS.init({ duration: 700, once: true, offset: 60, easing: "ease-out-cubic" });
