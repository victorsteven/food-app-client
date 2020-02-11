import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
// import Index from './components/Index'
import AllFood from './components/Food/AllFood'
import SingleFood from './components/Food/SingleFood'
import EditFood from './components/Food/EditFood'

import CreateFood from './components/Food/CreateFood'

Vue.use(VueRouter)

const router = new VueRouter({
  
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index
    // },
    {
      path: '/',
      name: 'all_food',
      component: AllFood
    },
    {
      path: '/single_food/:id',
      name: 'single_food',
      component: SingleFood
    },
    {
      path: '/edit/single_food/:id',
      name: 'edit_food',
      component: EditFood
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/food',
      name: 'createFood',
      component: CreateFood,
      meta: { requiresAuth: true }
    },
  ]
});

router.beforeEach((to, from, next) => {
  // if (to.path.startsWith("/logout")) {
  //   // window.localStorage.clear();
  //   // window.location = "/login"
  //   let token = window.localStorage.getItem("token")
  //   if (token) {
  //     axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
  //   } else {
  //     delete axios.defaults.headers.common['Authorization'];
  //   }
  // }
  if(to.path.startsWith("/login") || to.path.startsWith("/register")) {
    if (window.localStorage.getItem("access_token")) {
      next({
        path: "/"
      })
    }
  }
  // if(to.meta.requiresAuth || to.path.startsWith("/logout")) {
  //   console.log("we came here")
  //   let token = window.localStorage.getItem("access_token")
  //   if (token) {
  //     console.log("we have token")
  //     axios.defaults.headers.common['Authorization'] =`Bearer ${token}`;
  //   } else {
  //     delete axios.defaults.headers.common['Authorization'];
  //   }
  //   if(!window.localStorage.getItem("access_token")) {
  //     next({
  //       path: "/login",
  //       query: {
  //         redirect: to.auth
  //       }
  //     });
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
  next()
})

export default router;