<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- 날짜 선택 -->
      <v-flex xs5>
        <v-dialog
          ref="dateDialog"
          v-model="dateDialog"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="날짜"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable color="blue" @input="update">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dateDialog = false">취소</v-btn>
            <v-btn flat color="primary" @click="$refs.dateDialog.save(date)">확인</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>

      <!-- 시작 시간 선택 -->
      <v-flex xs6>
        <v-dialog
          ref="timeDialog"
          v-model="timeDialog"
          :return-value.sync="time"
          persistent
          lazy
          full-width
          width="450px"
        >
          <v-text-field
            slot="activator"
            v-model="formattedTime"
            label="시간"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-time-picker :landscape="true" :full-width="true" color="blue" v-model="time" @input="update">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="timeDialog = false">취소</v-btn>
            <v-btn flat color="primary" @click="$refs.timeDialog.save(time)">확인</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import Time from "@/classes/Time";

  export default {
      name: "TimePicker",
      props: ['value'], // value: { starttime, endtime }
      data() {
        return {
          datetime: this.value,
          date: this.value.datePart,
          time: this.value.timePart,
          dateDialog: false,
          timeDialog: false
        }
      },
      computed: {
        formattedTime() {
          return this.datetime.koreanTimePart;
        }
      },
      methods: {
        update() {
          this.datetime = Time.fromFormatString(this.date + " " + this.time);
          this.$emit('input', this.datetime);
        }
      }
    }
</script>

<style scoped>
</style>
