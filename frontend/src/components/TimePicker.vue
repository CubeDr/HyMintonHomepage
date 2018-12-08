<template>
    <div style="width: 100%; text-align:center">
      <v-date-picker v-if="selectDate" v-model="date" :reactive="true" :color="'#aaa'"></v-date-picker>
    </div>
</template>

<script>
    export default {
      name: "TimePicker",
      props: ['value', 'selectDate'],
      data() {
        return {
          time: this.value,
          date: new Date().toISOString().substr(0, 10) // "2012-12-08"
        }
      },
      methods: {
        update() {
          this.$emit('input', this.time);
        },
      }
    }
</script>

<style scoped>
</style>
