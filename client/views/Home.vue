<template>
  <div class="hello__component">
    <h1>Hello!</h1>

    <p>Counter is <span>{{ count }}</span></p>

    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { commitIncrement, commitDecrement } from '../store'

export default {
  methods: {
    increment () {
      commitIncrement(this.$store)
    },
    decrement () {
      commitDecrement(this.$store)
    }
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>

<style lang="scss">
.hello__component {
  h1 {
    text-decoration: underline;
  }
}
</style>
