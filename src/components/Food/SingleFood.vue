<template>
  <layout>
    <div slot="body" class="cont">
      <div class="page-container">
       <span v-if="food && creator">
        <div v-if="editing">
           <edit-food :food="food"></edit-food>
        </div>
        <div class="row" v-else>
          <div class="row front-style">
            <div>
              created by <b> {{ formatNames(creator.first_name, creator.last_name) }} </b>
            </div>
            <div v-if="food.user_id == authID">
              <span>
                <a class="waves-effect waves-light btn" @click="edit">Edit</a>
              </span>
              <span style="margin-left: 20px;">
                <a class="btn" style="background: #A52A2A;" @click="destroy(food.id)">
                   <span v-if="loading">Deleting...</span> 
                   <span v-else>Delete</span> 
                  </a>
              </span>
            </div>
          </div>
          <div class="col s12 m6">
             <img :src="food.food_image" style="height: 90%; width: 100%" class="image-style">
          </div>
          <div class="col s12 m6">
            <h3 v-text="food.title"></h3>
            <p v-html="food.description"></p>
          </div>
        </div>
        </span>
       </div>
    </div>
  </layout>
</template>

<script>

import Layout from '../Nav/Layout'
import EditFood from './EditFood'

export default {
    components: { Layout, EditFood },
    data: () => ({
        editing: false,
        loading: false
    }),
    mounted(){
     let food_id = this.$router.history.current.params.id
     this.getSingleFood(food_id)
    },
    computed: {
        disabled(){
            return this.loading === true
        },
        food() {
            return this.$store.getters.food_and_creator.food
        },
         creator() {
            return this.$store.getters.food_and_creator.creator
        },
        authID() {
          return this.$store.state.user.id
        }
    },
    methods: {
        getSingleFood(id) {
          this.loading = true
          this.$store.dispatch('singleFood', { "food_id": id }).then(() => {
              this.loading = false
          })
        },
        edit(){
         this.editing = true
        },
        destroy(id) {
          this.loading = true
          this.$store.dispatch('deleteFood', { "food_id": id }).then(() => {
            this.$router.push("/")
            this.loading = false
          })
        },
        formatNames(fn, ln){
          fn = fn.charAt(0).toUpperCase() + fn.substring(1)
          ln = ln.charAt(0).toUpperCase() + "."
          return fn + " " + ln
        }
    },
}
</script>

<style scoped>
  .page-container {
    padding: 20px 20px
  }
  .front-style {
    display: flex;
    justify-content: space-between;
  }
  .cont {
    background-image: 
      linear-gradient(to bottom, rgba(255, 255, 255, 0.5)),
      url("../../assets/meal.jpeg");
  }
</style>
