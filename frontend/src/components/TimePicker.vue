<template>
    <div style="width: 100%; text-align:center">
      <v-dialog
        ref="dialog"
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
          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
        </v-date-picker>
      </v-dialog>

      <v-time-picker :landscape="true" :small="true" :full-width="true"></v-time-picker>
    </div>
</template>

<script>
    export default {
      name: "TimePicker",
      props: ['value', 'selectDate'],
      data() {
        return {
          time: this.value,
          date: new Date().toISOString().substr(0, 10), // "2012-12-08"
          dateDialog: false
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
