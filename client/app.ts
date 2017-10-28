import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import router from './router'
import createStore from './store'

export function createApp () {
  const store = createStore()
  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, store, router }
}


