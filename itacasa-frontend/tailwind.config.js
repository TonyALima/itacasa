   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           primary: {
             light: "#80cbc4",
             main: "#009688",
             dark: "#00695c",
           },
           secondary: {
             light: "#ffb74d",
             main: "#ff9800",
             dark: "#f57c00",
           },
           background: {
             default: "#f5f5f5",
             paper: "#ffffff",
           },
           text: {
             primary: "#212121",
             secondary: "#757575",
           }
         },
         spacing: {
           '18': '4.5rem',
         },
         borderRadius: {
           '2xl': '1rem',
         }
       },
     },
     plugins: [],
   }