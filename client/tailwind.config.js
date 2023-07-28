// /** @type {import('tailwindcss').Config} */
export default {
    content: [ "./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' ],
  // important:"#root",
  theme: {
    extend: {
      boxShadow:{
        '3xl':'10px 10px 0px 0px rgba(0, 0, 0, 0.4)'
      }
    },
  },
    plugins: [  ]
};

