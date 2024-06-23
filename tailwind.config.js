/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // We have to config the tailwind to use the dark mode in our site using the darkMode.
    // We have to choose the way by which we can switch the dark mode using media (default system mode), selector or class
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

