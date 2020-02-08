<template>
<div>
    <div class="page-container md-layout-column">
     <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">My Title</span>
      <div class="md-toolbar-section-end">
        <span v-if="authenticated">
           <router-link to="/food">
            <md-button @click="showSidepanel = true">Create Food</md-button>
          </router-link>
        </span>
        <span v-else>
          <router-link to="/login">
            <md-button @click="showSidepanel = true">Login</md-button>
          </router-link>
          <router-link to="/register">
            <md-button @click="showSidepanel = true">Register</md-button>
          </router-link>
          <!-- <router-link to="/register">
            <md-button @click="showSidepanel = true">Register</md-button>
          </router-link> -->
        </span>
      </div>
    </md-toolbar>
   
    <md-drawer :md-active.sync="showNavigation" md-swipeable style="background: white">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>
        <md-list>
        <span v-if="authenticated">
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Create Food</span>
          </md-list-item>
          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Logout</span>
          </md-list-item>
        </span>
        <span v-else>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Login</span>
          </md-list-item>
          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Register</span>
          </md-list-item>
          </span>
        </md-list>
    </md-drawer>
    <md-content>
       <div>
            <slot name="body"></slot>
        </div>
    </md-content>
  </div>
  <div id="footer">
     <Footer/>
  </div>
  </div>
</template>

<script>
    import Footer from "./Footer";
    // import Header from "./Header";

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
        }
    }
</script>

<style scoped>
#footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2.5rem;            /* Footer height */
}
</style>
