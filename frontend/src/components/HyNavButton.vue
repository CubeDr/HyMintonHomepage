<template>
    <div id="button" @click="navBtnClick" :style="{background: getColor()}">
      <div id="slot">
        <slot></slot>
      </div>
      <p>{{ title }}</p>
    </div>
</template>

<script>
    export default {
        name: "HyNavButton",
        props: ['title', 'page', 'current', 'selectColor'],
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
  height: 50px;
  padding: 0 10px 0 10px;
}

p {
  margin: auto;
  text-align: center;
  font-size: 20px;
}

#slot {
  width: 30px;
  text-align: center;
  justify-content: center;
  align-content: center;
}

svg {
  width: 100%;
  height: 100%;
}
</style>
