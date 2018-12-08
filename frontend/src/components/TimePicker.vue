<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- 날짜 선택 -->
      <v-flex xs12>
        <v-dialog
          v-if="selectDate"
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
            label="Picker in dialog"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date" no-title scrollable color="blue">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="dateDialog = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.dateDialog.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>

      <!-- 시작 시간 선택 -->
      <v-flex xs6>
        <v-dialog
          ref="startDialog"
          v-model="startDialog"
          :return-value.sync="start"
          persistent
          lazy
          full-width
          width="450px"
        >
          <v-text-field
            slot="activator"
            v-model="start"
            label="시작시간"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-time-picker :landscape="true" :full-width="true" color="blue" v-model="start">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="startDialog = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.startDialog.save(start)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>

      <!-- 종료 시간 선택 -->
      <v-flex xs6>
        <v-dialog
          ref="endDialog"
          v-model="endDialog"
          :return-value.sync="end"
          persistent
          lazy
          full-width
          width="450px"
        >
          <v-text-field
            slot="activator"
            v-model="end"
            label="종료시간"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-time-picker :landscape="true" :full-width="true" color="blue" v-model="end">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="endDialog = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.endDialog.save(end)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "TimePicker",
      props: ['value', 'selectDate'],
      data() {
        return {
          time: this.value,
          date: new Date().toISOString().substr(0, 10), // "2012-12-08",
          start: '16:00',
          end: '19:00',
          dateDialog: false,
          startDialog: false,
          endDialog: false
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
