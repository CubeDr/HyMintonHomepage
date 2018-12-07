<template>
    <div id="body">
      <!-- 일정 큰 타이틀 -->
      <div id="mainTitle">{{ year }}년 {{ month }}월 {{ date }}일 일정</div>

      <!-- 일정 추가 버튼 -->
      <v-card class="card center" @click="dialog=true">
        <v-icon>add</v-icon>
      </v-card>

      <!-- 일정 리스트 -->
      <div class="card" v-for="e in events">
        <div class="title">{{ e.title }}</div>
        <div class="divider"></div>
        <div class="component grid37">
          <div class="startTimeTitle">시작 시간</div>
          <div class="startTimeData">{{ timeToString(e.startTime) }}</div>
        </div>
        <div class="component grid37">
          <div class="endTimeTitle">종료 시간</div>
          <div class="endTimeData">{{ timeToString(e.endTime) }}</div>
        </div>
        <div class="divider"></div>
        <div class="participants box-size">
          <div class="component grid2323">
            <div class="opTitle">참가 인원</div>
            <div class="opData center">{{ e.ourParticipants }}명</div>
            <div class="gpTitle">게스트 인원</div>
            <div class="gpData center">{{ e.guests }}명</div>
          </div>
          <div class="component grid37">
            <div class="tpTitle">총 참여 인원</div>
            <div class="tpData center">{{ e.ourParticipants + e.guests }}명</div>
          </div>
        </div>
      </div>

      <!-- 일정 추가 다이얼로그 -->
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">일정 추가</v-card-title>
          <v-card-text>
            <v-form v-model="addEvent.valid">
              <v-text-field
                v-model="addEvent.title"
                :counter="20"
                label="일정 제목"
                required></v-text-field>
              <v-time-picker v-model="addEvent.start" :landscape="true"></v-time-picker>
              <v-time-picker v-model="addEvent.end" :landscape="true"></v-time-picker>
            </v-form>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" flat @click="dialog = false">취소</v-btn>
              <v-btn color="green darken-1" flat @click="dialog = false">추가</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
    export default {
      name: "EventListPage",
      data() {
        return {
          dialog: false,
          addEvent: {
            valid: false,
            title: '',
            startTime: '',
            endTime: ''
          },
          events: [
            {
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            },{
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            },{
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            },{
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            },{
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            },{
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            },{
              title: 'OB 교류전',
              startTime: '2018-12-06 16:00',
              endTime: '2018-12-06 19:00',
              ourParticipants: 20,
              guests: 10
            }
          ]
        }
      },
      computed: {
        year() { return this.$route.params.year; },
        month() { return this.$route.params.month; },
        date() { return this.$route.params.date; }
      },
      methods: {
        timeToString(time) {
          let year = parseInt(time.slice(0, 4));
          let month = parseInt(time.slice(5, 7));
          let date = parseInt(time.slice(8, 10));
          let hour = parseInt(time.slice(11, 13));
          let min = parseInt(time.slice(14, 16));
          let ampm = hour>=12?"오후":"오전";
          if(hour > 12) hour -= 12;

          let result = `${year}년 ${month}월 ${date}일 ${ampm} ${hour}시`;
          if(min > 0) result += ` ${min}분`;
          return result;
        },
        openDialog() {
          // TODO: init dialog
          this.dialog = true;
        }
      }
    }
</script>

<style scoped>
.center {
  text-align: center;
}
#body {
  width: 100%;
  margin: auto;
  position: relative;
}
#mainTitle {
  width: 420px;
  font-weight: 800;
  font-size: 30px;
  margin: auto;
}
.divider {
  width: 90%;
  margin: auto;
  border: 1px solid lightgray;
}
.card {
  max-width: 420px;
  margin: 15px auto;
  background: white;
  box-shadow: 2px 2px 10px 5px lightgray;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  transition: 0.5s;
}
.card:hover {
  background: #eeeeee;
}
.title {
  padding: 20px 15px 20px 15px;
}
.component {
  padding: 10px 15px 10px 15px;
}
.participants {
  width: 100%;
}
.grid2323 {
  display: grid;
  grid-template-columns: 20% 30% 20% 30%;
}
.grid37 {
  display: grid;
  grid-template-columns: 30% 70%;
}
.title, .startTimeTitle, .endTimeTitle, .opTitle, .gpTitle, .tpTitle {
  font-weight: 700;
}
</style>
