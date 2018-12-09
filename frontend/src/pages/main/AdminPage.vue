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
      <v-btn color="primary" dark class="mb-2" @click="openPwDialog">비밀번호 변경</v-btn>
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
            <v-autocomplete
              :items="['회장', '부회장', '운영진', '활동회원', '비활동회원']"
              :rules="[() => !!newItem.authString || '권한을 입력해주세요']"
              v-model="newItem.authString"
              label="권한"
              required
            ></v-autocomplete>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn flat @click="close">Cancel</v-btn>
            <v-btn :disabled="!newValid" color="primary" flat @click="newSubmit">Submit</v-btn>
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
            <v-text-field v-model="newPw" label="New Password"></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closePwDialog">취소</v-btn>
            <v-btn color="blue darken-1" flat @click="updatePw">변경</v-btn>
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
              <v-btn-toggle v-model="newItem.auth">
                <v-btn flat value="5">
                  회장
                </v-btn>
                <v-btn flat value="4">
                  부회장
                </v-btn>
                <v-btn flat value="3">
                  운영진
                </v-btn>
                <v-btn flat value="2">
                  활동
                </v-btn>
                <v-btn flat value="1">
                  비활동
                </v-btn>
              </v-btn-toggle>
            </v-flex>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeAuthDialog">취소</v-btn>
            <v-btn color="blue darken-1" flat @click="newAuth">변경</v-btn>
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

    <v-dialog v-model="errorDialog" max-width="600px" >
      <v-card>
        <v-card-title>
          <span class="headline">에러 발생!!</span>
        </v-card-title>

        <v-card-actions>
          <v-flex xs12 sm6 class="py-2">
            <v-label>{{ errorMessage }}</v-label>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="errorMessage = ''">확인</v-btn>
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
        <tr @click="openAuthDialog( props.item.id, props.item.auth )">
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

    newDialog: false, // 회원가입
    pwDialog: false, // 비밀번호 변경

    authDialog: false, // 권한 변경
    targetId: 0,

    newPwDialog: false, // 회원가입 후 비밀번호 표시
    newPw: '',

    errorMessage: '',

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
      authString: ''
    }
  }),

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  computed: {
    errorDialog() { return this.errorMessage !== ''; }
  },

  methods: {
    initialize () {
      this.$http.get('user/all').then((res) => {
          this.lists = res.data.map((data) => {
            return {
              id: data.UserID,
              lname: data.lname,
              fname: data.fname,
              dep: data.DID,
              auth: data.auth
            };
          })
      });
    },
    close () {
      this.newDialog = false
      this.pwDialog = false
      this.authDialog = false
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
    newSubmit (){
      let randomPw = (10000000 + parseInt(Math.random()*90000000)).toString();
      let auth = ['비활동회원', '활동회원', '운영진', '부회장', '회장']
                  .indexOf(this.newItem.authString) + 1;
      this.$http.post('user/new', {
        id: this.newItem.id,
        pw: randomPw,
        lname: this.newItem.lname,
        fname: this.newItem.fname,
        authority: auth,
        dname: this.newItem.dep
      }).then((res) => {
        this.close();
        this.newPw = randomPw;
        this.openNewPwDialog();
      }).catch((err) => {
        console.log(err);
        if(err.response.status == 401) {
          this.close();
          this.errorMessage = "중복된 학번입니다!";
        }
      });
    },
    openAuthDialog(id, oAuth) {
      this.targetId = id;
      this.newItem.auth = oAuth;
      this.authDialog = true;
    },
    closeAuthDialog() {
      this.targetId=  0;
      this.authDialog = false;
    },
    newAuth() {
      let id = this.targetId;
      let auth = parseInt(this.newItem.auth);
      this.$http.post('user/mod/auth', { id: id, auth: auth }).then((res) => {
        console.log(res);
      });
      this.closeAuthDialog();
    },
    openPwDialog() {
      this.newPw = '';
      this.pwDialog = true;
    },
    closePwDialog() {
      this.newPw = '';
      this.pwDialog = false;
    },
    updatePw() {
      this.$http.post('user/mod/pw', {
        id: this.$store.state.user.id,
        newpw: this.newPw
      }).then((res) => {
        console.log(res);
      });
      this.closePwDialog();
    },
    newDepartmentRule() {
      if(this.newItem.dep === '') return '학부를 입력해주세요';
      else if(!this.departments.includes(this.newItem.dep)) return '학부를 정확히 입력해주세요';
      return true;
    }
  }
}
</script>
