import {
  createStore
} from 'vuex'

const defaultState = {
  count: 0
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  getters: {
    double(state) {
      return 2 * state.count
    }
  }
})