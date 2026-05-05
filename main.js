(function () {
    const STORAGE_KEY = "mgt-theme";
    const toggle = document.getElementById("themeToggle");
    const icon = document.getElementById("themeIcon");
    const html = document.documentElement;

    function getPreferred() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function apply(theme) {
        html.setAttribute("data-theme", theme);
        icon.textContent = theme === "dark" ? "☀" : "☽";
    }

    apply(getPreferred());

    toggle.addEventListener("click", function () {
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        apply(next);
    });
})();

(function () {
    document.querySelectorAll(".tabs").forEach(function (tabGroup) {
        tabGroup.addEventListener("click", function (e) {
            const tab = e.target.closest(".tab");
            if (!tab) return;
            const tabId = tab.getAttribute("data-tab");
            const parent = tabGroup.parentElement;
            tabGroup.querySelectorAll(".tab").forEach(function (t) {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            parent.querySelectorAll(".tab-content").forEach(function (c) {
                c.classList.remove("active");
            });
            const target = parent.querySelector("#tab-" + tabId);
            if (target) target.classList.add("active");
        });
    });

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".copy-btn");
        if (!btn) return;
        const text = btn.getAttribute("data-copy");
        navigator.clipboard.writeText(text).then(function () {
            const original = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(function () { btn.textContent = original; }, 1500);
        }).catch(function () {
            btn.textContent = "Failed";
            setTimeout(function () { btn.textContent = "Copy"; }, 1500);
        });
    });
})();
