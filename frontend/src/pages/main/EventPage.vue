<template>
  <div>
    <router-view></router-view>
    <!--<EventCalendar v-if="page=='calendar'"></EventCalendar>-->
    <!--<EventListPage v-if="page=='list'"></EventListPage>-->
  </div>
</template>

<script>
    import {eventBus} from "@/main";
    import EventCalendar from "@/components/EventCalendar";
    import EventListPage from "@/pages/event/EventListPage";
    export default {
      name: "EventPage",
      components: {EventListPage, EventCalendar},
      data() {
        return {
          page: 'calendar'
        }
      },
      created() {
        eventBus.$on('dayClick', (y, m, d) => {
          this.$router.push({name: 'EventListPage', params: {year: y, month: m, date: d}});
          console.log('view day ' + y + ', ' + m + ', ' + d)
        })
      }
    }
</script>

<style scoped>
</style>
