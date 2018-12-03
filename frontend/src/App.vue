<template>
  <div id="app">
    <header>
      <HyHeader class="unSelectable"/>
    </header>
    <nav>
      <HyNav class="unSelectable" :page="page" @click="page = $event" :selectColor="background"/>
    </nav>
    <keep-alive>
      <router-view id="body"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import HyHeader from "./components/HyHeader";
  import HyNav from "./components/HyNav";
  import NoticePage from "./pages/NoticePage";
  import EventPage from "./pages/EventPage";
  import FeePage from "./pages/FeePage";
  import ShuttlePage from "./pages/ShuttlePage";

  export default {
    components: {HyNav, HyHeader},
    data () {
      return {
        page: 'Notice',
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

  #body {
    margin-top: 20px;
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
