<template>
  <layout>
    <div slot="body" class="cont" style="margin-bottom: 40px;">
      <div id="card-container" class="row">
        <div class="col s12 m4 style-render" v-for="food in allFood" :key="food.id">
          <router-link :to="`/single_food/${food.id}`">
            <div class="card">
            <div class="card-image">
              <img :src="food.food_image" class="image-style">
            </div>
              <div class="card-content white-text">
                <div style="display: flex; justify-content: space-between">
                  <span class="card-title grey-text text-darken-4"> {{ titleShorten(food.title) }}</span>
                </div>
              </div>
              <div class="card-action">
                <a href="#">Read More</a>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </layout>
</template>



<script>

import Layout from '../Nav/Layout'
export default {
    components: {Layout},
    data: () => ({
        
    }),

    mounted() {
     this.getAllFood()
    },

    computed: {
        disabled(){
            return this.loading === true
        },
        allFood() {
            return this.$store.getters.allFood
        }
    },
    methods: {
       getAllFood() {
        this.$store.dispatch('getAllFood')
       },
        register() {
            this.loading = true
            this.$store.dispatch('register', {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'email': this.email,
                'password': this.password
            }).then(() => {
                this.loading = false
                console.log("success")
            })
        },
        titleShorten(str){
          let count = 30
          return str.slice(0, count) + (str.length > count ? "..." : "");
        }
    }
}
</script>

<style scoped>
   .card__meta i.small {
       font-size: 1.5rem;
   }
   .card-image > .image-style {
     height:220px
   }
   .card .card-content .card-title {
       color: #0D8080 !important;
       line-height: 18px;
   }
   .card .card-title {
       font-size: 18px;
       font-weight: 400;
   }
   .card .card-content p{
     color: #1E1E1E;
     font-size: 13px;
   }
   #container {
     padding: 20px 10px;
   }
   .style-render {
      padding: 20px 10px 0px 10px;
   }
  .cont {
      background-image: 
          linear-gradient(to bottom, rgba(255, 255, 255, 0.5)),
          url("../../assets/meal.jpeg");
  }
</style>