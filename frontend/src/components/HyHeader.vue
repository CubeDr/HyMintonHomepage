<template>
    <div id="hyHeader">
      <img :src="logo"/>
      <h1>HY-MINTON</h1>
    </div>
</template>

<script>
    import logoWhite from '../assets/logo_white.png'
    export default {
      data: function () {
        return {
          logo: logoWhite
        }
      }
    }
</script>

<style scoped>
#hyHeader {
  width: 100%;
  background: #34314c;
  display: inline-flex;
}

img {
  width: 140px;
  height: 90px;
  margin: 10px 5px 10px 5px;
}
  
h1 {
  color: #FFF;
  font-size: 40px;
}
</style>
