/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
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
            },
            fontSize: {
                twitter: {
                    heading: "20px",
                    normal: "15px",
                    small: "13px",
                },
            },
            // fontFamily: {
            //     twitter: ["TwitterChirp", "-apple-system", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
            // },
        },
        plugins: [],
    },
};
