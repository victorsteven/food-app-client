<template>
  <layout>
    <div slot="body" class="center-align">
        <div id="login-page" class="row">
            <div class="col s12 z-depth-6 card-header" style="margin-top: 40px;">
                <h4>Login</h4>
            </div>
            <div class="col s12 z-depth-6 card-panel">
            <form class="login-form">
                <div class="row">
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">mail_outline</i>
                        <input class="validate" v-model="email">
                        <label for="email" data-error="wrong" data-success="right">Email</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock_outline</i>
                        <input type="password" v-model="password">
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field col s12">
                        <a href="#" class="btn waves-effect waves-light col s12">Login</a>
                    </div>
                    <div class="input-field col s6 m6 l6">
                         <p class="margin left-margin medium-small"><a href="#">Register Now!</a></p>
                    </div> 
                    <div class="input-field col s6 m6 l6">
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
      initial: 'Initial Value',
      type: null,
      withLabel: null,
      inline: null,
      number: null,
      textarea: null,
      email: null,
      password: null
    })
}
</script>

<style scoped>
    #login-page {
        width: 30%;
        margin: auto
    }
    .input-field {
        margin-top: 5px!important;
        margin-bottom: 15px!important;
    }
</style>