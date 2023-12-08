<template>
    <div class="customizedContainer whole">
      <div class="header" style="position: relative;text-align: center; align-items: center">
        <p style="margin-bottom: 0; text-align: center;">Writing Assistant</p>
      </div>
      <div id="list" ref="list" class="list" >
          <ul>
            <li v-for="(item,index) in msglist" :key="index">
              <RightItem v-if="item.me" :id="item.id" :type="item.type" :content="item.content"></RightItem>
              <LeftItem v-else :id="item.id" :type="item.type" :content="item.content"></LeftItem>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <div class="input-send">
            <textarea v-model="userQuestion" class="input" rows='1' placeholder="Describe your nightmare first, I will assist you to add more details." @keyup.enter="userQuestioning">
            </textarea>
            <my-button text="Send" style="width: 80px; height: 30px" @my-click="userQuestioning"></my-button>
          </div>
        </div>
    </div>
</template>

<script>
import {scrollToBottom} from "../js/public";
import LeftItem from "../components/dialogue/LeftItem.vue";
import RightItem from "../components/dialogue/RightItem.vue";
import myButton from "../components/myButton.vue";
import {createCompletion} from "@/js/requestConfig";
export default {
    name: "ConversationalAgent",
    components: { LeftItem, RightItem, myButton},
    data: () => {
        return {
          msglist: [{
              id: 1,
              type: 1,
              content: 'Welcome!',
              me: false
          }],
          userQuestion: '',
          file: null,
          content: []
        }
    },
    methods: {
      async userQuestioning(){
            if(this.userQuestion ==='\n' || this.userQuestion === ''){
                await this.$alert('The input should not be empty.')
            } else {
              let question = this.userQuestion
              this.userQuestion = ''
              await this.send(question);
            }
        },
      async send(question) {
            if(!question){
                console.debug('something wrong with userQuestion in userQuestioning or quickQuestion in quickQuestioning')
            }
            if (question === '图片') {
                this.msglist.push({
                    id: this.msglist[this.msglist.length - 1].id + 1,
                    type: 2,
                    content: 'http://6emm.hxzdhn.com/img/2020/06/28/jausoellbtf.jpg',
                    me: false
                })
            } else {
              this.$emit('updateContent', question)
                await this.getResponse(question)
                setTimeout(()=>{
                    scrollToBottom('list')
                },0)
            }

        },
      async generateQuickQuestions(content){
        const response = await createCompletion({
          model: "text-davinci-003",
          prompt: "Generate 4 possible questions given the content, which is: " + content,
          max_tokens: 1000,
          temperature: 0,
          top_p: 1,
          n: 1,
        });
        return response.data.choices[0].text.trim().split('\n')
      },
      async getResponse(msg) {
            const params = {}
            const contentType = {
                Message:1,
                File:2
            }
            if (this.file) {
                params.type = contentType.File
                params.file = this.file
            } else {
                params.type = contentType.Message
                params.text = msg
            }
          this.msglist.push({
            id: this.msglist[this.msglist.length - 1].id + 1,
            type: 1,
            content: msg,
            me: true
          })
        let quickQuestionList = await this.generateQuickQuestions(msg)
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: 'Some possible details you can add:',
          me: false
        })
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: quickQuestionList[0],
          me: false
        })
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: quickQuestionList[1],
          me: false
        })
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: quickQuestionList[2],
          me: false
        })
        this.msglist.push({
          id: this.msglist[this.msglist.length - 1].id + 1,
          type: 1,
          content: quickQuestionList[3],
          me: false
        })
        },
    }
}
</script>

<style scoped>
.customizedContainer {
  padding: 0;
  width: 50%;
  height: 650px;
  display: flex;
  flex-direction: column;
  border-radius:  15px;
  background-image: var(--bg-secondary-color);
  background-color: #1D1B17;
  justify-content: center;
  flex-wrap: nowrap;
  box-shadow: 0 0 20px var(--primary-color);
}
.header {
  background-image: var(--bg-secondary-color);
  background-color: #1D1B17;
  text-align: center;
  height: 50px;
  line-height: 50px;
  align-content: center;
  box-shadow: 0 0 20px var(--primary-color);
  border-bottom: 1px solid var(--primary-color);
  color: var(--font-primary-color);
  border-radius: 15px 15px 0 0;
  z-index: 1;
  display: flex;
  width: 100% !important;
  justify-content: center;
  flex-direction: column;
}

li {
  list-style: none;
}
.list {
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
}
.list::-webkit-scrollbar{
  display: none;
}
.bottom {
  width: 100%;
  box-shadow: 0 0 10px var(--primary-color);
  border-top: 1px solid var(--primary-color);
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0 0 15px 15px;
  padding: 5px;
  box-sizing: border-box;
}
.examples{
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  overflow-y: hidden;
  overflow-x: scroll;
}
.example{
  border-radius: 20px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 5px;
  color: #122842;
  box-shadow: 1px 2px 5px var(--primary-color);
  background-color: var(--primary-color);
  border: none;
  margin: 0 5px;
  cursor: pointer;
  font-family: var(--font-family);
}
.input-send {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  margin: 15px 0 10px 0;
  height: 40px;
  font-family: var(--font-family);
  flex-shrink: 0;
}
.input {
  resize:none;
  border: 2px solid var(--primary-color);
  flex-grow: 1;
  border-radius: 15px;
  padding: 5px 10px;
  margin: 0 5px 0 0;
  background-color: black;
  color: var(--font-primary-color);
  font-size: 20px;
}
.input:focus {
  outline: none;
}
.sendBtn{
  cursor: pointer;
}
.examples{
  margin-bottom: -6px;
  padding-bottom: 6px;
}
ul{
  padding-left: 0;
}
::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}
::-webkit-scrollbar:hover{
  width: 20px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: rgba(240, 199, 119, 0.2);
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: transparent;
}
::selection {
  background-color: var(--primary-color); /* 设置高亮的背景色为橙色 */
  color: #000; /* 设置高亮的前景色为白色 */
  box-shadow: 0 0 10px var(--primary-color);
}
</style>
