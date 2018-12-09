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
        <td><nobr @click ="openNoticeDialog( notice )">{{ notice.title }}</nobr></td>
        <td class="center"><nobr>{{ notice.lname + notice.fname }}</nobr></td>
        <td class="center"><nobr>{{ notice.date }}</nobr></td>
        <td class="center"><nobr>{{ notice.hits }}</nobr></td>
      </tr>
      </tbody>

<v-dialog
      v-model="dialog"
      width="500"
    >


      <v-card>
        <v-card-title
          class="headline grey lighten-2"

        >
          공지제목 <v-spacer></v-spacer>{{noticeWriter}}
        </v-card-title>

        <v-card-text>
        ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    </table>
  </div>
</template>

<script>

  import {eventBus} from "../main";

  export default {
        name: "NoticeList",
      data() {
        return {
          dialog: false,
          notices: [],
          noticeName:'',
          noticeWriter:'',
          noticeDate:'',
          noticeContent:''

        }
      },
      methods: {
        openNoticeDialog( notice ){
          this.noticeName = notice.name;
          this.noticeWriter = notice.lname+notice.fname;
          this.noticeDate = notice.date;
          //?
          this.noticeContent = notice.content;
          this.dialog = true;
        },
          writeClick() {
            eventBus.$emit("writeClick");
          }
      },
      created() {
          this.$http.get('notice/list').then((result) => {
            this.notices = result.data;
          })
      },
      computed: {
        userId() {
          return this.$store.state.user.auth;
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
