(function () {
    var STORAGE_KEY = "mgt-theme";
    var toggle = document.getElementById("themeToggle");
    var icon = document.getElementById("themeIcon");
    var html = document.documentElement;

    function getPreferred() {
        var stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function apply(theme) {
        html.setAttribute("data-theme", theme);
        icon.textContent = theme === "dark" ? "☀" : "☽";
    }

    apply(getPreferred());

    toggle.addEventListener("click", function () {
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        localStorage.setItem(STORAGE_KEY, next);
        apply(next);
    });
})();

(function () {
    document.querySelectorAll(".tabs").forEach(function (tabGroup) {
        tabGroup.addEventListener("click", function (e) {
            var tab = e.target.closest(".tab");
            if (!tab) return;
            var tabId = tab.getAttribute("data-tab");
            var parent = tabGroup.parentElement;
            tabGroup.querySelectorAll(".tab").forEach(function (t) {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            parent.querySelectorAll(".tab-content").forEach(function (c) {
                c.classList.remove("active");
            });
            var target = parent.querySelector("#tab-" + tabId);
            if (target) target.classList.add("active");
        });
    });

    document.addEventListener("click", function (e) {
        var btn = e.target.closest(".copy-btn");
        if (!btn) return;
        var text = btn.getAttribute("data-copy");
        navigator.clipboard.writeText(text).then(function () {
            var original = btn.textContent;
            btn.textContent = "Copied!";
            setTimeout(function () { btn.textContent = original; }, 1500);
        });
    });
})();
