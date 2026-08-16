import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import vuetify from "./plugins/vuetify"
import '@mdi/font/css/materialdesignicons.css'


const app = createApp(App)
app.use(store)
app.use(vuetify)
app.mount("#app")