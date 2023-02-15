/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./docs/*.{html,js}"],
    darkMode: "class",
    theme: {
        extend: {
            container: {
                center: true,
                padding: "1rem",
            },
            colors: {
                main: {
                    white_0: "#fff",
                    white_100: "#EFF3F4",
                    blue_0: "#C9DFF2",
                    blue_100: "#1D9BF0",
                    blue_200: "#2e84bb",
                    love: "#f91880",
                    retweet: "#00ba7c",
                    black_0: "#0F1419BF",
                    black_100: "#000000",
                },
                dark: {
                    black_0: "#16181C",
                    black_100: "#000000A6",
                    gray_0: "#2F3336",
                    gray_100: "#202327",
                    gray_200: "#333639",
                    gray_300: "#16181c",
                    gray_400: "#0f1419bf",
                },

                light: {
                    white_0: "#FFFFFFD9",
                    gray_100: "#F7F9F9",
                    gray: "#CFD9DE",
                    black: "#0F1419",
                },
            },
            textColor: {
                main: {
                    white: "#ffffff",
                    black_0: "#0F1419",
                    black_100: "#000000",
                    blue: "#1D9BF0",
                },
                dark: {
                    gray_0: "#EFF3F4",
                    gray_100: "#E7E9EA",
                    gray_200: "#D6D9DB",
                    gray_300: "#71767B",
                    gray_400: "#333639",
                },
                light: {
                    gray_0: "#CFD9DE",
                    gray_100: "#536471",
                },
            },
            fill: {
                light: {
                    white: "#ffffff",
                    gray_0: "#CFD9DE",
                    gray_100: "#829AAB",
                    gray_200: "#536471",
                    black: "#0F1419",
                    blue: "#1D9BF0",
                },
            },
            borderColor: {
                main: {
                    gray: "#EFF3F4",
                    black: "#000000",
                },
                dark: {
                    black: "#16181C",
                    gray_2: "#2F3336",
                },
                light: {
                    white_0: "#FFFFFF",
                    white_100: "#F7F9F9",
                    gray: "#CFD9DE",
                    black: "#0F1419",
                },
            },
            animation: {
                "spin-fast": "spin 0.5s linear infinite",
            },
            fontSize: {
                large: "20px",
                medium: "15px",
                small: "13px",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};

/*
// colors

                // twitter: {
                //     blue: "#1d9bf0",
                //     blue_hover: "#2e84bb",
                //     light_dark: "#16181c",
                //     dark: "#14171A",
                //     gray: "#536471",
                //     light_gray: "#AAB8C2",
                //     lighter_gray: "#E1E8ED",
                //     lightest_gray: "#F5F8FA",
                //     full_white: "#ffffff",
                //     less_white: "#EFF3F4",
                //     lightest_blue: "#C9DFF2",
                //     love: "#f91880",
                //     retweet: "#00ba7c",
                // },
                // dim: {
                //     50: "#5F99F7",
                //     100: "#5F99F7",
                //     200: "#38444d",
                //     300: "#202e3a",
                //     400: "#253341",
                //     500: "#5F99F7",
                //     600: "#5F99F7",
                //     700: "#192734",
                //     800: "#162d40",
                //     900: "#15202b",
                // },





*/
