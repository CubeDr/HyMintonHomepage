<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center>
      <v-data-table
        :headers="headers"
        :items="payments"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr @click="$router.push({name:'FeeUserPage', params:{'id': userId}})">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.paid }}</td>
            <td class="text-xs-center">{{ props.item.npaid }}</td>
            <td class="text-xs-center">{{ props.item.lastPaid }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "Members",
      data () {
        return {
          headers: [
            {
              text: '회원명',
              align: 'left',
              value: 'name'
            },
            {text: '납부', value: 'paid'},
            {text: '미납', value: 'npaid'},
            {text: '마지막 납부일', value: 'lastPaid'}
          ],
          payments: []
        }
      },
      methods: {
        loadUserPaymentInfo() {
          // ... load from url

          this.payments = [
            {
              value: true,
              name: '김현이',
              id: '2014003990',
              paid: 100,
              npaid: 0,
              lastPaid: '2018-12-08'
            }
          ]
        }
      },
      created() {
        this.loadUserPaymentInfo();
      },
      computed: {
        userId() {
          return this.$store.state.user.id;
        }
      }
    }
</script>

<style scoped>

</style>
