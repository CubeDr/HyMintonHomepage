<template>
    <div>
      <v-form id='login' ref="form" v-model="valid">
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
    </div>
</template>

<script>
    import router from '../router';

    export default {
        name: "LoginPage",
        data() {
          return {
            valid: false,
            id: '',
            pw: '',
            idRules: [(id) => id.length > 8 || '8자 이상 입력해야 합니다.'],
            pwRules: [(pw) => pw.length > 8 || '8자 이상 입력해야 합니다.']
          }
        },
        methods: {
          submit() {
            console.log('login request');
            router.push({name: 'NoticePage'});
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
