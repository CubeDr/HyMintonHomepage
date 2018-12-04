<template>
    <div>
      <nav>
        <HyNav class="unSelectable" :page="page" @click="page = $event" :selectColor="background"/>
      </nav>
      <keep-alive>
        <router-view id="body"></router-view>
      </keep-alive>
    </div>
</template>

<script>
  import HyNav from "../components/HyNav";

  export default {
      name: "MainPage",
    components: {HyNav},
    props: [
      'background'
    ],
    data() {
        return {
          page: 'Notice'
        }
    }
  }
</script>

<style scoped>
  #body {
    margin-top: 20px;
  }
</style>
