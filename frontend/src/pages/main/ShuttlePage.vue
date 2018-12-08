<template>
  <ShuttleList v-if="state==='list'"></ShuttleList>
  <ShuttleOrder v-else-if="state==='order'"></ShuttleOrder>
</template>

<script>
    import {eventBus} from "../../main";
    import ShuttleList from "../../components/ShuttleList";
    import ShuttleOrder from "../../components/ShuttleOrder";
    export default {
      name: "ShuttlePage",
      components: {ShuttleList, ShuttleOrder},
      data() {
        return {
          state: 'list'
        }
      },
      created() {
          eventBus.$on('orderClick', () => {
            this.state = 'order';
          });
          eventBus.$on('cancelNoticeWrite', () => {
            this.state = 'list';
          });
      }
    }
</script>

<style scoped>
</style>
