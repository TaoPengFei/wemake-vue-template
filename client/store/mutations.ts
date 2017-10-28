import { State } from './state'

export default {
  increment (state: State) {
    state.count++
  },
  decrement (state: State) {
    state.count--
  }
}
