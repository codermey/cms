import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import router from './router'
import store from './store'
import App from './App.vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.use(router)
app.mount('#app')
