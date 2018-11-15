<template>
    <div>
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
      methods: {
        getStartOffset() {
          return new Date(this.year, this.month-1).getDay();
        },
        getLastDate() {
          return new Date(this.year, this.month, 0).getDate();
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
    height: 80px;
    border: 1px solid #ddd;
  }
</style>
