/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode by adding class="dark" to html
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdf4',   // Green 50
                    100: '#dcfce7',  // Green 100
                    200: '#bbf7d0',  // Green 200
                    300: '#86efac',  // Green 300
                    400: '#4ade80',  // Green 400
                    500: '#22c55e',  // Green 500 (Base)
                    600: '#16a34a',  // Green 600 (Hover)
                    700: '#15803d',  // Green 700 (Active/Darker)
                    800: '#166534',  // Green 800
                    900: '#14532d',  // Green 900
                    950: '#052e16',  // Green 950
                },
                dark: {
                    base: '#0f172a', // Slate 900
                    surface: '#1e293b', // Slate 800
                    border: '#334155', // Slate 700
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
