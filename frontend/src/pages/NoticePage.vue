<template>
  <NoticeList v-if="state==='list'"></NoticeList>
  <NoticeWrite v-else-if="state==='write'"></NoticeWrite>
</template>

<script>
    import {eventBus} from "../main";
    import NoticeList from "../components/NoticeList";
    import NoticeWrite from "../components/NoticeWrite";
    export default {
      name: "NoticePage",
      components: {NoticeWrite, NoticeList},
      data() {
        return {
          state: 'list'
        }
      },
      created() {
          eventBus.$on('writeClick', () => {
            this.state = 'write'
          })
      }
    }
</script>

<style scoped>

</style>
