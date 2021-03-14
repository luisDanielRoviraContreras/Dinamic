// eslint-disable-next-line no-unused-vars
import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  authenticated: false,
  verified: false,
  qr: false,
  user: ''
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  authenticated: state => state.authenticated
}

export const mutations: MutationTree<RootState> = {
  CHANGE_AUTHENTICATED: (state, newVal: boolean) => (state.authenticated = newVal),
  VERIFIED: (state, newVal: boolean) => (state.verified = newVal),
  TOGGLE_QR: (state, newVal: boolean) => (state.qr = !state.qr),
  SET_USER: (state, newVal: string) => (state.user = newVal)
}

export const actions: ActionTree<RootState, RootState> = {
  authenticated ({ commit }, val: boolean) {
    commit('CHANGE_AUTHENTICATED', val)
  },
  verified ({ commit }, val: boolean) {
    commit('VERIFIED', val)
  },
  toggleQr ({ commit }, val: boolean) {
    commit('TOGGLE_QR', val)
  },
  setUser ({ commit }, val: boolean) {
    commit('SET_USER', val)
  }
}
