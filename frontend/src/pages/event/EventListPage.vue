<template>
    <div id="body">
      <div id="mainTitle">{{ year }}년 {{ month }}월 {{ date }}일 일정</div>
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
    </div>
</template>

<script>
    export default {
      name: "EventListPage",
      data() {
        return {
          events: [
            {
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
}
#mainTitle {
  font-weight: 800;
  font-size: 40px;
  text-align: center;
  margin: auto;
}
.divider {
  width: 90%;
  margin: auto;
  border: 1px solid lightgray;
}
.card {
  width: 50%;
  margin: 15px auto;
  box-shadow: 2px 2px 10px 5px lightgray;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
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
