import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// MDI 字体现在通过 CDN 在 index.html 中加载，减少打包体积


const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // 这已经是默认值-仅用于显示目的 
    },
    defaults: {
        VCard: {
            variant: 'tonal',
        },
    },
})
const app = createApp(App);
app.config.warnHandler = () => {};
app.use(vuetify).mount('#app')

