<template>

    <v-layout
      align-center
      column
      justify-center
    > 
        <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          로그인 오류
        </v-card-title>

        <v-card-text>
         학번 혹은 비밀번호가 잘못되었습니다.
          </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      <v-form id='login' ref="form" v-model="valid" >
        <v-text-field
        
          v-model="id"
          :rules="idRules"
          label="학번"
          type="text"
          required
        ></v-text-field>
        <v-text-field
          v-model="pw"
          :rules="pwRules"
          label="비밀번호"
          type="password"
          required
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
        <v-btn id="cancelButton" @click="back">취소</v-btn>
      </v-form>
       </v-layout>
  
</template>
    


<script>
  import router from '../router';

  export default {
        name: "LoginPage",
        data() {
          return {
            dialog: false,
            valid: false,
            id: '',
            pw: '',
            idRules: [(id) => id.length > 8 || '8자 이상 입력해야 합니다.'],
            pwRules: [(pw) => pw.length > 8 || '8자 이상 입력해야 합니다.']
          }
        },
        methods: {
          submit() {
            this.failLogin()
            this.$http.post('user/login', {
                id: this.id,
                pw: this.pw
            }).then((res) => {
              console.log(res);
              if(res.status != 400) {
                this.$store.commit('login', {
                  id: res.data[0].id,
                  fname: res.data[0].fname,
                  lname: res.data[0].lname,
                  auth: res.data[0].authority
                });
                router.push({name: 'NoticePage'});
              }
            });
          },
          failLogin() {
            this.dialog = true;
            
          },
          clear() {
            this.id = '';
            this.pw = '';
          },
          back() {
            router.push({name: 'IndexPage'});
          }
        }
    }
</script>

<style scoped>
#login {
  width: 50%;
  margin: 50px auto;
  padding: 10px 30px 10px 30px;
  box-shadow: 10px 10px 20px 10px lightgray;
  box-sizing: border-box;
  border-radius: 10px;
}
#cancelButton {
  float: right;
}
</style>
