<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-layout
      align-center
      column
      justify-center
    >
      <img :src="logo" alt="Vuetify.js" height="300" style="width:500px">
      <h1 class="white--text mb-2 display-1 text-xs-center">HY-MINTON</h1>
      <h4 class="subheading mb-3 text-xs-center">Those who play badminton well take decisions quickly</h4>
        <v-btn :to ="loginlink" color="success">GET STARTED</v-btn>
    </v-layout>
  </v-parallax>
</template>

<script>
    import logoWhite from '../assets/logo_white.png'
    export default {
        
        name: "IndexPage",
        data: function () {
         return {
        loginlink: '/login',
          logo: logoWhite
        }
      }

    }
</script>

<style scoped>
img {
  width: 100%;
}
</style>
