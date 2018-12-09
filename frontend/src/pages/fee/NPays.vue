<template>
  <v-container grid-list-md>
    <v-layout row wrap align-center justify-center>
      <v-flex xs6>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(npay, i) in npays"
            :key="i"
          >
            <div slot="header">{{ feeToString(npay.fee) + ' - ' + npay.who.length }}</div>
            <v-card>
              <v-data-table
                :headers="headers"
                :items="npay.who"
              >
                <template slot="items" slot-scope="props">
                  <tr @click="$router.push({name:'FeeUserPage', params:{'id': props.item.id}})">
                    <td class="text-xs-center">{{ props.item.id }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    export default {
      name: "NPays",
      data() {
        return {
          npays: [],
          headers: [
            {text: '학번', value: 'id', align: 'center', sortable: false},
          ]
        }
      },
      created() {
        this.loadNPayInfo();
      },
      methods: {
        loadNPayInfo() {
          this.$http.get('payment/nopay').then((res) => {
            // console.log(res.data);
            let result = [];
            res.data.forEach((item) => {
              let existing = result.filter((v, i) => v.fee === item.FID);
              if(existing.length) {
                let eIdx = result.indexOf(existing[0]);
                result[eIdx].who = result[eIdx].who.concat({
                  // parse user data
                  id: item.UID,
                  name: '유저' + item.UID
                });
              } else {
                result.push({
                  fee: item.FID,
                  who: [{
                    // parse user data
                    id: item.UID,
                    name: '유저' + item.UID
                  }]
                });
              }
            });

            this.npays = result;
          });
        },
        feeToString(fee) {
          return fee.substr(0, 4) + "년 " + fee.substr(4, 6) + '월 회비';
        }
      }
    }
</script>

<style scoped>

</style>
