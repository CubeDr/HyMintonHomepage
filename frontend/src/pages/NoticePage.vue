<template>
  <div>
    <div id="control">
      <button>공지 작성</button>
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
          <td class="center"><nobr>{{ notice.author }}</nobr></td>
          <td class="center"><nobr>{{ notice.date }}</nobr></td>
          <td class="center"><nobr>{{ notice.views }}</nobr></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
        name: "NoticePage",
        data() {
          return {
            notices: [
              {
                id: 1,
                title: '셔틀콕 구매 공지',
                author: '회장',
                date: '18.11.13',
                views: 10000
              }, {
                id: 2,
                title: '운동 일정 안내',
                author: '회장',
                date: '18.11.14',
                views: 20000
              }, {
                id: 3,
                title: '교류전 안내',
                author: '총무',
                date: '18.11.13',
                views: 1
              }, {
                id: 4,
                title: '가나다라마바사아자차카타파하abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
                author: '총무',
                date: '18.11.13',
                views: 1
              }
            ]
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
