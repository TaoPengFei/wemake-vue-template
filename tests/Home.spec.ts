/// <reference path='../node_modules/@types/jest/index.d.ts' />

import Vue from 'vue'
import Vuex from 'vuex'
import { mount, createLocalVue } from 'vue-test-utils'
import Home from '../client/views/home/Home.vue'
import createStore, { commitIncrement, commitDecrement } from '../client/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Hello component unit tests', () => {
  let store

  beforeEach(() => {
    store = createStore()
  })

  it('should have two buttons', () => {
    const wrapper = mount(Home, { store, localVue })

    expect(wrapper.findAll('button').length).toBe(2)
  })

  it('should have 0 as a default counter value', () => {
    const wrapper = mount(Home, { store, localVue })

    expect(wrapper.find('p > span').text()).toBe('0')
  })

  it('should increment counter', () => {
    const wrapper = mount(Home, { store, localVue })

    commitIncrement(wrapper.vm.$store)
    expect((wrapper.vm as any).count).toBe(1)
  })

  it('should decrement counter', () => {
    const wrapper = mount(Home, { store, localVue })

    commitDecrement(wrapper.vm.$store)
    expect((wrapper.vm as any).count).toBe(-1)
  })
})
