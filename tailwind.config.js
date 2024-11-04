/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            spacing: {
                '2/3': '66.66667%',
            },
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
};
