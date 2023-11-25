/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#47769D',
            },
            fontFamily: {
                rubik: 'Rubik Mono One',
                inter: 'Inter',
                helveticaneue: 'helveticaneue',
                roboto: 'Roboto',
            },
        },
    },
    plugins: [],
};
