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
                    <td class="text-xs-center">{{ props.item.name }}</td>
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
            {text: '이름', value: 'name', align: 'center', sortable: false},
          ]
        }
      },
      created() {
        this.loadNPayInfo();
      },
      methods: {
        loadNPayInfo() {
          this.npays = [
            {
              fee: '1208',
              who: [
                {
                  id: '2014003991',
                  name: '김현의'
                }, {
                  id: '2014003992',
                  name: '김현위'
                }, {
                  id: '2014003993',
                  name: '김현희'
                }, {
                  id: '2014003994',
                  name: '김현휘'
                }
              ]
            }, {
              fee: '1207',
              who: [
                {
                  id: '2014003991',
                  name: '김현의'
                }, {
                  id: '2014003992',
                  name: '김현위'
                }, {
                  id: '2014003993',
                  name: '김현희'
                }, {
                  id: '2014003994',
                  name: '김현휘'
                }
              ]
            }
          ]
        },
        feeToString(fee) {
          return "20" + fee.substr(0, 2) + "년 " + fee.substr(2, 4) + '월 회비';
        }
      }
    }
</script>

<style scoped>

</style>
