"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const storageKey = "codehealthy-theme";
const themeChangeEvent = "codehealthy-theme-change";
const darkModeQuery = "(prefers-color-scheme: dark)";

const themeOptions = [
    {
        value: "light" as const,
        label: "Light theme",
        icon: Sun,
    },
    {
        value: "system" as const,
        label: "Use system theme",
        icon: Monitor,
    },
    {
        value: "dark" as const,
        label: "Dark theme",
        icon: Moon,
    },
];

function isTheme(value: string | null | undefined): value is Theme {
    return value === "light" || value === "dark" || value === "system";
}

function readStoredTheme(): Theme {
    try {
        const storedTheme = window.localStorage.getItem(storageKey);

        return isTheme(storedTheme) ? storedTheme : "system";
    } catch {
        return "system";
    }
}

function readDocumentTheme(): Theme {
    const documentTheme = document.documentElement.dataset.theme;

    return isTheme(documentTheme) ? documentTheme : readStoredTheme();
}

function resolveTheme(theme: Theme): "light" | "dark" {
    if (theme === "system") {
        return window.matchMedia(darkModeQuery).matches ? "dark" : "light";
    }

    return theme;
}

function updateDocumentTheme(theme: Theme, persist: boolean) {
    const resolvedTheme = resolveTheme(theme);
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;

    updateFavicon(resolvedTheme);

    if (!persist) {
        return;
    }

    try {
        if (theme === "system") {
            window.localStorage.removeItem(storageKey);
        } else {
            window.localStorage.setItem(storageKey, theme);
        }
    } catch {
        // Theme still works when storage is unavailable.
    }
}
function changeTheme(theme: Theme) {
    updateDocumentTheme(theme, true);
    window.dispatchEvent(new Event(themeChangeEvent));
}

function subscribe(onStoreChange: () => void) {
    const systemTheme = window.matchMedia(darkModeQuery);

    function handleThemeChange() {
        onStoreChange();
    }

    function handleStorageChange(event: StorageEvent) {
        if (event.key !== storageKey) {
            return;
        }

        updateDocumentTheme(readStoredTheme(), false);
        onStoreChange();
    }

    function handleSystemThemeChange() {
        if (readDocumentTheme() !== "system") {
            return;
        }

        updateDocumentTheme("system", false);
        onStoreChange();
    }

    window.addEventListener(themeChangeEvent, handleThemeChange);
    window.addEventListener("storage", handleStorageChange);
    systemTheme.addEventListener("change", handleSystemThemeChange);

    return () => {
        window.removeEventListener(themeChangeEvent, handleThemeChange);
        window.removeEventListener("storage", handleStorageChange);
        systemTheme.removeEventListener("change", handleSystemThemeChange);
    };
}

function getThemeSnapshot(): Theme {
    return readDocumentTheme();
}

function updateFavicon(resolvedTheme: "light" | "dark") {
    const iconPath =
        resolvedTheme === "dark"
            ? "/favicon-dark.svg"
            : "/favicon-light.svg";

    document
        .querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')
        .forEach((link) => link.remove());

    const favicon = document.createElement("link");

    favicon.id = "theme-favicon";
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.sizes = "any";
    favicon.href = `${iconPath}?theme=${resolvedTheme}&v=2`;

    document.head.appendChild(favicon);
}

function getServerThemeSnapshot(): Theme {
    return "system";
}

export function ThemeSwitcher() {
    const theme = useSyncExternalStore(
        subscribe,
        getThemeSnapshot,
        getServerThemeSnapshot,
    );

    return (
        <div
            role="group"
            aria-label="Colour theme"
            className="inline-flex items-center rounded-xl border border-border bg-surface-muted p-1"
        >
            {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value;

                return (
                    <button
                        key={option.value}
                        type="button"
                        title={option.label}
                        aria-label={option.label}
                        aria-pressed={isSelected}
                        onClick={() => changeTheme(option.value)}
                        className={`inline-flex size-8 items-center justify-center rounded-lg transition ${isSelected
                            ? "bg-surface text-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-surface hover:text-foreground"
                            }`}
                    >
                        <Icon aria-hidden="true" className="size-4" />
                    </button>
                );
            })}
        </div>
    );
}