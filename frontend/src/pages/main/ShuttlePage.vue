<template>
  <div>
    <v-toolbar flat color="white">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="openOrderDialog()">셔틀콕 주문</v-btn>
    </v-toolbar>
    <v-dialog v-model="orderDialog" max-width="500px" >

      <v-card>
        <v-card-title>
          <span class="headline">셔틀콕 주문</span>
        </v-card-title>

        <v-card-text >
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field v-model="newOrder.amount" type="number" :max="stock" label="신청개수(타)"></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-text-field v-model="newOrder.content" label="신청내용"></v-text-field>
              </v-flex>
            </v-layout>
            <div>
            잔여개수(타): {{stock}}
            </div>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
          <v-btn color="blue darken-1" flat @click="order">주문</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editDialog" max-width="500px" >

      <v-card>
        <v-card-title>
          <span class="headline">주문 내역 수정</span>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#2196F3" left  @click="editPaid">지불 내역 수정</v-btn>
          <v-btn color="#2196F3" left @click="editProvided">지급 내역 수정</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="lists"
      :search="search"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.date.koreanDatePart }}</td>
        <td class="text-xs-left">{{ props.item.name.name }} ({{props.item.uid }})</td>
        <td class="text-xs-left">{{ props.item.amount }}</td>
        <td class="text-xs-left">{{ getPaid(props.item.paid) }}</td>
        <td class="text-xs-left">{{ getProvided(props.item.given) }}</td>
        <td class="text-xs-left">{{ props.item.content }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            v-if="userAuth >= 4"
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            v-if="!props.item.paid && !props.item.given && (userAuth >= 4 || userId === props.item.id)"
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template slot="no-data">

      </template>
    </v-data-table>
  </div>
</template>

<script>
  import Time from "../../classes/Time";
  import Name from "../../classes/Name";

  export default {
    name: 'ShuttlePage',
    data: () => ({
      stockMinus: false,
      stock: 100,
      orderDialog: false,
      editDialog: false,
      search: '',
      headers: [
        {
          text: '신청일',
          align: 'left',
          sortable: true,
          value: 'date'
        },
        { text: '신청인(학번)', value: 'name' },
        { text: '신청개수 (타)', value: 'amount' },
        { text: '지불', value: 'paid' },
        { text: '지급', value: 'given' },
        { text: '비고', value: 'content' },
        { text: '수정', value: 'edit', sortable: false }
      ],
      lists: [],
      newOrder: {
        amount: 1,
        content: ''
      }
    }),

    computed: {
      userAuth() {
        return this.$store.state.user.auth;
      },
      userId() {
        return this.$store.state.user.id;
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.load();
    },

    methods: {
      load () {
        this.$http.get('order/list').then((res) => {
          this.lists = res.data.map((data) => {
            return {
              oid: data.oid,
              date: Time.fromFormatString(data.date),
              uid: data.id,
              name: new Name(data.fname, data.lname),
              amount: data.amount,
              paid: data.paid===1,
              given: data.given===1,
              content: data.content
            };
          });
        });
        this.$http.get('order/left').then((res) => {
          this.stock = res.data[0].sum;
        });
      },
      getPaid(b){
        if(b) return '지불완료'
        else return '지불대기'
      },
      getProvided(b){
        if(b) return '지급완료'
        else return '지급대기'
      },

      editItem (item) {
        this.editedIndex = this.lists.indexOf(item)
        this.editDialog = true
      },

      deleteItem (item) {
        const index = this.lists.indexOf(item)
        confirm('정말로 삭제하시겠습니까?') && this.lists.splice(index, 1)
      },

      close () {
        this.orderDialog = false;
        this.editDialog = false;
      },
      openOrderDialog() {
        this.newOrder = { amount:1, content: '' };
        this.orderDialog = true;
      },
      order () {
        if(this.newOrder.amount>this.stock){

          this.close();
          return;
        }
        this.$http.post('order/new', {
          amount: this.newOrder.amount,
          id: this.$store.state.user.id,
          content: this.newOrder.content
        }).then((res) => {
          console.log(res);
          this.close();
        });
      },
      editPaid (){
        this.lists[this.editedIndex].paid = !this.lists[this.editedIndex].paid;
        this.close();
        this.updateOrderInfo();
      },
      editProvided (){
        this.lists[this.editedIndex].given = !this.lists[this.editedIndex].given;
        this.close();
        this.updateOrderInfo();
      },
      updateOrderInfo() {
        let oid = this.lists[this.editedIndex].oid;
        let obj = {
          id: this.$store.state.user.id,
          oid: oid,
          paid: this.lists[this.editedIndex].paid?1:0,
          given: this.lists[this.editedIndex].given?1:0
        };
        console.log(obj);
        this.$http.post('order/mod', obj).then((res) => {
          console.log(res);
        });
      }
    }
  }
</script>
