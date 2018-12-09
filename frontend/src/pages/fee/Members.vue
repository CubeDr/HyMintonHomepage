<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center>
      <v-data-table
        :headers="headers"
        :items="payments"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr @click="$router.push({name:'FeeUserPage', params:{'id': props.item.id}})">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.paid }}</td>
            <td class="text-xs-center">{{ props.item.npaid }}</td>
            <td class="text-xs-center">{{ props.item.lastPaid==null?'':props.item.lastPaid.koreanDatePart }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
    import Time from "../../classes/Time";

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
          this.$http.get('payment/all').then((res) => {
            this.payments = res.data.map((data) => {
                return {
                  name: data.id,
                  id: data.id,
                  paid: data.paid,
                  npaid: data.npaid,
                  lastPaid: data.lastpaid==null?'':Time.fromFormatString(data.lastpaid)
                }
              }
            );

          });
        },
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
