<template>
    <div>
      <v-form ref="form" v-model="valid">
        <v-text-field
          id="ipTitle"
          type="text"
          placeholder="제목"
          :rules="[(t)=> t.length>0 || '제목을 작성해야 합니다.'
                  ,(t)=> t.length<=30 || '제목은 30자 이하이어야 합니다']"
          :counter="30"
          v-model="title"></v-text-field>
        <v-textarea
          id="taContent"
          title="내용"
          v-model="content"
          placeholder="공지 내용"
          :rules="[(t)=> t.length>0 || '내용을 작성해야 합니다.'
                  ,(t)=> t.length<=50 || '내용은 50자 이하이어야 합니다']"
          :counter="50"></v-textarea>
        <div id="btns">
          <v-btn @click.prevent="cancel()">취소</v-btn>
          <v-btn :disabled="!valid" @click.prevent="submit()">작성</v-btn>
        </div>
      </v-form>
    </div>
</template>

<script>
  import {eventBus} from "../main";

  export default {
      name: "NoticeWrite",
      data() {
        return {
          title: "",
          content: "",
          valid: false
        }
      },
      methods: {
        cancel() {
          if(confirm("공지 작성을 취소하시겠습니까?")) {
            eventBus.$emit('cancelNoticeWrite');
          }
        },
        submit() {
          console.log('전송');
          this.$http.post('notice/new', {
            id: this.$store.state.user.id,
            content: this.content,
            title: this.title
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
