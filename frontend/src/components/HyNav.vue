<template>
    <div id="HyNav">
      <div id="navHolder">
        <HyNavButton class="navButton"
                     title="공지사항"
                     page="notice"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-lightbulb fa-lg"></i>
        </HyNavButton>
        <HyNavButton class="navButton"
                     title="행사"
                     page="event"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-calendar-alt fa-lg"></i>
        </HyNavButton>
        <HyNavButton class="navButton"
                     title="회비"
                     page="fee"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-won-sign fa-lg"></i>
        </HyNavButton>
        <HyNavButton class="navButton"
                     title="셔틀콕"
                     page="shuttle"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-shopping-cart fa-lg"></i>
        </HyNavButton>
      </div>
    </div>
</template>

<script>
    import HyNavButton from "./HyNavButton";
    export default {
        name: "HyTab",
        props: ['page', 'selectColor'],
        components: {HyNavButton},
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
  margin: 5px 0 0 20px;
}
</style>
