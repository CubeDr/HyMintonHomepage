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
      <v-btn color="primary" dark class="mb-2" @click="openNewDialog()">신규 회원 등록</v-btn>
    </v-toolbar>
    <v-dialog v-model="newDialog" max-width="500px" >
<v-layout justify-center>
    <v-flex >
      <v-form v-model="newValid" ref="form">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="newItem.id"
              :rules="[() => !!newItem.id || 'This field is required']"
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
              v-model="newItem.dep"
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

  <v-dialog v-model="newPwDialog" max-width="600px" >

      <v-card>
        <v-card-title>
          <span class="headline">회원가입 성공</span>
        </v-card-title>

        <v-card-actions>
          <v-flex xs12 sm6 class="py-2">
            <v-label>새로운 비밀번호는 <b>{{ newPw }}</b> 입니다.</v-label>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="closeNewPwDialog()">확인</v-btn>
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
        <td>{{ props.item.id}}</td>
        <td class="text-xs-left">{{ props.item.lname }}</td>
        <td class="text-xs-left">{{ props.item.fname }}</td>
        <td class="text-xs-left">{{ props.item.dep }}</td>
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
    departments: ['컴퓨터소프트웨어학부'],
    errorMessages: '',
    NewPassword:'',
    formHasErrors: false,

    newValid: false,

    newDialog: false,
    pwDialog: false,
    authDialog: false,

    newPwDialog: false,
    newPw: '',

    search: '',
    headers: [
      {
        text: '학번',
        align: 'left',
        sortable: true,
        value: 'id'
      },
      { text: '성', value: 'lname' },
      { text: '이름', value: 'fname' },
      { text: '학부', value: 'dep' },
      { text: '권한', value: 'auth' },


    ],
    lists: [],
    newItem: {
      id: '',
      lname: '',
      fname: '',
      dep: '',
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
            id: '2014003963',
           value: false,
           lname: 'Kim',
           fname: 'Jaeguk',
            dep: 'asdfasdf',
            auth: 0
        },
        {
           id: '2014002363',
           value: false,
           lname: 'Kim',
           fname: 'Hyuni',
            dep: 'asdddf',
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
    openNewDialog() {
      this.newItem = {
        sid: '',
          lname: '',
          fname: '',
          did: '',
          auth: 0,
      };
      this.newDialog = true;
    },
    openNewPwDialog() {
      this.newPwDialog = true;
    },
    closeNewPwDialog() {
      this.newPwDialog = false;
      this.newPw = '';
    },
    submit (){
      let randomPw = (10000000 + parseInt(Math.random()*90000000)).toString();
      this.$http.post('user/new', {
        id: this.newItem.id,
        pw: randomPw,
        lname: this.newItem.lname,
        fname: this.newItem.fname,
        auth: this.newItem.auth,
        dname: this.newItem.dep
      }).then((res) => {
        this.close();
        this.newPw = randomPw;
        this.openNewPwDialog();
      });
    },
    newDepartmentRule() {
      if(this.newItem.dep === '') return '학부를 입력해주세요';
      else if(!this.departments.includes(this.newItem.dep)) return '학부를 정확히 입력해주세요';
      return true;
    }
  }
}
</script>
