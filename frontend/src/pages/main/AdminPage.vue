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
      <v-btn color="primary" dark class="mb-2" @click="pwDialog=true">비밀번호 변경</v-btn>
      <v-btn color="primary" dark class="mb-2" @click="newDialog=true">신규 회원 등록</v-btn>
    </v-toolbar>
    <v-dialog v-model="newDialog" max-width="500px" >
<v-layout justify-center>
    <v-flex >
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="sid"
            v-model="newItem.sid"
            :rules="[() => !!newItem.sid || 'This field is required']"
            :error-messages="errorMessages"
            label="Student ID"
            placeholder="201400000000"
            required
          ></v-text-field>
          <v-text-field
            ref="LastName"
            :rules="[
              () => !!newItem.lname || 'This field is required',
              
            ]"
            v-model="newItem.lname"
            label="Last Name"
            placeholder="Hong"
            required
          ></v-text-field>
         <v-text-field
            ref="FirstName"
            :rules="[
              () => !!newItem.fname || 'This field is required',
              
            ]"
            v-model="newItem.fname"
            label="First Name"
            placeholder="Gildong"
            required
          ></v-text-field>
          <v-autocomplete
            ref="did"
            :items="departments"
            v-model="newItem.did"
            label="Country"
            placeholder="Select..."
            required
          ></v-autocomplete>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat @click="close">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              v-if="formHasErrors"
              left
            >
              <v-btn
                slot="activator"
                icon
                class="my-0"
                @click="resetForm"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    </v-dialog>
   
 <v-dialog v-model="pwDialog" max-width="500px" >

      <v-card>
        <v-card-title>
          <span class="headline">비밀번호변경</span>
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-text-field v-model="NewPassword" label="New Password"></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
          <v-btn color="blue darken-1" flat @click="changePassword">변경</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

 <v-dialog v-model="authDialog" max-width="600px" >

      <v-card>
        <v-card-title>
          <span class="headline">권한변경</span>
        </v-card-title>

        <v-card-actions>
           <v-flex xs12 sm6 class="py-2">
            <v-btn-toggle v-model="newAuth">
              <v-btn flat value="left">
                회장
              </v-btn>
              <v-btn flat value="center">
                부회장
              </v-btn>
              <v-btn flat value="right">
                운영진
              </v-btn>
              <v-btn flat value="justify">
                활동
              </v-btn>
              <v-btn flat value="justify">
                비활동
              </v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">취소</v-btn>
          <v-btn color="blue darken-1" flat @click="changeAuthor">변경</v-btn>
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
        <tr @click="authDialog=true">
        <td>{{ props.item.sid}}</td>
        <td class="text-xs-left">{{ props.item.lname }}</td>
        <td class="text-xs-left">{{ props.item.fname }}</td>
        <td class="text-xs-left">{{ props.item.did }}</td>
        <td class="text-xs-left">{{ props.item.auth }}</td>
        </tr>
      </template>
      <template slot="no-data">

      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
  name:'AdminPage',
  data: () => ({
    departments: ['컴퓨터소프트웨어학부','융합전자공학부','에너지공학부'],
    errorMessages: '',
    NewPassword:'',
    formHasErrors: false,

    newDialog: false,
    pwDialog: false,
    authDialog: false,
    search: '',
    headers: [
      {
        text: '학번',
        align: 'left',
        sortable: true,
        value: 'sid'
      },
      { text: '성', value: 'lname' },
      { text: '이름', value: 'fname' },
      { text: '학부', value: 'did' },
      { text: '권한', value: 'auth' },


    ],
    lists: [],
    newItem: {
      sid: '',
      lname: '',
      fname: '',
      did: '',
      auth: 0,
    },
    newAuth: ''
  }),

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.lists = [
        {
            sid: '2014003963',
           value: false,
           lname: 'Kim',
           fname: 'Jaeguk',
            did: 'asdfasdf',
            auth: 0
        },
        {
           sid: '2014002363',
           value: false,
           lname: 'Kim',
           fname: 'Hyuni',
            did: 'asdddf',
            auth: 0
        }
      ]
    },
    close () {
      this.newDialog = false
      this.pwDialog = false
      this.authDialog = false
    },
    changePassword() {
      this.close()
    },
    changeAuthor() {
      this.close()
    },
    submit (){
      this.formHasErrors = false
      this.newItem = this.lists.push(this.newItem)
      this.close()
    }
  }
}
</script>
