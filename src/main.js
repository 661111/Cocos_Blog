import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.scss'
// import 'ant-design-vue/dist/antd.dark.css';
import 'ant-design-vue/dist/antd.css';
const app = createApp(App)


app.use(router).use(store)

app.mount('#app')