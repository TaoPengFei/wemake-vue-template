import './polyfills'
import { createApp } from './app'

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

router.onReady(() => {
  app.$mount('#app')
})
