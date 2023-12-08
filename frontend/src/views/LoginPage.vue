<template>
  <div class="wrapper">
    <div style="width: 40%; height: 100%; display: flex; flex-direction: column;justify-content: flex-start;align-items: center; padding: 100px; ">
        <div class="options" style="display: flex;flex-direction: row; justify-content:center;align-items:baseline;width: 50%; height: 10%">
          <p class="button" :class="{highLight: !isFirst}" @click="switchSign">Sign In</p>
          <p class="slash">/</p>
          <p class="button" :class="{highLight: isFirst}" @click="switchSign">Sign Up</p>
        </div>
        <form @submit.prevent="submit" style="display: flex;flex-direction: column; width: 80%; height: 90%; margin-left: 10%; font-size: var(--font-size); color: var(--font-tertiary-color);text-align: left; position: relative;">
          <div v-show="isFirst" style="width: 100%; display: flex; flex-direction: column">
            <label >How would you like us to call you in the system? Give us a name, like Alice or Bob.</label>
            <input placeholder="" v-model="username" class="input" @keydown.enter="handleEnter">
          </div>
          <input v-show="!isFirst" placeholder="Name" v-model="username" class="input" @keydown.enter="handleEnter">
          <div v-show="isFirst" style="width: 100%; display: flex; flex-direction: column">
            <label >Input your password</label>
            <input v-model="password" type="password" class="input" @keydown.enter="submit">
          </div>
          <input v-show="!isFirst" v-model="password" type="password" class="input" placeholder="Password">
          <my-button text="Get Started" style="width: 100%; height: 50px; margin-top: 30px;" @my-click="submit"></my-button>
        </form>
    </div>
    <div style="width: 60%;">
      <img :src="isFirst?loginBackground:registerBackground" style="width: 100%">
    </div>
  </div>
</template>

<script>
import loginBackground from '../assets/loginBg.png'
import registerBackground from '../assets/registerBg.png'

import {request} from "../js/requestConfig";
import myButton from "../components/myButton.vue";
export default {
  name: "LoginPage",
  components:{
    myButton
  },
  data() {
    return {
      loginBackground: loginBackground,
      registerBackground: registerBackground,
      username: '',
      password: '',
      isFirst: true,
      isShowOptions: false,
    }
  },
  methods:{
    submit(){
      if(this.isFirst){
        request('post','/register',{}, {
          username: this.username,
          password: this.password,
        }).then((response) => {
          if(response.data.user_id == null) {
            this.$toast(response.data.message)
            return
          }
          this.$toast('Sign up successfully!')
          localStorage.setItem('userId', response.data.user_id)
          localStorage.setItem('username', this.username)
          setTimeout(()=>{
            this.$router.push('/HomePage')
          }, 1000)
        }, (error) => {
          console.log(error);
        });
      } else {
        request('post','/login',{}, {
          username: this.username,
          password: this.password,
        }).then((response) => {
          if(response.data.user_id == null) {
            this.$toast(response.data.message)
            return
          }
          this.$toast('Sign in successfully!')
          localStorage.setItem('userId', response.data.user_id)
          localStorage.setItem('username', response.data.username)
          setTimeout(()=>{
            this.$router.push('/HomePage')
          }, 1000)
        }, (error) => {
          console.log(error);
        });
      }
    },
    switchSign(){
      this.isFirst = !this.isFirst
    },
    handleEnter(event) {
      event.preventDefault();
      var currentTextarea = event.target;
      var nextTextarea = this.getNextTextarea(currentTextarea);
      if (nextTextarea) {
        nextTextarea.focus();
      }
    },
    getNextTextarea(currentTextarea) {
      var textareas = document.getElementsByTagName("input");
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
.options{
  --option-font-size: var(--font-size)
}
.slash{
  color: var(--primary-color);
  margin: 0 10px;
  font-size: var(--option-font-size);
}
.button{
  cursor: pointer;
  color: var(--font-tertiary-color);
  text-decoration: underline;
  font-size: var(--option-font-size);
}
.highLight{
  color: var(--font-primary-color);
}
.wrapper{
  width: 100%;
  min-width: 1230px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  justify-content: space-between;
  background-color: var(--bg-primary-color);
  font-family: var(--font-family);
}
.input{
  background-color: #000;
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  height: 60px;
  word-wrap: break-word;
  font-size: var(--font-size);
  font-family: var(--font-family);
  margin-bottom: 20px;
  padding: 10px;
  color: var(--font-primary-color)
}
select{
  outline: none;
  font-size: var(--font-size);
  font-family: var(--font-family);
  border: 2px solid var(--primary-color);
  background-color: transparent;
}
option{
  font-size: var(--font-size);
  font-family: var(--font-family);
  background-color: transparent !important;
  border: none;
}
option:hover{
  background-color: var(--primary-color) !important;
  color: var(--font-primary-color) !important;
}
label{
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
