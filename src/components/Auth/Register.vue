<template>
  <layout>
    <div slot="body" class="center-align">
        <div id="login-page" class="row" >
            <div class="col s12 z-depth-6 card-header" style="margin-top: 20px;">
                <h4>Register</h4>
            </div>
            <div class="col s12 z-depth-6 card-panel" style="margin-bottom: 100px">
            <form class="login-form" @submit.prevent="register">
                <div class="row">
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">contact_mail</i>
                        <input id="first_name" type="text" v-model="first_name">
                        <label for="first_name" data-error="wrong" data-success="right">First Name</label>
                        <span style="color: red" v-if="signUpErr && signUpErr.firstname_required">{{ signUpErr.firstname_required }}</span>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">contact_mail</i>
                        <input id="last_name" type="text" v-model="last_name">
                        <label for="last_name" data-error="wrong" data-success="right">Last Name</label>
                        <span style="color: red" v-if="signUpErr && signUpErr.lastname_required">{{ signUpErr.lastname_required }}</span>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">mail_outline</i>
                        <input id="email" class="validate" type="email" v-model="email">
                        <label for="email" data-error="wrong" data-success="right">Email</label>
                        <span style="color: red" v-if="signUpErr && signUpErr.email_required">{{ signUpErr.email_required }}</span>
                        <span style="color: red" v-if="signUpErr && signUpErr.invalid_email">{{ signUpErr.invalid_email }}</span>
                        <span style="color: red" v-if="signUpErr && signUpErr.email_taken">{{ signUpErr.email_taken }}</span>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock_outline</i>
                        <input type="password" v-model="password">
                        <label for="password">Password</label>
                        <span style="color: red" v-if="signUpErr && signUpErr.password_required">{{ signUpErr.password_required }}</span>
                    </div>
                    <div class="input-field col s12">
                        <button :disabled="disabled" class="btn waves-effect waves-light col s12 btn-color">
                            <span v-if="loading">Registering...</span>
                           <span v-else>Register</span> 
                        </button>
                    </div>
                    <div class="input-field style-foot col s6 m6 l6">
                        <p class="margin left-margin medium-small"><a href="#">Login</a></p>
                    </div>
                    <div class="input-field style-foot col s6 m6 l6">
                        <p class="margin right-align medium-small"><a href="#">Forgot password?</a></p>
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
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        loading: false
    }),
    computed: {
        disabled(){
            return this.loading === true
        },
        signUpErr() {
            return this.$store.state.appError
        }
    },
    methods: {
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
    #login-page {
        width: 30%;
        margin: auto
    }
    .input-field.style-foot {
        margin-top: 5px!important;
        margin-bottom: 5px!important;
    }
    /* button:disabled {
        background: red
    } */
    /* .btn-color {
        background: lightgreen
    } */
</style>