import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.scss'
import highlight from "@/utils/plugins/highlight";
import {message} from "ant-design-vue"
// import 'ant-design-vue/dist/antd.dark.css';
import 'ant-design-vue/dist/antd.css';



const app = createApp(App)


app.use(router).use(store).use(highlight)
app.config.globalProperties.$message = message;

app.mount('#app')