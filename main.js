(function () {
    const STORAGE_KEY = "mgt-theme";
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const html = document.documentElement;
    const copyStatus = document.getElementById("copyStatus");

    const safeStorage = {
        get(key) { try { return localStorage.getItem(key); } catch { return null; } },
        set(key, val) { try { localStorage.setItem(key, val); } catch { /* private browsing */ } }
    };

    const isDark = () => html.classList.contains("dark");

    const applyTheme = (theme) => {
        html.classList.toggle("dark", theme === "dark");
        icon.textContent = theme === "dark" ? "☀" : "☽";
    };

    icon.textContent = isDark() ? "☀" : "☽";

    toggle.addEventListener("click", () => {
        const next = isDark() ? "light" : "dark";
        safeStorage.set(STORAGE_KEY, next);
        applyTheme(next);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!safeStorage.get(STORAGE_KEY)) {
            applyTheme(e.matches ? "dark" : "light");
        }
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

    let copyTimeout = null;

    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".copy-btn");
        if (!btn) return;
        const text = btn.getAttribute("data-copy");
        const original = btn.textContent;

        if (copyTimeout) {
            clearTimeout(copyTimeout);
            copyTimeout = null;
        }

        navigator.clipboard.writeText(text).then(() => {
            btn.textContent = "Copied!";
            copyStatus.textContent = "Copied to clipboard";
        }).catch(() => {
            btn.textContent = "Failed";
            copyStatus.textContent = "Copy failed";
        }).finally(() => {
            copyTimeout = setTimeout(() => {
                btn.textContent = original;
                copyStatus.textContent = "";
                copyTimeout = null;
            }, 1500);
        });
    });
})();
