<template>
    <div>
      <form>
        <v-text-field id="ipTitle" type="text" placeholder="제목" v-model="title"/>
        <v-textarea id="taContent" title="내용" v-model="content" placeholder="공지 내용" :counter="500"></v-textarea>
        <div id="btns">
          <v-btn @click.prevent="cancel()">취소</v-btn>
          <v-btn @click.prevent="submit()">작성</v-btn>
        </div>
      </form>
    </div>
</template>

<script>
  import {eventBus} from "../main";

  export default {
      name: "NoticeWrite",
      data() {
        return {
          name: "",
          content: ""
        }
      },
      methods: {
        cancel() {
          if(confirm("공지 작성을 취소하시겠습니까?")) {
            eventBus.$emit('cancelNoticeWrite');
          }
        },
        newSubmit() {
          console.log('전송');
          this.$http.post('db/notice/new', {
            id: '2014001001',
            content: this.content,
            name: this.name
          }).then(res => {
            console.log(res);
            eventBus.$emit('wroteNotice');
          });
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
  height: 700px;
  margin-top: 10px;
  resize: none;
  font-size: 20px;
}

#btns {
  text-align: right;
}

</style>
