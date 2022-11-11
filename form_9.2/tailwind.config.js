module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            extend: {
                fontFamily: {
                    display: ["Source Serif Pro", "Georgia", "serif"],
                    body: ["Synonym", "system-ui", "sans-serif"],
                },
                screens: {
                    sm: "640px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1280px",
                    "2xl": "1536px",
                },
                colors: {
                    primary: {
                        50: "#f8fafc",
                        100: "#f1f5f9",
                        200: "#e2e8f0",
                        300: "#cbd5e1",
                        400: "#94a3b8",
                        500: "#64748b",
                        600: "#475569",
                        700: "#334155",
                        800: "#1e293b",
                        900: "#0f172a",
                    },
                    secondary: {
                        50: "#ecfdf5",
                        100: "#d1fae5",
                        200: "#a7f3d0",
                        300: "#6ee7b7",
                        400: "#34d399",
                        500: "#10b981",
                        600: "#059669",
                        700: "#047857",
                        800: "#065f46",
                        900: "#064e3b",
                    },
                    transparent: "transparent",
                    current: "currentColor",
                },
                spacing: {
                    // sm: "8px",
                    // md: "12px",
                    // lg: "16px",
                    // xl: "24px",
                    13: "3.25rem",
                    15: "3.75rem",
                    128: "32rem",
                    144: "36rem",
                },
                borderRadius: {
                    none: "0",
                    sm: ".125rem",
                    DEFAULT: ".25rem",
                    lg: ".5rem",
                    full: "9999px",
                },
                transitionTimingFunction: {
                    DEFAULT: "ease-in-out",
                },
                transitionDuration: {
                    DEFAULT: "400ms",
                },
                keyframes: {
                    fadeIn: {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                    },
                },
                animation: {
                    fade: "fadeIn .5s ease-in-out",
                },
                zIndex: {
                    1: "1",
                    2: "2",
                    3: "3",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
