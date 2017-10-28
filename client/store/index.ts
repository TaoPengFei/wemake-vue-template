import Vue from 'vue'
import Vuex from 'vuex' // { ActionContext }
import { getStoreAccessors } from 'vuex-typescript'

import state, { State } from './state'
import mutations from './mutations'

Vue.use(Vuex)

// type Context = ActionContext<State, State>

const storeOptions = {
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
}

const createStore = () => new Vuex.Store(storeOptions)

const { commit } = getStoreAccessors<State, State>('') // read, dispatch

export const commitIncrement = commit(mutations.increment)
export const commitDecrement = commit(mutations.decrement)

export default createStore
