export const themeInitializationScript = `
(function () {
  try {
    var storageKey = "codehealthy-theme";
    var storedTheme = window.localStorage.getItem(storageKey);

    var theme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : "system";

    var prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    var resolvedTheme =
      theme === "dark" || (theme === "system" && prefersDark)
        ? "dark"
        : "light";

    var root = document.documentElement;

    root.dataset.theme = theme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;

    document
      .querySelectorAll('link[rel~="icon"]')
      .forEach(function (link) {
        link.remove();
      });

    var favicon = document.createElement("link");
    var iconPath =
      resolvedTheme === "dark"
        ? "/favicon-dark.svg"
        : "/favicon-light.svg";

    favicon.id = "theme-favicon";
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.sizes = "any";
    favicon.href =
      iconPath +
      "?theme=" +
      resolvedTheme +
      "&v=2";

    document.head.appendChild(favicon);
  } catch {
    document.documentElement.dataset.theme = "system";
  }
})();
`;