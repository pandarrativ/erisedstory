<template>
  <div class="wrapper">
    <div style="width: 100%; height: 5%; flex-shrink: 0; display:flex; justify-content: flex-end; margin-bottom: 20px">
<!--      <my-button text="Chat"  @click="this.showAgent=true" style="width: 150px; height: 40px; margin-right: 20px"></my-button>-->
      <my-button text="Home"  @click="this.$router.push('/HomePage')" style="width: 150px; height: 40px;"></my-button>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 2fr; grid-column-gap: 30px;">
      <div class="panel" style="width: 100%; box-sizing: border-box; align-items: flex-start; flex-grow: 0; font-style: italic">
        <p class="primaryText">Guidelines:</p>
        <p class="primaryText">1. Write in present tense. (e.g., “It is dark” or "We are bumping along”)</p>
        <p class="primaryText">2. Write in first person. (e.g., “I am going” or "l see the blood”)</p>
        <p class="primaryText">3. Use sensory details. What are you seeing? Smelling? Testing? Temperature? Lights? Sounds? The more details, the more vivid it will be.</p>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: space-between">
        <div class="panel" style="height: 80px; width: 100%; box-sizing: border-box;">
          <textarea class="primaryText" v-model.trim="title" style="width: 100%;padding: 0 20px; box-sizing: border-box; overflow-y: hidden" rows="1" placeholder="Please input a title for your nightmare." @keydown.enter="handleEnter"> </textarea>
        </div>
        <div class="panel" style="height: 400px; width: 100%; box-sizing: border-box;">
          <textarea class="primaryText" v-model="description" style="width: 100%;padding: 0 20px; box-sizing: border-box" rows="20" placeholder="Please input your nightmare here."> </textarea>
        </div>
      </div>
    </div>
    <my-button :text="analyzeBtn" style="width: 200px;height: 40px;align-self: flex-end;margin-top: 20px" @my-click="analysis"></my-button>
    <div v-show='writingFinished' style="display: grid; grid-template-columns: 1fr 2fr; grid-column-gap: 30px;margin-top: 20px">
      <div class="panel" style="width: 100%; box-sizing: border-box; align-items: flex-start; flex-grow: 0">
        <p class="primaryText">Emotion: {{emotionResult}}</p>
      </div>
      <div class="panel" style="width: 100%; box-sizing: border-box; align-items: flex-start; flex-grow: 0">
        <p class="primaryText">{{analysisResult}}</p>
      </div>

    </div>
    <my-button v-show='writingFinished' :text="visualizeBtn" style="width: 200px;height: 40px;align-self: flex-end;margin-top: 20px" @my-click="finish"></my-button>
  </div>
  <!-- conversational agent -->
  <div style="position: absolute; background-color: black; display: flex; flex-direction:column; justify-content: space-around; align-items: center; width: 100%; height: 100%; z-index:1; top:0" v-show="showAgent">
    <my-button text="Back"  @click="closeChat" style="width: 150px; height: 40px; margin-right: 20px; position: absolute; right: 20px; top: 20px"></my-button>
    <ConversationalAgent @updateContent="handleContentUpdate"></ConversationalAgent>
  </div>
</template>

<script>
import MyButton from "@/components/myButton.vue";
import ConversationalAgent from "@/views/ConversationalAgent.vue";
export default {
  name: "DescriptionPage",
  data: () => {
    return {
      showAgent: false,
      content: [],
      description: '',
      title: '',
      writingFinished: false,
      analysisResult: '',
      emotionResult: '',
      analyzeBtn: '💽 Next step',
      visualizeBtn: '💽 Next step'
    }
  },
  components: {
    MyButton, ConversationalAgent
  },
  methods:{
    finish() {
      localStorage.setItem('description', this.analysisResult)
      localStorage.setItem('emotion', this.emotionResult)
      localStorage.setItem('title', this.title)
      this.$router.push('/ImageGenerationPage')
    },
    handleContentUpdate(content) {
      this.content.push(content.trim())
    },
    closeChat() {
      this.showAgent = false
      if (this.description !== '') {
        this.description += '\n'
      }
      this.description += this.content.join('\n')
      this.content = []
    },
    async analysis(){
      this.analyzeBtn = 'Generating...'
      const fearResponse = await createCompletion({
        model: "text-davinci-003",
        prompt: "What's the defining moment in this nightmare? The dream is: " + this.description + "How to use an image to present this defining moment? Please provide the text prompt for image generation",
        max_tokens: 1000,
        temperature: 0,
        top_p: 1,
        n: 1,
      });
      this.analysisResult = fearResponse.data.choices[0].text.trim()

      // emotion
      const emotionResponse = await createCompletion({
        model: "text-davinci-003",
        prompt: "What's the narrator emotions in the dream? Using 10 words to describe. The dream is: " + this.description,
        max_tokens: 100,
        temperature: 0,
        top_p: 1,
        n: 1,
      });
      this.emotionResult = emotionResponse.data.choices[0].text.trim()

      this.writingFinished = true
      this.analyzeBtn = '💽 Next step'
    },
    handleEnter(event) {
      event.preventDefault();
      var currentTextarea = event.target;
      this.title = this.title.replace(/[\r\n]+/g, "")
      var nextTextarea = this.getNextTextarea(currentTextarea);
      if (nextTextarea) {
        nextTextarea.focus();
      }
    },
     getNextTextarea(currentTextarea) {
      var textareas = document.getElementsByTagName("textarea");
      var currentFound = false;
      for (var i = 0; i < textareas.length; i++) {
        if (textareas[i] === currentTextarea) {
          currentFound = true;
        } else if (currentFound && textareas[i].offsetParent !== null) {
          return textareas[i];
        }
      }
      return null;
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
  background-color: var(--bg-primary-color);
}
.panel{
  background-image: var(--bg-secondary-color);
  background-color: #1D1B17;
  border: 2px solid var(--primary-color);
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  text-align: left;
  border-radius: 15px;
}
.panel > textarea{
  background-color: transparent;
  border-style: none;
}
textarea:focus, input:focus{
  outline: 0;
}
textarea{
  resize: none;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background-color: #F08D7799;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: transparent;
}
</style>
