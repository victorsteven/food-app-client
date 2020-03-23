<template>
  <layout>
    <div slot="body" class="center-align cont">
        <div id="create-food-page" class="row" >
            <div class="col s12 z-depth-6 card-header" style="margin-top: 20px;">
                <h4 style="color: #039be5">Create Food </h4>
            </div>
            <div class="col s12 z-depth-6 card-panel" style="margin-bottom: 100px">
            <form class="login-form" @submit.prevent="createFood" enctype="multipart/form-data">
                <div class="row">
                    <div class="input-field col s12">
                        <input id="first_name" type="text" v-model="title">
                        <label for="first_name" data-error="wrong" data-success="right">Title</label>
                        <span style="color: red" v-if="createErr && createErr.title_required">{{ createErr.title_required }}</span>
                        <span style="color: red" v-if="createErr && createErr.unique_title">{{ createErr.unique_title }}</span>
                    </div>
                    <div class="input-field col s12 md6">
                        <label for="description" data-success="right">Description</label>
                        <div style="margin-top: 40px">
                        <vue-editor v-model="description"></vue-editor>
                        </div>
                        <span style="color: red" v-if="createErr && createErr.desc_required">{{ createErr.desc_required }}</span>
                    </div>
                    <div class="file-field input-field col s12">
                        <div class="btn" style="background: #039be5">
                            <span >Choose Image to use</span>
                            <input type="file">
                        </div>
                        <div class="file-path-wrapper">
                            <input @change="onChangeFileUpload" accept="image/*" class="file-path validate" placeholder="Upload file" id="file" name="food_image" ref="file" type="file">
                        </div>
                        <div v-if="food_image_display.length > 200 && visibleFile">
                            <img :src="getProfilePhoto()" alt="food image" style="width: 100%; height: 220px;">
                        </div>
                        <span style="color: red" v-if="createErr && createErr.invalid_file">{{ createErr.invalid_file }}</span>
                    </div>
                    <div class="input-field col s12">
                        <button :disabled="disabled" class="btn col s12 btn-color" style="background: #039be5">
                            <span v-if="loading">Creating...</span>
                           <span v-else>Create</span> 
                        </button>
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
import {VueEditor} from 'vue2-editor'


export default {
    components: {Layout, VueEditor },
    data: () => ({
        title: null,
        description: null,
        loading: false,
        food_image_display: '',
        options2: {
            branding: false
        },

    }),
    computed: {
        disabled(){
            return this.loading === true
        },
        createErr() {
            return this.$store.state.appError
        },
         visibleFile() {
            return this.$refs.file.files[0] !== ''
        }
    },
    methods: {
        createFood() {
            this.loading = true
            let formData = new FormData();
            formData.append('food_image', this.food_image);
            formData.append('title', this.title);
            formData.append('description', this.description);
            this.$store.dispatch('createFood', formData).then(() => {
                this.loading = false
                if(!this.createErr){
                this.$router.push("/")
                }
            })
        },
         getProfilePhoto() {
            if (this.food_image_display.length > 200) {
                return this.food_image_display;
            }
        },
        onChangeFileUpload() {
            this.food_image = this.$refs.file.files[0];
            console.log("the file uploaded: ", this.$refs.file.files[0])
            let file = this.$refs.file.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                this.food_image_display = reader.result;
            };
            reader.readAsDataURL(file);
        },
    }
}
</script>

<style scoped>
    @media only screen and (min-width: 768px) {
    #create-food-page {
        width: 50%;
        margin: auto;
        padding-bottom: 120px;
        }
     }
    @media only screen and (max-width: 768px) {
     #register-page {
        width: 90%;
        margin: auto;
        }
    }
    .cont {
      padding-bottom: 30px;
    }
    .input-field.style-foot {
        margin-top: 5px!important;
        margin-bottom: 5px!important;
    }
</style>