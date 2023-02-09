/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./docs/*.{html,js}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                twitter: {
                    blue: "#1d9bf0",
                    blue: "#1a8cd8",
                    dark: "#14171A",
                    textblack: "#0f1419",
                    gray: "#536471",
                    lightgray: "#AAB8C2",
                    lightergray: "#E1E8ED",
                    lightestgray: "#F5F8FA",
                    white: "#fff",
                    love: "#f91880",
                    retweet: "#00ba7c",
                },

                dim: {
                    50: "#5F99F7",
                    100: "#5F99F7",
                    200: "#38444d",
                    300: "#202e3a",
                    400: "#253341",
                    500: "#5F99F7",
                    600: "#5F99F7",
                    700: "#192734",
                    800: "#162d40",
                    900: "#15202b",
                },
            },
            animation: {
                "spin-fast": "spin 0.5s linear infinite",
            },
            fontSize: {
                twitter: {
                    heading: "20px",
                    normal: "15px",
                    small: "13px",
                },
            },
        },
    },
    plugins: [],
};
