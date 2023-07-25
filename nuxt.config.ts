// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{    
    pageTransition: { name: 'page', mode: 'out-in' },
    head:{
      link:[
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Poppins:wght@400;600;700;800&display=swap"
        }
      ]
    },
  },
  css: ['vuetify/lib/styles/main.sass','@mdi/font/css/materialdesignicons.min.css'],
  modules: [
    '@nuxt/image'
  ],
  //devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
