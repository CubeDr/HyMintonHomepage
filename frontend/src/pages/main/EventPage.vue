<template>
  <div>
    <div id="addButton">
      <v-btn flat>일정 추가</v-btn>
    </div>
    <EventCalendar></EventCalendar>
  </div>
</template>

<script>
    import EventCalendar from "../../components/EventCalendar";
    export default {
        name: "EventPage",
      components: {EventCalendar}
    }
</script>

<style scoped>
  #addButton {
    width: 80%;
    text-align: right;
  }
</style>
