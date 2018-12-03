<template>
    <div>
      <form>
        <input id="ipTitle" type="text" placeholder="제목"/>
        <textarea id="taContent" title="내용"></textarea>
        <div id="btns">
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

form {
  width: 90%;
  margin: auto;
}

#ipTitle, #taContent {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
}

#ipTitle {
  font-size: 30px;
}

#taContent {
  height: 500px;
  margin-top: 10px;
  resize: none;
  font-size: 20px;
}

#btns {
  text-align: right;
}

</style>
