<template>
  <div>
    <div id="addButton">
      <button>일정 추가</button>
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
