<template>
    <div>
      <v-select
        :items="Array.from({length:20}, (x, i)=> (2010+i))"
        v-model="time.year"
        label="연도"
        attach></v-select>
      <v-select
        :items="Array.from({length:20}, (x, i)=> (2010+i))"
        v-model="time.month"
        label="월"
        attach></v-select>
      <v-select
        :items="Array.from({length:20}, (x, i)=> (2010+i))"
        v-model="time.date"
        label="일"
        attach></v-select>
    </div>
</template>

<script>
    export default {
      name: "TimePicker",
      props: ['value'],
      data() {
        return {
          time: this.value
        }
      },
      methods: {
        update() {
          this.$emit('input', this.time);
        }
      }
    }
</script>

<style scoped>

</style>
