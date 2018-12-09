<template>
    <div id="HyNav">
      <div id="navHolder">
        <HyNavButton class="navButton"
                     title="공지사항"
                     page="Notice"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-lightbulb fa-lg"></i>
        </HyNavButton>
        <HyNavButton class="navButton"
                     title="행사"
                     page="Event"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-calendar-alt fa-lg"></i>
        </HyNavButton>
        <HyNavButton class="navButton"
                     title="회비"
                     page="Fee"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-won-sign fa-lg"></i>
        </HyNavButton>
        <HyNavButton class="navButton"
                     title="셔틀콕"
                     page="Shuttle"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-shopping-cart fa-lg"></i>
        </HyNavButton>
         <HyNavButton class="navButton"
                     title="회원정보"
                     page="Admin"
                     :current="page"
                     :selectColor="selectColor"
                     @navBtnClick="noticeClick($event)">
          <i class="fas fa-users fa-lg"></i>
        </HyNavButton>
      </div>
    </div>
</template>

<script>
    import HyNavButton from "./HyNavButton";
    import router from '../router'
    export default {
        name: "HyTab",
        props: ['page', 'selectColor'],
        components: {HyNavButton},
        methods: {
          noticeClick(what) {
            this.$emit('click', what);
            router.push({name: what+'Page'});
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
