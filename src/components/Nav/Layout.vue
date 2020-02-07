<template>
<div>
    <div class="page-container md-layout-column">
     <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">My Title</span>
      <div class="md-toolbar-section-end">
          <router-link to="/login">
            <md-button @click="showSidepanel = true">Login</md-button>
          </router-link>
          <router-link to="/register">
            <md-button @click="showSidepanel = true">Register</md-button>
          </router-link>
      </div>
    </md-toolbar>
   
    <md-drawer :md-active.sync="showNavigation" md-swipeable style="background: white">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
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
        })
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
