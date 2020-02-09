<template>
    <div id="login-page" class="row" >
        <div class="col s12 z-depth-6 card-header" style="margin-top: 20px;">
            <h4>Edit Food Type</h4>
        </div>
        <div class="col s12 z-depth-6 card-panel" style="margin-bottom: 100px">
        <form class="login-form" @submit.prevent="updateFood" enctype="multipart/form-data">
            <div class="row">
                <div class="input-field col s12">
                    <input id="first_name" type="text" v-model="title">
                    <span style="color: red" v-if="createErr && createErr.title_required">{{ createErr.title_required }}</span>
                </div>
                <div class="input-field col s12 md6">
                    <label for="description" data-success="right">Description</label>
                    <div style="margin-top: 40px">
                    <!-- <tinymce :branding="false" 
                            :other_options="options2" id="description" 
                            v-model="description"
                    >
                    </tinymce> -->
                    <vue-editor v-model="description"></vue-editor>
                    </div>
                    <span style="color: red" v-if="createErr && createErr.desc_required">{{ createErr.desc_required }}</span>
                </div>
                <div class="file-field input-field col s12">
                    <div class="btn">
                        <span>Choose Image to use</span>
                        <input type="file">
                    </div>
                     <span>
                        <div :class="{ 'hideIt' : hideImage }">
                            <img  :src="showImage" alt="event image" style="width: 100%; height: 220px;">
                        </div>
                    </span>
                    <div class="file-path-wrapper">
                        <input @change="onChangeFileUpload" accept="image/*" class="file-path validate" placeholder="Upload file" id="file" name="food_image" ref="file" type="file">
                    </div>
                    <div v-if="food_image_display.length > 200 && visibleFile">
                        <img :src="getProfilePhoto()" alt="event image" style="width: 100%; height: 220px;">
                    </div>
                </div>
                <div class="input-field col s12">
                    <button :disabled="disabled" class="btn waves-effect waves-light col s12 btn-color">
                        <span v-if="loading">Updating...</span>
                        <span v-else>Update</span> 
                    </button>
                </div>
            </div>
        </form>
        </div>
    </div> 
</template>


<script>

// import tinymce from 'vue-tinymce-editor'
import {VueEditor} from 'vue2-editor'


export default {
    props: ['food'],
    components: { VueEditor },

    data: () => ({
        title: '',
        description: '',
        options2: {
            branding: false
        },
        food_image_display: '',
        loading: false,
        hideImage: false,
    }),

    mounted() {
        this.title =  this.food.title
        this.description = this.food.description
    },

    computed: {
        disabled(){
            return this.loading === true
        },
        createErr() {
            return this.$store.state.foodError
        },
         visibleFile() {
            return this.$refs.file.files[0] !== ''
        },
        showImage() {
            return this.food.avatar_path
        },
    },
    methods: {
        updateFood() {
            this.loading = true
            let formData = new FormData();
            formData.append('food_image', this.food_image);
            formData.append('title', this.title);
            formData.append('description', this.description);
            this.$store.dispatch('createFood', formData).then(() => {
                this.loading = false
            })
        },
         getProfilePhoto() {
            if (this.food_image_display.length > 200) {
                return this.food_image_display;
            }
        },
        onChangeFileUpload() {

            this.hideImage = true

            this.food_image = this.$refs.file.files[0];
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
    #login-page {
        width: 50%;
        margin: auto
    }
    .input-field.style-foot {
        margin-top: 5px!important;
        margin-bottom: 5px!important;
    }
    .hideIt {
        display: none;
    }
    
</style>