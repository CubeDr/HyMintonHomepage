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
#control {
  text-align: end;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  margin-top: 15px;
}

thead {
  padding-top: 20px;
  background: #999;
}

th.id {
  width: 10%;
}

th.title {
  width: 40%;
}

th.author {
  width: 20%;
}

th.date {
  width: 20%;
}

th.views {
  width: 10%;
}

td {
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
}

td.center {
  text-align: center;
}

</style>
