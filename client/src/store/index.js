import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let toastTimeout

const store = new Vuex.Store({
  state: {
    redirectPaths: [],
    toast: { status: '', message: '' },
    user: null
  },
  mutations: {
    addRedirectPath (state, path) {
      state.redirectPaths.push(path)
    },
    removeRedirectPath (state) {
      state.redirectPaths.pop()
    },
    updateToast (state, { message = '', status = 'info' } = {}) {
      state.toast = { message, status }
    }
  },
  actions: {
    toast ({ commit }, { message = '', status = 'info', duration = 5000 } = {}) {
      if (toastTimeout) clearTimeout(toastTimeout)
      commit('updateToast', { message, status })
      if (message) {
        toastTimeout = setTimeout(() => {
          commit('updateToast', { message: '' })
        }, duration)
      }
    }
  }
})

export default store