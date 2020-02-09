<template>
  <layout>
    <div slot="body">
      <div class="page-container">
       <div>
         <a class="waves-effect waves-light btn" @click="edit">Edit</a>
       </div>
        <div v-if="editing">
           <edit-food :food="food"></edit-food>
        </div>
        <div class="row" v-else>
          <div class="col s12 m6">
             <img :src="food.avatar_path" style="height: 90%; width: 100%" class="image-style">
          </div>
          <div class="col s12 m6">
            <h3 v-text="food.title"></h3>
            <p v-html="food.description"></p>
          </div>
        </div>
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
            return this.$store.getters.singleFood
        }
    },
    methods: {
       getAllFood() {
        this.$store.dispatch('getAllFood')
       },
        getSingleFood(id) {
            this.loading = true
            this.$store.dispatch('singleFood', { "food_id": id }).then(() => {
                this.loading = false
            })
        },
        edit(){
         this.editing = true
        }
    },
}
</script>

<style scoped>
  .page-container {
    padding: 20px 20px
  }
</style>
