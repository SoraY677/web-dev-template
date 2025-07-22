import { createApp } from 'vue'
import '@assets/styles/index.scss'
import App from '@components/App.vue'
import { router } from '@composables/router'

createApp(App)
  .use(router)
  .mount('#app')
