import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App.vue'
import router from './router'
import createStore from './store'

const store = createStore()
sync(store, router)

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

export { app }
