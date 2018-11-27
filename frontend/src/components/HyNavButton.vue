<template>
    <div id="button" @click="navBtnClick" :style="{background: getColor()}">
      <img :src="source">
      <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        name: "HyNavButton",
        props: ['source', 'title', 'page', 'current', 'selectColor'],
        methods: {
          navBtnClick() {
            this.$emit('navBtnClick', this.page)
          },
          getColor() {
            if(this.page == this.current) return this.selectColor;
            return '#0000';
          }
        }
    }
</script>

<style scoped>
#button {
  display: inline-flex;
  padding: 5px;
}

#button:active {
  background: rgba(255, 255, 255, 0.3);
}

img {
  width: 60px;
  height: 40px;
}

p {
  margin: auto;
  text-align: center;
  font-size: 20px;
}
</style>
