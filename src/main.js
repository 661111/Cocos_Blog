import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import './assets/main.scss'
import "lew-ui/dist/style.css"
const app = createApp(App)

app.use(router)

app.mount('#app')
