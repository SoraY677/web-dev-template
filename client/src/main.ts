import { createApp } from 'vue'
import '@assets/styles/index.scss'
import App from '@components/App.vue'
import { router } from '@composables/router'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles/main.css'

createApp(App)
  .use(router)
  .use(createHead())
  .use(createPinia())
  .use(createVuetify())
  .mount('#app')
