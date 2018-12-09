<template>
  <div id="feePage">
    <router-view></router-view>
    <v-btn class="w100" @click="$router.push({name: 'FeeUserPage', params: {id: userId}})">본인 회비 납부 조회</v-btn>
    <v-btn v-if="userAuth>=4" class="w100" @click="$router.push({name: 'FeeMembersPage'})">회원별 회비 납부 현황</v-btn>
    <v-btn v-if="userAuth>=4" class="w100" @click="$router.push({name: 'FeeNPaysPage'})">회비 미납자 조회</v-btn>
    <div v-if="userAuth>=4" class="w100">
      <b>회비 추가</b>
      <v-select :items="[2018, 2019, 2020, 2011]" label="연도" v-model="y"></v-select>
      <v-select :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" label="월" v-model="m"></v-select>
      <label>금액</label>
      <v-text-field v-model="price" type="number"></v-text-field>
      <v-btn @click="addFee()">추가</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Main",
    data() {
      return {
        y: "2018",
        m: '12',
        price: 10000
      }
    },
    computed: {
        userAuth() {
          return this.$store.state.user.authLevel;
        },
      userId() {
        return this.$store.state.user.id;
      }
    },
    methods: {
      addFee() {
        this.$http.post('fee/new', {
          date: this.y.toString() + this.m.toString().paddingLeft('00'),
          price: parseInt(this.price)
        }).then((res) => {
          console.log(res);
        });
      }
    }
  }
</script>

<style scoped>
  #feePage {
    width: 90%;
  }
  .w100 {
    width: 100%;
    margin-bottom: 20px;
  }
</style>
