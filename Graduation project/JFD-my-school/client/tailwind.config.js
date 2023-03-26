/* eslint-disable no-undef */

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["SofiaPro", "Lato", "ui-sans-serif"],
        body: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
          "Hanka Rounded Sans Light",
        ],
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
          1: "#321E43",
          2: "#311D40",
          41: "#EFB257",
          42: "#EDE560", // alter-mcol_2
          46: "#e5e7eb", // // light-btn, bg-input
          47: "#3b82f6", // and opacity: .5
          // ============
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#103869", // Link, button color
          400: "#94a3b8",
          500: "#07182c", // Header color
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
        light: "#fcfcfc",
        // neutral: {
        //   300: "#85859f", // Link title,text
        //   500: "#3a4750"
        // },
        accent_1: {
          300: "#00d3ad", // Button text, border on dark mode
        },
        accent_2: {
          100: "#b9eff5", // paginate bg, border
        },
        transparent: "transparent",
        current: "currentColor",
      },
      spacing: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
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
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
