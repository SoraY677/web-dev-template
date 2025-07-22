import { createApp } from 'vue'
import '@assets/styles/index.scss'
import App from '@components/App.vue'
import { router } from '@composables/router'
import { createPinia } from 'pinia'

createApp(App)
  .use(router)
  .use(createPinia())
  .mount('#app')
