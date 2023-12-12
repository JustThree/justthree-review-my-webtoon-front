import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
// Vuetify
import "vuetify/styles";
import { createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { fa } from "vuetify/iconsets/fa";
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
// make sure to also import the coresponding css
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css"; //

//axois intercepter
import { useAuthStore } from './stores/auth.store.js'
import { setupAxiosInterceptors } from './axiosHandler.js';

const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light'
    },

    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
            fa,
        },
    },
})


app.use(router);
app.use(createPinia());
app.use(VueAwesomePaginate);
app.use(vuetify);

app.mount('#app');

const authStore = useAuthStore();
setupAxiosInterceptors(authStore);