<template>
  <layout>
    <div slot="body" class="center-align">
        <div id="login-page" class="row" >
            <div class="col s12 z-depth-6 card-header" style="margin-top: 40px;">
                <h4>Register</h4>
            </div>
            <div class="col s12 z-depth-6 card-panel" style="margin-bottom: 100px">
            <form class="login-form">
                <div class="row">
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">contact_mail</i>
                        <input class="validate" id="email" type="email">
                        <label for="email" data-error="wrong" data-success="right">First Name</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">contact_mail</i>
                        <input class="validate" id="email" type="email">
                        <label for="email" data-error="wrong" data-success="right">Last Name</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix">mail_outline</i>
                        <input class="validate" id="email" type="email">
                        <label for="email" data-error="wrong" data-success="right">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">lock_outline</i>
                        <input id="password" type="password">
                        <label for="password">Password</label>
                    </div>
                </div>
                <div class="row">
                <div class="input-field col s12">
                    <a href="#" class="btn waves-effect waves-light col s12">Register</a>
                </div>
                </div>
                <div class="row">
                <div class="input-field col s6 m6 l6">
                    <p class="margin left-margin medium-small"><a href="#">Login</a></p>
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
      autogrow: null,
      disabled: null
    })
}
</script>

<style scoped>
    #login-page {
        width: 40%;
        margin: auto
}
</style>