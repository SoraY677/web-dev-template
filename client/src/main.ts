import { createApp } from 'vue'
import '@assets/styles/index.scss'
import App from '@components/App.vue'
import { router } from '@composables/router'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'

createApp(App)
  .use(router)
  .use(createHead())
  .use(createPinia())
  .mount('#app')
