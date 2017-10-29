import Vue from 'vue'
import Component from 'vue-class-component'
import { State } from 'vuex-class'
import { commitIncrement, commitDecrement } from '../../store'

@Component({})
export default class Home extends Vue {
  @State count: number

  increment () {
    commitIncrement(this.$store)
  }

  decrement () {
    commitDecrement(this.$store)
  }
}
