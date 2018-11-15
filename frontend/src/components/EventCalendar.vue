<template>
    <div>
      <div id="monthPicker">
        <button class="pickButton" @click="changeMonth(-1)"><</button>
        <h1 id="monthDisplay">{{ displayYear }}년 {{ displayMonth }}월</h1>
        <button class="pickButton" @click="changeMonth(1)">></button>
      </div>
      <table>
        <thead>
          <tr>
            <td>일</td>
            <td>월</td>
            <td>화</td>
            <td>수</td>
            <td>목</td>
            <td>금</td>
            <td>토</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in getCalendarArray()">
            <td v-for="date in week">{{ date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
    export default {
      name: "EventCalendar",
      props: {
        year: {
          type: Number,
          default() {
            return new Date().getFullYear();
          }
        },
        month: {
          type: Number,
          default() {
            return new Date().getMonth() + 1;
          }
        }
      },
      data() {
        return {
          displayYear: this.year,
          displayMonth: this.month
        }
      },
      methods: {
        getStartOffset() {
          return new Date(this.displayYear, this.displayMonth-1).getDay();
        },

        getLastDate() {
          return new Date(this.displayYear, this.displayMonth, 0).getDate();
        },

        getCalendarArray() {
          let calendar = [];
          let offset = this.getStartOffset();
          let week = [];
          let date = 1;
          const lastDate = this.getLastDate();
          // first week
          for(let i=0; i<offset; i++) week.push(' ');
          for(let i=offset; i<7; i++) week.push(date++);
          calendar.push(week);

          while(date <= lastDate) {
            week = [];
            let i=0;
            for(; i<7 && date <= lastDate; i++) week.push(date++);
            for(; i<7; i++) week.push(' ');
            calendar.push(week);
          }

          console.log(calendar);
          return calendar;
        },

        changeMonth(delta) {
          this.displayMonth += delta;
          while(this.displayMonth > 12) {
            this.displayMonth -= 12;
            this.displayYear++;
          }
          while(this.displayMonth <= 0) {
            this.displayMonth += 12;
            this.displayYear--;
          }
        }
      }
    }
</script>

<style scoped>
  table {
    width: 80%;
    border-collapse: collapse;
    margin: auto;
    border: 2px solid lightgray;
  }

  thead {
    background: #eee;
  }

  td {
    height: 60px;
    border: 1px solid #ddd;
  }

  #monthPicker {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;
    height: 50px;
  }

  #monthDisplay {
    margin: 0 20px 0 20px;
  }

  .pickButton {
    width: 50px;
    height: 100%;
  }
</style>
