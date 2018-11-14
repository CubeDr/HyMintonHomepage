<template>
    <div id="HyNav">
      <div id="navHolder">
        <HyNavButton class="navButton"
                     :source="btn1Source"
                     title="공지사항"
                     page="notice"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)"/>
        <HyNavButton class="navButton"
                     :source="btn1Source"
                     title="행사"
                     page="event"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)"/>
        <HyNavButton class="navButton"
                     :source="btn1Source"
                     title="회비"
                     page="fee"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)"/>
        <HyNavButton class="navButton"
                     :source="btn1Source"
                     title="셔틀콕"
                     page="shuttle"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)"/>
      </div>
    </div>
</template>

<script>
    import HyNavButton from "./HyNavButton";
    export default {
        name: "HyTab",
        props: ['page', 'selectColor'],
        components: {HyNavButton},
        data() {
          return {
            btn1Source: require("../assets/logo_white.png"),
          }
        },
        methods: {
          noticeClick(what) {
            this.$emit('click', what)
          }
        }
    }
</script>

<style scoped>
#HyNav {
  background: #47b8e0;
  width: 100%;
}

#navHolder {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
}

.navButton {
  margin: 5px 20px 0px 20px;
}
</style>
