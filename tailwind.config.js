/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./services/**/*.{js,jsx,ts,tsx}",
    "./data/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],


  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        florae: {
          forest: "#3F5D3F",
          active: "#8BAF72",
          sage: "#A3B18A",
          background: "#F8F7F3",
          surface: "#FFFFFF",
          text: "#303B30",
          secondary: "#6B7280",
          border: "#E5E7EB",
          pale: "#E8EFE3",
        },
      },

      fontFamily: {
        lora: ["Lora_400Regular"],
        "lora-bold": ["Lora_700Bold"],
        nunito: ["NunitoSans_400Regular"],
        "nunito-semibold": ["NunitoSans_600SemiBold"],
        "nunito-bold": ["NunitoSans_700Bold"],
      },

      fontSize: {
        "florae-title": ["28px", { lineHeight: "36px" }],
        "florae-heading": ["24px", { lineHeight: "32px" }],
        "florae-card": ["17px", { lineHeight: "24px" }],
        "florae-body": ["14px", { lineHeight: "22px" }],
        "florae-small": ["12px", { lineHeight: "18px" }],
      },

      borderRadius: {
        florae: "16px",
      },
    },
  },

  plugins: [],
};