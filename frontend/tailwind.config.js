import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          100: "#ffffff",
          200: "#e8e8e8",
          300: "#d1d1d1",
        },
        primary: "#66cc89",
        secondary: "#377bfc",
        accent: "#f58068",
        neutral: "#333d4d",
        info: "#00b5ff",
        success: "#00aa6e",
        warning: "#ffbe00",
        error: "#ff5861",
        lynkd: "#0466c8",
      },
    },
  },
};
