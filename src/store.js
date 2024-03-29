import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  isLoggedIn: !!localStorage.getItem('accessToken') ?? false,
  user: null,
  activeSchoolYear: null,
  activeSemester: null
}

const mutations = {
  TOGGLE_SIDEBAR_DESKTOP (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  TOGGLE_SIDEBAR_MOBILE (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  LOGIN_USER (state) {
    state.isLoggedIn = true
  },
  LOGOUT_USER (state) {
    state.isLoggedIn = false
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_ACTIVE_SCHOOL_YEAR (state, payload) {
    state.activeSchoolYear = payload
  },
  SET_ACTIVE_SEMESTER (state, payload) {
    state.activeSemester = payload
  },
}

export default new Vuex.Store({
  state,
  mutations
})