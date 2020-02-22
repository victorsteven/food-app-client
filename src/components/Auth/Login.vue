<template>
  <layout>
    <div slot="body" class="center-align">
        <div id="login-page" class="row">
            <div class="col s12 z-depth-6 card-header" style="margin-top: 40px;">
                <h4 style="color: #039be5">Login</h4>
            </div>
            <div class="col s12 z-depth-6 card-panel">
            <form class="login-form" @submit.prevent="login">
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">mail_outline</i>
                        <input class="validate" id="email" type="email" v-model="email">
                        <label for="email" data-error="wrong" data-success="right">Email</label>
                        <span style="color: red" v-if="loginErr && loginErr.email_required">{{ loginErr.email_required }}</span>
                        <span style="color: red" v-if="loginErr && loginErr.invalid_email">{{ loginErr.invalid_email }}</span>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock_outline</i>
                        <input type="password" id="password" v-model="password">
                        <label for="password">Password</label>
                        <span style="color: red" v-if="loginErr && loginErr.incorrect_password">{{ loginErr.incorrect_password }}</span>
                    </div>
                    <div class="input-field col s12">
                        <button :disabled="disabled" class="btn waves-effect waves-light col s12 btn-color">
                            <span v-if="loading">Logging in...</span>
                            <span v-else>Login</span> 
                        </button>
                    </div>
                    <div class="input-field col s6 m6 l6">
                         <p class="margin left-margin medium-small">
                             <router-link to="/register">
                                <span>Register Now!</span>
                            </router-link>
                        </p>
                    </div> 
                </div>
            </form>
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
        email: null,
        password: null,
        loading: false
    }),
    computed: {
        disabled(){
            return this.loading === true
        },
        loginErr() {
            return this.$store.state.appError
        }
    },
    methods: {
        login() {
            this.loading = true
            this.$store.dispatch('login', {
                'email': this.email,
                'password': this.password
            }).then(() => {
                this.loading = false
                if(!this.loginErr){
                    this.$router.push("/")
                }
            })
        }
    }
}
</script>

<style scoped>
     @media only screen and (min-width: 768px) {
        #login-page {
            width: 30%;
            margin: auto;
            padding-bottom: 200px;
        }
     }
    @media only screen and (max-width: 768px) {
     #login-page {
        width: 90%;
        margin: auto;
        padding-bottom: 100px;
        }
    }
</style>