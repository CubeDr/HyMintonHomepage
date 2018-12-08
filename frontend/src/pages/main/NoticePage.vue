<template>
  <NoticeList v-if="state==='list'"></NoticeList>
  <NoticeWrite v-else-if="state==='write'"></NoticeWrite>
</template>

<script>
  import {eventBus} from "../../main";
  import NoticeList from "../../components/NoticeList";
  import NoticeWrite from "../../components/NoticeWrite";

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
            this.state = 'write';
          });
          eventBus.$on('cancelNoticeWrite', () => {
            this.state = 'list';
          });
          eventBus.$on('wroteNotice', () => {
            this.state = 'list';
          });
      }
    }
</script>

<style scoped>
</style>
