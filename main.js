(function () {
    const STORAGE_KEY = "mgt-theme";
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const html = document.documentElement;
    const copyStatus = document.getElementById("copyStatus");

    const getPreferred = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const applyTheme = (theme) => {
        html.setAttribute("data-theme", theme);
        icon.textContent = theme === "dark" ? "☀" : "☽";
    };

    applyTheme(getPreferred());

    toggle.addEventListener("click", () => {
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    });

    document.querySelectorAll(".tabs").forEach((tabGroup) => {
        const activateTab = (tab) => {
            const tabId = tab.getAttribute("data-tab");
            const parent = tabGroup.parentElement;

            tabGroup.querySelectorAll(".tab").forEach((t) => {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
                t.setAttribute("tabindex", "-1");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            tab.setAttribute("tabindex", "0");
            tab.focus();

            parent.querySelectorAll(".tab-content").forEach((c) => {
                c.classList.remove("active");
            });
            const target = parent.querySelector("#tab-" + tabId);
            if (target) target.classList.add("active");
        };

        tabGroup.addEventListener("click", (e) => {
            const tab = e.target.closest(".tab");
            if (tab) activateTab(tab);
        });

        tabGroup.addEventListener("keydown", (e) => {
            const tabs = Array.from(tabGroup.querySelectorAll(".tab"));
            const current = tabs.indexOf(e.target);
            if (current === -1) return;

            let next;
            if (e.key === "ArrowRight") {
                next = tabs[(current + 1) % tabs.length];
            } else if (e.key === "ArrowLeft") {
                next = tabs[(current - 1 + tabs.length) % tabs.length];
            } else if (e.key === "Home") {
                next = tabs[0];
            } else if (e.key === "End") {
                next = tabs[tabs.length - 1];
            }

            if (next) {
                e.preventDefault();
                activateTab(next);
            }
        });
    });

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".copy-btn");
        if (!btn) return;
        const text = btn.getAttribute("data-copy");
        const original = btn.textContent;
        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = "Copied!";
            copyStatus.textContent = "Copied to clipboard";
            setTimeout(() => {
                btn.textContent = original;
                copyStatus.textContent = "";
            }, 1500);
        }).catch(() => {
            btn.textContent = "Failed";
            copyStatus.textContent = "Copy failed";
            setTimeout(() => {
                btn.textContent = original;
                copyStatus.textContent = "";
            }, 1500);
        });
    });
})();
