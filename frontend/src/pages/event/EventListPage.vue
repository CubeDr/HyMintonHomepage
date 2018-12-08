<template>
    <div id="body">
      <!-- 일정 큰 타이틀 -->
      <div id="mainTitle">{{ year }}년 {{ month }}월 {{ date }}일 일정</div>

      <!-- 일정 추가 버튼 -->
      <v-card v-if="userId >= 4 && !dialog" class="card center slowTransition hover" @click="openDialog()">
        <v-icon>add</v-icon>
      </v-card>

      <!-- 일정 추가 카드 -->
      <v-card v-if="userId >= 4" id="addCard" :class="{card:true, slowTransition:true, h0:!dialog}" >
        <v-card-title class="headline">일정 추가</v-card-title>
        <v-card-text>
          <v-form v-model="addEvent.valid">

            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="addEvent.name"
                    :counter="20"
                    label="일정 제목"
                    required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="addEvent.place"
                    :counter="20"
                    label="장소"
                    required></v-text-field>
                </v-flex>

                <b>시작시간</b>
                <TimePicker :value="addEvent.time.start" @input="(e) => addEvent.time.start = e"></TimePicker>
                <b>종료시간</b>
                <TimePicker :value="addEvent.time.end" @input="(e) => addEvent.time.end = e"></TimePicker>


                <v-flex xs12>
                  <v-text-field label="참여자수" type="number"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>

          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" flat @click="cancelDialog()">취소</v-btn>
            <v-btn color="green darken-1" flat @click="saveDialog()">추가</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>

      <!-- 일정 리스트 -->
      <div class="card hover" v-for="e in events">
        <div class="title">{{ e.name }}</div>
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
          <div class="component grid37">
            <div class="tpTitle">참가 인원</div>
            <div class="tpData center">{{ e.participants }}명</div>
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
          name: '',
          place: '',
          time: {
            start: new Time(2018, 12, 8, 16, 0),
            end: new Time(2018, 12, 8, 19, 0)
          }
        },
        events: []
      }
    },
    computed: {
      year() { return this.$route.params.year; },
      month() { return this.$route.params.month; },
      date() { return this.$route.params.date; },
      userId() { return this.$store.state.user.id; }
    },
    methods: {
      log(e) {
        console.log(e);
      },
      openDialog() {
        this.addEvent = {
          name: '',
          place: '',
          time: {
            start: new Time(2018, 12, 8, 16, 0),
            end: new Time(2018, 12, 8, 19, 0)
          }
        };
        this.dialog = true;
      },
      cancelDialog() {
        this.dialog = false;
      },
      saveDialog() {
        console.log(this.addEvent);
        this.$http.post('http://115.140.236.238:14707/db/event/new', {
          name: this.addEvent.name,
          place: this.addEvent.place,
          time: {
            start: this.addEvent.time.start.formatString,
            end: this.addEvent.time.end.formatString
          }
        }).then((res) => {
          this.load();
          this.dialog = false;
        });
      },
      load() {
        let url = `http://115.140.236.238:14707/db/event/${this.year}${this.month<10?'0'+this.month:this.month}/${this.date}`;
        this.$http.get(url).then((res) => {
          this.events = res.data.map((data) => {
            let title = data.name;
            let st = Time.fromFormatString(data.start);
            let et = Time.fromFormatString(data.end);
            let p = data.member==null?0:data.member;

            return {
              name: title,
              startTime: st,
              endTime: et,
              participants: p
            }
          })
        });
      }
    },
    created() {
      this.load();
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
}
.hover{
  transition: 0.5s;
}
.hover:hover {
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
  overflow: hidden;
}
</style>
