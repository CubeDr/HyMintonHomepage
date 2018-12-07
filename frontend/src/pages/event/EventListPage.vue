<template>
    <div id="body">
      <!-- 일정 큰 타이틀 -->
      <div id="mainTitle">{{ year }}년 {{ month }}월 {{ date }}일 일정</div>

      <!-- 일정 추가 버튼 -->
      <v-card v-if="!dialog" class="card center slowTransition" @click="openDialog()">
        <v-icon>add</v-icon>
      </v-card>

      <!-- 일정 추가 카드 -->
      <v-card id="addCard" :class="{card:true, slowTransition:true, h0:!dialog}" >
        <v-card-title class="headline">일정 추가</v-card-title>
        <v-card-text>
          <v-form v-model="addEvent.valid">
            <v-text-field
              v-model="addEvent.title"
              :counter="20"
              label="일정 제목"
              required></v-text-field>
            <TimePicker :value="addEvent.startTime" @input="e => addEvent.startTime = e"></TimePicker>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="dialog = false">취소</v-btn>
            <v-btn color="green darken-1" flat @click="dialog = false">추가</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>

      <!-- 일정 리스트 -->
      <div class="card" v-for="e in events">
        <div class="title">{{ e.title }}</div>
        <div class="divider"></div>
        <div class="component grid37">
          <div class="startTimeTitle">시작 시간</div>
          <div class="startTimeData">{{ e.startTime.koreanString }}</div>
        </div>
        <div class="component grid37">
          <div class="endTimeTitle">종료 시간</div>
          <div class="endTimeData">{{ e.endTime.koreanString }}</div>
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
    </div>
</template>

<script>
    import TimePicker from "@/components/TimePicker";
    import Time from "@/classes/Time";
    export default {
      name: "EventListPage",
      components: {TimePicker},
      data() {
        return {
          dialog: false,
          addEvent: {
            valid: false,
            title: '',
            startTime: new Time(2018, 12, 8, 16, 0),
            endTime: new Time(2018, 12, 8, 19, 0)
          },
          events: [
            {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
              ourParticipants: 20,
              guests: 10
            }, {
              title: 'OB 교류전',
              startTime: new Time(2018, 12, 8, 16, 0),
              endTime: new Time(2018, 12, 8, 19, 0),
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
  overflow: hidden;
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
.slowTransition {
  transition: 1s;
}
.h0 {
  height: 0;
  box-shadow: None;
}
</style>
