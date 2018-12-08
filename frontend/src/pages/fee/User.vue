<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center>
      <v-data-table
        :headers="headers"
        :items="payments"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">{{ props.item.date }}</td>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "User",
      data () {
        return {
          headers: [
            {
              text: '회비명',
              align: 'left',
              value: 'name'
            },
            { text: '금액', value: 'price' },
            { text: '납부일', value: 'date' }
          ],
          payments: [
            {
              value: true,
              name: '12월 회비',
              price: '10,000원',
              date: '2018년 12월 11일'
            },{
              value: true,
              name: '11월 회비',
              price: '10,000원',
              date: '2018년 12월 10일'
            },{
              value: true,
              name: '10월 회비',
              price: '10,000원',
              date: '2018년 12월 12일'
            },{
              value: true,
              name: '9월 회비',
              price: '10,000원',
              date: '2018년 12월 13일'
            },{
              value: true,
              name: '8월 회비',
              price: '10,000원',
              date: '2018년 12월 09일'
            },{
              value: true,
              name: '7월 회비',
              price: '10,000원',
              date: '2018년 12월 08일'
            },
          ]
        }
      }
    }
</script>

<style scoped>
.center {
  text-align: center;
}
</style>
