<template>
  <layout>
    <div slot="body">
      <div class="page-container">
        <div class="preloader-background" v-if="loading">
          <p class="blinking" style="font-size: 40px; color: #304ffe">Loading...</p>
        </div>
       <span v-if="food && creator">
        <div v-if="editing">
           <edit-food :food="food"></edit-food>
        </div>
        <div class="row" v-else style="margin-bottom: 100px;">
          <div class="row front-style">
            <div style="background: white; border: 1px solid #f2f2f2; border-radius: 20%; padding: 5px;">
              created by <b> {{ formatNames(creator.first_name, creator.last_name) }} </b>
            </div>
            <!-- <span v-if="auth && auth.id"> -->
              <!-- <div v-if="food.user_id == auth.id"> -->
                <span>
                  <a class="waves-effect waves-light btn style-edit" @click="edit">Edit</a>
                </span>
                <span class="style-delete">
                  <a class="btn" style="background: #A52A2A;" @click="destroy(food.id)">
                    <span v-if="loading">Deleting...</span> 
                    <span v-else>Delete</span> 
                    </a>
                </span>
              <!-- </div> -->
            <!-- </span> -->
          </div>
          <div class="col s12 m6">
             <img :src="food.food_image" style="height: 90%; width: 100%">
          </div>
          <div class="col s12 m6" style="background: white;">
            <h5 v-text="food.title"></h5>
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
import swal from 'sweetalert2';


export default {
    components: { Layout, EditFood },
    data: () => ({
        editing: false,
        loading: false,
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
        auth() {
          return this.$store.getters.user
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
              swal({
                  title: "success",
                  text: "Food deleted",
                  type: "success",
              });
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
  
  @media only screen and (min-width: 768px) {
    .front-style {
      display: flex;
      justify-content: space-between;
    }
    .page-container {
      padding: 20px 20px;
    }
  }
  @media only screen and (max-width: 768px) {
    .front-style {
      display: block;
      align-items: center;
    }
    .page-container {
      padding: 10px 5px;
    }
  }
  
  .preloader-background {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .preloader-background.p {
    padding-top:120px;
    margin-left: -60px;
    opacity: 0.8;
  } 
  .blinking {
      animation: blinker 1.5s linear infinite;
  }
  @keyframes blinker {  
    50% { opacity: 0; }
  }

  @media only screen and (min-width: 768px) {
    .style-delete {
      margin-left: 20px;
    }
  }
  @media only screen and (max-width: 768px) {
    .style-edit {
      margin-right: 1px;
    }
  }
   
</style>
