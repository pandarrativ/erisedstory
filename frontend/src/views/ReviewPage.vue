<template>
  <div class="wrapper">
    <div class="header-buttons">
      <my-button text="Back" @click="edit" style="width: 150px; height: 40px; margin-right: 20px"></my-button>
      <my-button text="Home"  @click="this.$router.push('/HomePage')" style="width: 150px; height: 40px"></my-button>
    </div>
    <div class="dream-panel">
      <div class="half-panel" v-show="images.length>0">
        <img :src="left" class="icon-arrow" @click="changeImg(-1)">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100%">
          <img :src="images[currentIndex]" style="width: 500px; height: 500px; margin-top: 20px" class="img">
        </div>
        <img :src="right" class="icon-arrow" @click="changeImg(1)">
      </div>
      <div class="half-panel" style="display: flex; flex-direction: column; justify-content: center" :style="{width:(images.length>0?'45%':'100%')}">
        <p class="primaryText" style="align-self: flex-start; font-style: italic">Title: {{title}}</p>
        <p class="panel primaryText">{{description}}</p>
        <div class="panel">
          <textarea placeholder="Please explain all the changes you have made to your image." v-model="rescripting" class="textarea primaryText" rows="8"></textarea>
        </div>
        <my-button :text="saveBtnText"  @click="updateRescripting" style="width: 150px; height: 40px;align-self: flex-end; margin: 20px"></my-button>
      </div>
    </div>
  </div>
</template>

<script>
import eye from '../assets/eye.jpg'
import left from '../assets/ico-two-left-arrow.svg'
import right from '../assets/ico-two-right-arrow.svg'
import {baseUrl, request} from "../js/requestConfig"
import myButton from "../components/myButton.vue";

export default {
  name: "ReviewPage",
  components: {
    myButton
  },
  data() {
    return {
      // image carousel
      currentImg: eye,
      left:left,
      right:right,
      images: [],
      descriptions:[],
      currentIndex: 0,

      // dream description
      description: '',
      date:'',

      // rescripting content
      rescripting: '',
      saveBtnText: 'Finished',

      // others
      baseUrl: baseUrl,
      title: localStorage.getItem('title')
    }
  },
  methods: {
    changeImg(direction) {
      if (direction === 1 && direction + this.currentIndex < this.images.length || direction === -1 && this.currentIndex + direction >= 0) {
        this.currentIndex = this.currentIndex + direction
      }
    },
    edit(){
      this.$router.push({name:'ModifyPage'})
    },
    updateRescripting(){
      this.saveBtnText = 'Saving...'
      request('post', '/edit_record', {}, {
        'user_id': localStorage.getItem('userId'),
        'date': this.date,
        'description': this.description,
        'rescripting': this.rescripting,
        'images': this.images,
        'tags': JSON.parse(localStorage.getItem('tags')),
        'title': localStorage.getItem('title'),
        'dream_id': localStorage.getItem('dreamId')
      }).then((res)=>{
        console.log(res)
        this.saveBtnText = 'Finished'
        this.$router.push('/HomePage')
      })
    }
  },
  created() {
    this.images = JSON.parse(localStorage.getItem('images'))
    this.description = localStorage.getItem('description')
    this.rescripting = localStorage.getItem('rescripting')
    this.date = localStorage.getItem('date')
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-primary-color);
}
.header-buttons{
  width: 90%;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end
}
.dream-panel{
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.half-panel{
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;
}
.img{
  filter: drop-shadow(0px 0px 10px #F0C777);
  border-radius: 20px;
}
.icon-arrow{
  filter: drop-shadow(0px 0px 8px rgba(232, 233, 236));
  cursor: pointer;
  margin: 8px;
}
.panel{
  background-image: var(--bg-secondary-color);
  background-color: #1D1B17;
  border: 2px solid var(--primary-color);
  width: 80%;
  height: 400px;
  padding: 20px;
  text-align: left;
  border-radius: 15px;
  overflow-y: scroll;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
p{
  text-align: left;
  color: var(--font-primary-color);
  font-family: var(--font-family);
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
.textarea{
  padding: 5px;
  box-sizing: border-box;
  width: 100%;
  background-color: transparent;
  border-radius: 15px;
  border-style: none;
  resize: none;
}
.textarea:focus{
  outline: none;
}
</style>
