import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/css/public.css'
import BalmUI from 'balm-ui'
import 'balm-ui-css'

const app = createApp(App)
    .use(BalmUI,{
        $theme: {
            primary: 'rgba(240, 199, 119)',
        }
    })

app.use(router)
app.mount('#app')

