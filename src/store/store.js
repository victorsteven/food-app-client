import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { AxiosHelper } from '../utils/axios_utils'
import customAxios from '../authorization'

import API_ROUTE from '../.env'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    all_food: [],
    single_food: {},
    users: [],
    user: {},
    userError: '',
    foodError: '',
    authenticated: localStorage.getItem('access_token') === null ? false : true
  },

  getters: {
    userDetails(state) {
      return state.user
    },
    allFood(state) {
      return state.all_food;
    }
  },

  mutations: {
    userError(state, err) {
      state.userError = err
    },
    foodError(state, err) {
      state.foodError = err
    },

    getUsers(state, users) {
      state.users = users
    },
    getAllFood(state, all_food) {
      state.all_food = all_food
    },
    getSingleFood(state, food) {
      state.food = food
    },

    loggedInUser(state, payload) {
      localStorage.setItem('access_token', payload.access_token)
      localStorage.setItem('refresh_token', payload.refresh_token)
      state.user = {
        "id": payload.id,
        "first_name": payload.first_name,
        "last_name": payload.last_name,
        "email": payload.email
      }
      state.user = payload.user
      state.authenticated = true
    },
    createdFood(state, payload) {
      state.single_food = payload
    }
  },
  actions: {
    async register(context, payload) {
        try {
        await axios.post(`${API_ROUTE}/users`, {
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password
        })
      }catch(err) {
        context.commit('userError', err.response.data)
      }
    },
    async getAllFood(context) {
      try {
        const res = await axios.get(`${API_ROUTE}/food`)
          context.commit('getAllFood', res.data)
      } catch(err) {
        console.log("this is the error getting the user: ", err)
      }
    },
    async createFood(context, payload) {

      console.log("this is the sent payload: ", payload)
      try {
      // const res = await customAxios.post(`${API_ROUTE}/food`, {
      //   title: payload.title,
      //   description: payload.description,
      // })
      const res = await customAxios.post(`${API_ROUTE}/food`, payload)
      context.commit('createdFood', res.data)
      }catch(err) {
        context.commit('foodError', err.response.data)
      }
    },

    // fetchSingleEvent(context, event_id) {
    //   axios.get(`http://localhost:9999/events/${event_id}`).then(res => {
    //     context.commit('getSingleEvent', res.data)
    //   }).catch(err => {
    //     console.log("this is the error getting the event: ", err)
    //   })
    // },

    // login(context, payload) {
    //   axios.post(`${API_ROUTE}/login`, {
    //     email: payload.email,
    //     password: payload.password
    //   }).then(res => {
    //     context.commit('loggedInUser', res.data)
    //   }).catch(err => {
    //     console.log("the error: ", err)
    //   })
    // },

    async login(context, payload) {
        try {
        const res = await axios.post(`${API_ROUTE}/login`, {
          email: payload.email,
          password: payload.password
        })
        context.commit('loggedInUser', res.data)
      }catch(err) {
        context.commit('userError', err.response.data)
      }
    },
  }
})
