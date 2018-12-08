<template>
  <div id="feePage">
    <router-view></router-view>
    <v-btn class="w100" @click="$router.push({name: 'FeeUserPage', params: {id: '1'}})">본인 회비 납부 조회</v-btn>
    <v-btn class="w100" @click="$router.push({name: 'FeeMembersPage'})">회원별 회비 납부 현황</v-btn>
    <v-btn class="w100" @click="$router.push({name: 'FeeNPaysPage'})">회비 미납자 조회</v-btn>
  </div>
</template>

<script>
    export default {
        name: "Main"
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
