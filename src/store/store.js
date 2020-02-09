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
    appError: '',
    authenticated: localStorage.getItem('access_token') === null ? false : true
  },

  getters: {
    userDetails(state) {
      return state.user
    },
    allFood(state) {
      return state.all_food;
    },
    singleFood(state){
      return state.single_food
    }
  },

  mutations: {
    appError(state, err) {
      state.appError = err
    },
    getUsers(state, users) {
      state.users = users
      state.appError = ''
    },
    getAllFood(state, all_food) {
      state.all_food = all_food
      state.appError = ''
    },
    getFood(state, food) {
      state.single_food = food
      state.appError = ''
    },
    getSingleFood(state, food) {
      state.food = food
      state.appError = ''
    },
    updatedFood(state, food) {
      state.food = food
      state.appError = ''
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
      state.appError = ''
    },
    createdFood(state, payload) {
      state.single_food = payload
      state.appError = ''
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
        context.commit('appError', err.response.data)
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
    async singleFood(context, payload) {
      try {
        const res = await axios.get(`${API_ROUTE}/food/${payload.food_id}`)
          context.commit('getFood', res.data)
      } catch(err) {
        console.log("this is the error getting the user: ", err)
      }
    },
    async createFood(context, payload) {
      try {
      const res = await customAxios.post(`${API_ROUTE}/food`, payload)
      context.commit('createdFood', res.data)
      }catch(err) {
        context.commit('appError', err.response.data)
      }
    },

    async updateFood(context, payload) {
      console.log("the payload ", payload)
      try {
        const res = await customAxios.put(`${API_ROUTE}/food/${payload.food_id}`, payload.formData)
        context.commit('updatedFood', res.data)
      }catch(err) {
        context.commit('appError', err.response.data)
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
        context.commit('appError', err.response.data)
      }
    },
  }
})
