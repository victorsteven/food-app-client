<template>
    <footer>
        <div class="center">
            <strong>Developed with ❤️  by <a target="_blank" href="https://twitter.com/stevensunflash"><span  style="color: green">@stevensunflash</span></a> &copy; {{ new Date().getFullYear() }}</strong>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data(){
            return {

            }
        },
    }
</script>

<style scoped>
     @media only screen and (min-width: 768px) {
        .center {
            margin: auto;
            width: 50%;
        }
    }
    .center {
        padding: 20px 0px;
    }
</style>

