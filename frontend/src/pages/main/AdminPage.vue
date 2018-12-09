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
      <v-form v-model="newValid" ref="form">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="newItem.sid"
              :rules="[() => !!newItem.sid || 'This field is required']"
              :error-messages="errorMessages"
              label="학번"
              required
            ></v-text-field>
            <v-text-field
              :rules="[
              () => !!newItem.lname || 'This field is required',
            ]"
              v-model="newItem.lname"
              label="성"
              required
            ></v-text-field>
            <v-text-field
              :rules="[
              () => !!newItem.fname || 'This field is required',
            ]"
              v-model="newItem.fname"
              label="이름"
              required
            ></v-text-field>
            <v-autocomplete
              :items="departments"
              :rules="[newDepartmentRule]"
              v-model="newItem.did"
              label="학부"
              required
            ></v-autocomplete>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn flat @click="close">Cancel</v-btn>
            <v-btn :disabled="!newValid" color="primary" flat @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
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

    newValid: false,

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
    },
    newDepartmentRule() {
      if(this.newItem.did === '') return '학부를 입력해주세요';
      else if(!this.departments.includes(this.newItem.did)) return '학부를 정확히 입력해주세요';
      return true;
    }
  }
}
</script>
