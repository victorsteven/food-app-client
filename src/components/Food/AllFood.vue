<template>
  <layout>
    <div slot="body">
    <!-- <div class="col s12 m12 l9"> -->
      <div id="card-container" class="row">
        <div class="col s12 m6 l4" v-for="food in allFood" :key="food.id">
          <!-- <a :href=""> -->
          <router-link :to="`/single_food/${food.id}`">
            <div class="card">
            <div class="card-image">
              <img :src="food.avatar_path" class="image-style">
              <span class="card-title">{{ food.title }}</span>
            </div>
              <div class="card-content white-text">
                <div class="card__date">
                  <span class="card__date__day">23</span>
                  <span class="card__date__month">Mai</span>
                </div>
                <div class="card__meta">
                  <a href="#"><i class="small material-icons">room</i>Web Design</a>
                  <time>17th March</time>
                </div>
                <span class="card-title grey-text text-darken-4">{{ food.title }}</span>

                <p class="card-subtitle grey-text text-darken-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia...lacus eleifend lacinia... go!</p>
                <span class="text-darken-2 card-info"><i class="small material-icons">label</i>&nbsp;lindy hop, balboa, charleston</span>
              </div>
              <div class="card-action">
                <a href="#"><i class="material-icons">&nbsp;language</i>VISIT WEB</a>
                <a href="#" class="card-action-right"><i class="material-icons">&nbsp;room</i>FIND</a>
              </div>
            </div>
          </router-link>
          <!-- </a> -->
        </div>
      </div>
    <!-- </div> -->
       <!-- <div class="card-expansion">
        <div class="col s12 m12">
         <div class="row" v-for="food in allFood" :key="food.id">
          <div class="col s3 m3">
            <div class="card">
              <div class="card-image">
                <img src="images/sample-1.jpg">
                <span class="card-title">{{ food.title }}</span>
              </div>
              <div class="card-content">
                <p>{{ food.description }}</p>
                <span class="card-title">{{ food.title }}</span>
              </div>
              <div class="card-action">
                <a href="#">This is a link</a>
              </div>
            </div>
          </div>
         </div>
        </div>
       </div> -->
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
        }
    }
}
</script>

<style scoped>

  .card-info, .card__meta a {
    color: #3299BB !important;
    display: inline-flex;
    vertical-align: middle;
    line-height: 2;
    font-size: 1rem;
   }
   .card__meta i.small {
       font-size: 1.5rem;
   }
   .card .card-content .card-title {
       line-height: 34px;
   }
   .card-image > .image-style {
     height:260px
   }
   .card__date {
       background: #08c;
       position: absolute;
       top: 6px;
       right: 6px;
       width: 40px;
       height: 40px;
       border-radius: 50%;
       color: #fff;
       text-align: center;
       line-height: 13px;
       font-weight: bold;
       padding-top: 7px;
   }
   .card__date__day {
     display: block;
     font-size: 14px;
   }
   .card__date__month {
     display: block;
     font-size: 10px;
     text-transform: uppercase;
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

   .collapsible{
     background: #fff;
   }

   .card-row {
     margin-bottom: 4px;
       margin-top: 4px;
   }
   .card-action i {
       vertical-align: text-bottom;
       font-size: 21px;
   }
   #container {
     padding: 20px 10px;
   }
</style>