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
      <v-btn color="primary" dark class="mb-2" @click="dialog1=true">셔틀콕 주문</v-btn>
    </v-toolbar>
    <v-dialog v-model="dialog1" max-width="500px" >

      <v-card>
        <v-card-title>
          <span class="headline">셔틀콕 주문</span>
        </v-card-title>

        <v-card-text >
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field v-model="newOrder.amount" type="number" label="신청개수(타)"></v-text-field>
              </v-flex>
              <v-flex xs9>
                <v-text-field v-model="newOrder.content" label="신청내용"></v-text-field>
              </v-flex>
            </v-layout>
            잔여개수(타): {{stock}}
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
          <v-btn color="blue darken-1" flat @click="order">주문</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" max-width="500px" >

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
            v-if="!props.item.paid && !props.item.given && (userAuth >= 4 || userId === item.id)"
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
      stock: 100,
      dialog1: false,
      dialog2: false,
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
        amount: 0,
        content: ''
      }
    }),

    computed: {
      userAuth() {
        return this.$store.state.user.authLevel;
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
      this.load()
    },

    methods: {
      load () {
        this.$http.get('order/list').then((res) => {
          this.lists = res.data.map((data) => {
            return {
              date: Time.fromFormatString(data.date),
              uid: '?',
              name: new Name(data.fname, data.lname),
              amount: data.amount,
              paid: data.paid===1,
              given: data.given===1,
              content: data.content
            };
          });
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
        this.editedItem = Object.assign({}, item)
        this.dialog2 = true
      },

      deleteItem (item) {
        const index = this.lists.indexOf(item)
        confirm('정말로 삭제하시겠습니까?') && this.lists.splice(index, 1)
      },

      close () {
        this.dialog1 = false
        this.dialog2 = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)

        }, 300)
      },

      order () {

        this.stock = this.stock - this.editedItem.ta
        this.editedItem =
          this.lists.push(this.editedItem)

        this.close()
      },
      editPaid (){
        this.lists[this.editedIndex].paid = !this.lists[this.editedIndex].paid
        this.close()
      },
      editProvided (){
        this.lists[this.editedIndex].given = !this.lists[this.editedIndex].given
        this.close()
      }
    }
  }
</script>
