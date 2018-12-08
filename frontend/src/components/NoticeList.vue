<template>
  <div>
    <div id="control">
      <v-btn v-if="userId >= 4" @click="writeClick()">공지 작성</v-btn>
    </div>
    <table>
      <thead>
      <tr>
        <th class="id">번호</th>
        <th class="title">제목</th>
        <th class="author">작성자</th>
        <th class="date">작성날짜</th>
        <th class="views">조회 수</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="notice in notices">
        <td class="center"><nobr>{{ notice.id }}</nobr></td>
        <td><nobr>{{ notice.title }}</nobr></td>
        <td class="center"><nobr>{{ notice.userId }}</nobr></td>
        <td class="center"><nobr>{{ notice.body }}</nobr></td>
        <td class="center"><nobr>{{ notice.userId }}</nobr></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

  import {eventBus} from "../main";

  export default {
        name: "NoticeList",
      data() {
        return {
          notices: []
        }
      },
      methods: {
          writeClick() {
            eventBus.$emit("writeClick");
          }
      },
      created() {
          this.$http.get('https://jsonplaceholder.typicode.com/posts').then((result) => {
            console.log(result.data);
            this.notices = result.data.slice(0, 10);
          })
      },
      computed: {
        userId() {
          return this.$store.state.user.authLevel;
        }
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
