<template>
  <v-card>
    <v-card-title>
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      
      <v-spacer></v-spacer>
     
       <div>
        <v-btn @click="orderClick()" depressed small color = "#90CAF9">구매신청 (보유량: {{stock}})</v-btn>
      </div>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="list"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.ta }}</td>
        <td class="text-xs-left" >{{ getPaid(props.item.paid) }}</td>
        <td class="text-xs-left">{{ getProvided(props.item.provided) }}</td>
        <td class="text-xs-left">{{ props.item.etc }}</td>
      </template>
      <v-alert slot="no-results" :value="true" color="#90A4AE" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
   
  </v-card>
</template>

<script>
import {eventBus} from "../main";

  export default {
    name: "ShuttleList",
    data () {
      return {
        stock: 100,
        search: '',
        headers: [
          {
            text: '신청일',
            align: 'left',
            sortable: true,
            value: 'date'
          },
          { text: '신청인', value: 'name' },
          { text: '신청개수 (타)', value: 'ta' },
          { text: '지불', value: 'paid' },
          { text: '지급', value: 'provided' },
          { text: '비고', value: 'etc' }
        ],
        list: [
          {
            date: '2018-12-05',
            value: false,
            name: '김현이',
            ta: 10,
            etc: '회장이 좀 쓰겠다는데...',
            paid: true,
            provided: true,
          },
          {
            date: '2018-12-07',
            value: false,
            name: '김병찬',
            ta: 10,
            etc: '오랜만에 좀 칠게요',
            paid: true,
            provided: false,
          }
        ]
       
      }
    },
     methods: {
            getPaid(b){
               if(b) return '지불완료'
               else return '지불대기'
            },
            getProvided(b){
                if(b) return '지급완료'
                else return '지급완료'
            },
            orderClick() {
            eventBus.$emit("orderClick");
        }
  }
  }
</script>

<style scoped>

</style>
