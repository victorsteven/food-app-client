import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import customAxios from '../authorization'

import API_ROUTE from '../.env'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    all_food: [],
    food_and_creator: {},
    user: localStorage.getItem('user') === null ? null : JSON.parse(localStorage.getItem('user')),
    appError: '',
    authenticated: localStorage.getItem('access_token') === null ? false : true,
    delMsg: '',
  },

  getters: {
    allFood(state) {
      return state.all_food;
    },
    food_and_creator(state){
      return state.food_and_creator
    },
  },

  mutations: {
    appError(state, err) {
      state.appError = err
    },
    getAllFood(state, all_food) {
      state.all_food = all_food
      state.appError = ''
    },
    getFoodAndCreator(state, data) {
      state.food_and_creator = data
      state.appError = ''
    },
    updatedFood(state, delMsg) {
      state.delMsg = delMsg
      state.appError = ''
    },
    deletedFood(state, food) {
      state.food = food
      state.appError = ''
    },
    loggedInUser(state, payload) {
      localStorage.setItem('access_token', payload.access_token)
      localStorage.setItem('refresh_token', payload.refresh_token)
      let user = {
        "id": payload.id,
        "first_name": payload.first_name,
        "last_name": payload.last_name,
      }
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
      state.authenticated = true
      state.appError = ''
    },
    createdFood(state, payload) {
      state.single_food = payload
      state.appError = ''
    },
    logout(state){
      localStorage.clear()
      state.user = null
      state.authenticated = false
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
        context.commit('appError', err.response ? err.response.data : null)
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
          context.commit('getFoodAndCreator', res.data)
      } catch(err) {
        console.log("this is the error getting the user: ", err)
      }
    },
    async createFood(context, payload) {
      try {
      const res = await customAxios.post(`${API_ROUTE}/food`, payload)
      context.commit('createdFood', res.data)
      }catch(err) {
        context.commit('appError', err.response ? err.response.data : null)
      }
    },
    async updateFood(context, payload) {
      try {
        const res = await customAxios.put(`${API_ROUTE}/food/${payload.food_id}`, payload.formData)
        context.commit('updatedFood', res.data)
      }catch(err) {
        context.commit('appError', err.response ? err.response.data : null)
      }
    },
    async deleteFood(context, payload) {
      try {
        const res = await customAxios.delete(`${API_ROUTE}/food/${payload.food_id}`)
        context.commit('deletedFood', res.data)
      }catch(err) {
        context.commit('appError', err.response ? err.response.data : null)
      }
    },
    async login(context, payload) {
        try {
        const res = await axios.post(`${API_ROUTE}/login`, {
          email: payload.email,
          password: payload.password
        })
        context.commit('loggedInUser', res.data)
      }catch(err) {
        context.commit('appError', err.response ? err.response.data : null)
      }
    },
    async logout(context) {
        try {
        const res = await customAxios.post(`${API_ROUTE}/logout`)
        context.commit('logout', res.data)
      }catch(err) {
        context.commit('appError', err.response ? err.response.data : null)
      }
    },
  }
})
