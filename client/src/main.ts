import '@assets/styles/index.scss'

import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import App from '@components/App.vue'
import { router } from '@composables/router'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles/main.css'

createApp(App)
  .use(router)
  .use(createHead())
  .use(createPinia())
  .use(createVuetify())
  .mount('#app')
