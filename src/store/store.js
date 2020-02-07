import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { AxiosHelper } from '../utils/axios_utils'
import API_ROUTE from '../.env'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    all_food: [],
    single_food: {},
    users: [],
    user: '',
    token: localStorage.getItem('token') || ''
  },

  getters: {
    userDetails(state) {
      return state.user
    },
    tickets(state) {
      return state.tickets
    }
  },

  mutations: {
    getUsers(state, users) {
      state.users = users
    },
    // loggedInUser(state, user) {
    //   state.user = user
    // },
    getAllFood(state, all_food) {
      state.all_food = all_food
    },
    getSingleFood(state, food) {
      state.food = food
    },

    loggedInUser(state, payload) {
      window.localStorage.setItem('user_info', JSON.stringify(payload))
      window.localStorage.setItem('token', JSON.stringify(payload.token))

      // window.localStorage.setItem(this.defaultConfig.cookie_name, payload.token)
      state.token = payload.token
      AxiosHelper.setHeader(payload.token)
      state.user = payload
    },
    getTickets(state, payload) {
      state.tickets = payload
    }
  },
  actions: {
    signUp(context, payload) {
      axios.post(`${API_ROUTE}/users`, {
        first_name: payload.first_name,
        email: payload.email,
        password: payload.password
      }).then(res => {
        console.log("this is the signup response: ", res.data)
      })
    },
    getUsers(context) {
      axios.get(`${API_ROUTE}/users`).then(res => {
        context.commit('getUsers', res.data)
        console.log("these are the users: ", res.data)
      }).catch(err => {
        console.log("this is the error getting the user: ", err)
      })
    },
    createFood(context, payload) {
      axios.get(`${API_ROUTE}/food`, {
        title: payload.title,
        description: payload.description,
      }).then(res => {
        console.log("this is the new food: ", res.data)
      })
    },

    // fetchSingleEvent(context, event_id) {
    //   axios.get(`http://localhost:9999/events/${event_id}`).then(res => {
    //     context.commit('getSingleEvent', res.data)
    //   }).catch(err => {
    //     console.log("this is the error getting the event: ", err)
    //   })
    // },

    login(context, payload) {
      axios.post(`${API_ROUTE}/login`, {
        email: payload.email,
        password: payload.password
      }).then(res => {
        context.commit('loggedInUser', res.data)
      }).catch(err => {
        console.log("the error: ", err)
      })
    },
    // getTickets(context, event_id) {
    //   axios.get(`http://localhost:9999/event-tickets/${event_id}`).then(res => {
    //     context.commit('getTickets', res.data)
    //     console.log("this isthe ticket payload: ", res.data)
    //   }).catch(err => {
    //     console.log("this is the error getting the event: ", err)
    //   })
    // },
  }
})
