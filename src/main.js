import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css';
import SvgIcon from './icons'
import './utils/permission'

const app = createApp(App)

SvgIcon(app)

app.use(store).use(router).mount('#app')
