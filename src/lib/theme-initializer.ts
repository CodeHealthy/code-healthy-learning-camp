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

    var favicon = document.querySelector('link[rel="icon"]');

    if (favicon) {
      favicon.href =
        resolvedTheme === "dark"
          ? "/favicon-dark.svg"
          : "/favicon-light.svg";

      favicon.type = "image/svg+xml";
    }
  } catch {
    document.documentElement.dataset.theme = "system";
  }
})();
`;