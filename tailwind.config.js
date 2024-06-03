/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],  
  theme: {
    extend: {
      backgroundImage: {
        'loginBackground': "url('/assets/interlaced.png')",
      },
      fontFamily: {
        main: ['Inter'],
      },
    },
  },
  plugins: [],
}

