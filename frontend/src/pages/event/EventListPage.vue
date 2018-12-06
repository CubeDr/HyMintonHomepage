<template>
    <div>
      {{ year }}년 {{ month }}월 {{ date }}일
    </div>
</template>

<script>
    export default {
      name: "EventListPage",
      data() {
        return {
          year: this.$route.params.year,
          month: this.$route.params.month,
          date: this.$route.params.date
        }
      }
    }
</script>

<style scoped>

</style>
