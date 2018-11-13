<template>
  <div id="app">
    <header>
      <HyHeader class="unSelectable"/>
    </header>
    <nav>
      <HyNav class="unSelectable" :page="page" @click="page = $event" :selectColor="background"/>
    </nav>

    <component is="NoticePage"/>
  </div>
</template>

<script>
import HyHeader from "./components/HyHeader";
import HyNav from "./components/HyNav";
import NoticePage from "./pages/NoticePage";

export default {
  components: {HyNav, HyHeader, NoticePage},
  data () {
    return {
      page: '공지사항',
      background: '#F0F8FF'
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
