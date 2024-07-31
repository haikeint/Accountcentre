import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import ModalView from '@/components/ModalView.vue'
import AlertView from '@/components/AlertView.vue'

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'
const apolloClient = new ApolloClient({
    link: createHttpLink({
        uri: import.meta.env.VITE_URL_GRAPHQL,
        credentials: 'include'
    }),
    cache: new InMemoryCache()
})

provideApolloClient(apolloClient)

const app = createApp(App)
app.component('ModalView', ModalView)
app.component('AlertView', AlertView)
app.use(router)
app.use(createPinia())
app.mount('#app')
