/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "creamy-beige": "#F4E2D8",
        "soft-coral": "#D98375",
        "muted-teal": "#96A8A2",
        "dusty-rose": "#C8968D",
        "light-brown": "#cda58c",
        brown: "#ad7a5b",
        "dark-brown": "#360d02",
        "warm-brown": "#5D4436",
        "vintage-pink": "#DBA2A2",
        "light-peach": "#F5C6A5",
        peach: "#e9dbc0",
        "pale-mint": "#C5D4C2",
        "soft-olive-green": "#A8B196",
        "dusty-blue": "#A1B2B8",
        background: "#FAF7F2",
        "black-primary": "#1d0501",
      },
    },
  },
  plugins: [],
};
