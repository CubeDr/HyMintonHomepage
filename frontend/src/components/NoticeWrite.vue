<template>
    <div id="noticeWrite">
      <form>
        <label id="lbTitle">제목</label>
        <input id="ipTitle" type="text" title="제목"/>
        <textarea id="taContent" title="내용"></textarea>
        <div>
          <button @click.prevent="cancel()">취소</button>
          <button @click.prevent="submit()">작성</button>
        </div>
      </form>
    </div>
</template>

<script>
    export default {
      name: "NoticeWrite",
      methods: {
        cancel() {

        },
        submit() {

        }
      }
    }
</script>

<style scoped>
#lbTitle {
  width: 5%;
  font-weight: bold;
}

#ipTitle {
  margin: 0;
}

#noticeWrite {
  width: 50%;
  margin: auto;
}
</style>
