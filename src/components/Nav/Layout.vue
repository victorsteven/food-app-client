<template>
<div>
    <div class="page-container md-layout-column">
     <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <router-link to="/">
          <md-button style="color: #039be5">Food App</md-button>
        </router-link>
      <div class="md-toolbar-section-end">
        <span v-if="authenticated">
           <router-link to="/food">
            <md-button @click="showSidepanel = true">Create</md-button>
          </router-link>
           <router-link to="#">
            <md-button @click="logout">Logout</md-button>
          </router-link>
        </span>
        <span v-else>
          <router-link to="/login">
            <md-button @click="showSidepanel = true">Login</md-button>
          </router-link>
          <router-link to="/register">
            <md-button @click="showSidepanel = true">Register</md-button>
          </router-link>
        </span>
      </div>
    </md-toolbar>
   
    <md-drawer :md-active.sync="showNavigation" md-swipeable style="background: white">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">
          <a href="/">Food App</a>
        </span>
      </md-toolbar>
        <md-list>
        <span v-if="authenticated">
          <md-list-item>
           <router-link to="/food">
            <span class="md-list-item-text">Create Food</span>
            </router-link>
          </md-list-item>
          <md-list-item>
            <span class="md-list-item-text logout-style" @click="logout">Logout</span>
          </md-list-item>
        </span>
        <span v-else>
          <md-list-item>
            <router-link to="/login">
              <span class="md-list-item-text">Login</span>
            </router-link>
          </md-list-item>
          <md-list-item>
             <router-link to="/register">
              <span class="md-list-item-text">Register</span>
            </router-link>
          </md-list-item>
          </span>
        </md-list>
    </md-drawer>
    <md-content class="main-body">
       <div>
          <slot name="body"></slot>
        </div>
    </md-content>
    <div id="footer">
      <Footer/>
    </div>
    </div>
  </div>
</template>

<script>
    import Footer from "./Footer";

    export default {
        name: "Layout",
        components: {Footer},
         data: () => ({
            showNavigation: false,
            showSidepanel: false
        }),
        computed: {
          authenticated(){
            return this.$store.state.authenticated
          }
        },
        methods: {
          logout(){
            this.$store.dispatch('logout').then(() => {
                this.$router.push("/")
            })
          }
        }
    }
</script>

<style scoped>

a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
a:link {
  text-decoration: none;
}

a:active {
  text-decoration: none;
}
.logout-style {
  cursor: pointer;
  color: #039be5;
}
#footer {
   position:absolute;
   bottom:0!important;
   width:100%;
   height:60px;   /* Height of the footer */
   background:#6cf;
   margin-bottom: 0px!important;
}
.md-elevation-4 {
  box-shadow: none!important
}

.main-body {
  background-image: 
    linear-gradient(to bottom, rgba(255, 255, 255, 0.5)),
    url("../../assets/meal.jpeg");
}
</style>
