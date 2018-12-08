<template>
  <v-app>
    <v-content>
      <HyHeader class="unSelectable"/>
      <router-view :background="background"></router-view>
    </v-content>
  </v-app>

</template>

<script>
  import HyHeader from "./components/HyHeader";

  export default {
    components: {HyHeader},
    data () {
      return {
        background: 'white'
      }
    }
  }
</script>

<style>

  #app {
    width: 100%;
    min-width: 700px;
    max-width: 1100px;
    margin: auto;
  }

  *.unSelectable {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;

    /*
      Introduced in IE 10.
      See http://ie.microsoft.com/testdrive/HTML5/msUserSelect/
    */
    -ms-user-select: none;
    user-select: none;
  }
</style>
