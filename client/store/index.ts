import Vue from 'vue'
import Vuex from 'vuex' // { ActionContext }
import { getStoreAccessors } from 'vuex-typescript'

import createState, { State } from './state'
import mutations from './mutations'

Vue.use(Vuex)

// type Context = ActionContext<State, State>

const createStore = () => {
  return new Vuex.Store({
    state: createState(),
    mutations,
    strict: process.env.NODE_ENV !== 'production'
  })
}

const { commit } = getStoreAccessors<State, State>('') // read, dispatch

export const commitIncrement = commit(mutations.increment)
export const commitDecrement = commit(mutations.decrement)

export default createStore
