<template>
  <div class="wrapper">
    <div style="width: 100%; height: 5%; flex-shrink: 0; display:flex; justify-content: flex-end; margin-bottom: 20px">
      <my-button text="Log Out"  @click="logout" style="width: 150px; height: 40px;"></my-button>
    </div>
    <div style="display: flex; width: 100%; justify-content: center;overflow-x: hidden">
      <div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; padding: 10px">
        <img :src="headerImage" class="header">
        <div style="display: flex; width: 100%; height: 400px; align-items: flex-start; padding: 20px;">
          <div class="session"  @click="start" style="flex:30%; display:flex; flex-direction: column; align-items:flex-start;border-radius: var(--radius);height: 100%; width: 300px; padding: 5px 20px; box-sizing: border-box; background-color: #1D1B17; border-top: 2px solid var(--primary-color); justify-content: space-around">
            <p class="primaryText">Enter Your Nightmare.</p>
            <div style="display: flex; justify-content: center;overflow-y: scroll">
              <p class="circleIcon"></p>
              <p class="tertiaryText" style="text-align: left; padding: 0 10px; margin: 0;font-size: 20px; overflow-y: hidden">Describing your nightmare with a new session.</p>
            </div>
            <my-button text="New Nightmare" style="width:80%; height: 40px; align-self: center"></my-button>
          </div>
          <div style="flex:70%;display: flex; flex-direction: column; align-items: center; justify-content: space-between; overflow-x: hidden; width: 100%; height: 100%">
            <div class="blue-border" style="height: 40px; display: flex; align-items: center; width: 620px;box-sizing: border-box">
              <ui-icon size='36'>search</ui-icon>
              <input v-model='query' type="text" placeholder="Type in keyword(s) for search previous nightmares." class="searchBar" @input="updateShowedSession">
            </div>
            <div class="sessions" style="height: 350px; width: 650px;overflow-x: scroll; align-items: flex-end">
              <div v-for="(session, index) in sessions" v-show="session.isShow==='True'||session.isShow===true" :key="index" class="session" :style="[{'backgroundImage':'url('+ session.url+')'}]"  @click="review(session.id)">
                <div class="blank"></div>
                <div style="display:flex; flex-direction: column; align-items:flex-start;border-radius: var(--radius);height: 50%; width: 100%; padding: 5px 20px; box-sizing: border-box; background-color: #1D1B17; border-top: 2px solid var(--primary-color)">
                  <p class="primaryText" style="text-align: left; font-size: 20px;margin: 5px;">{{session.title.substr(0,25)}}{{session.title.length>25?'...':''}}</p>
                  <div style="display: flex; justify-content: center;overflow-y: scroll">
                    <p class="circleIcon"></p>
                    <p class="tertiaryText" style="text-align: left; padding: 0 10px; margin: 0;font-size: 20px; overflow-y: hidden">{{session.tags.slice(0,10).join(' ')}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerImage from "../assets/header.png"
import {request, baseUrl} from "../js/requestConfig"
import MyButton from "@/components/myButton";
export default {
  name: "HomePage",
  components: {MyButton},
  data() {
    return {
      headerImage: headerImage,
      baseUrl: baseUrl,
      sessions: [],
      theme: false,
      query: ''
    }
  },
  methods:{
    start(){
      this.$router.push({name:'DescriptionPage'})
    },
    review(id){
      request('get', '/get_record/' + id, {}, {})
        .then((res)=>{
          localStorage.setItem('date', res.data.record.date)
          localStorage.setItem('description', res.data.record.description)
          localStorage.setItem('rescripting', res.data.record.rescripting === null? '': res.data.record.rescripting)
          localStorage.setItem('images', JSON.stringify(res.data.record.images))
          localStorage.setItem('tags', JSON.stringify(res.data.record.tags))
          localStorage.setItem('title', res.data.record.title)
          localStorage.setItem('dreamId', id)
          this.$router.push({name:'ReviewPage'})
        })
    },
    changeTheme(){
      // this.theme true = lighter, false = darker
      document.documentElement.style.setProperty('--bg-primary-color', this.theme ? 'rgba(240, 199, 119)': '#1C1C1E');
      document.documentElement.style.setProperty('--font-primary-color', this.theme ? '#1C1C1E': 'rgba(240, 199, 119)');
      document.documentElement.style.setProperty('--search-bar-color', this.theme ? '#1C1C1E': 'rgba(240, 199, 119)');


    },
    updateShowedSession(){
      for(let i = 0; i < this.sessions.length; i++) {
        this.sessions[i].isShow = false
        for(let j = 0; j < this.sessions[i].tags.length; j++) {
          if(this.sessions[i].tags[j].toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
            this.sessions[i].isShow = true
            break
        }
        if(this.sessions[i].title.toLowerCase().indexOf(this.query.toLowerCase()) !== -1)
          this.sessions[i].isShow = true
      }
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created() {
    // reset localstorage
    localStorage.setItem('date', '')
    localStorage.setItem('description', '')
    localStorage.setItem('rescripting', '')
    localStorage.setItem('images', '')
    localStorage.setItem('dreamId', '')

    const user_id = localStorage.getItem('userId')

    request('get', '/get_records/' + user_id, {}, {})
        .then((res)=>{
          this.sessions = res.data.records
        })
  }
}
</script>

<style scoped>
.wrapper{
  --radius: 16px;
  width: 100%;
  padding: 20px 50px 50px 50px;
  box-sizing: border-box;
  background-color: var(--bg-primary-color);
}
.sessions{
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
}
.session{
  width: 300px;
  height: 300px;
  position: relative;
  border-radius: var(--radius);
  box-shadow: 0 0 10px black;
  cursor: pointer;
  background-size: 100%;
  margin-left: 20px;
  flex-shrink: 0;
}
.session:hover{
  box-shadow: 0 0 20px var(--primary-color);
}
.session::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--radius);
  box-shadow: 30px 0 30px inset rgba(241, 143, 121, 0.18);
}
.header{
  width: 100%;
  border-radius: 30px;
}
.blank{
  width: 100%;
  height: 50%;
  overflow: hidden;
}
.circleIcon{
  width: 14px;
  height: 14px;
  line-height:20px;
  margin: 4px 0 4px 4px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  box-shadow: 0 0 5px var(--primary-color),inset 0 0 5px var(--primary-color)
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
.blue-border{
  border: 2px solid var(--search-bar-color);
  border-radius: 15px;
  padding: 0px 10px 0 10px;
  width: 500px;
}
.blue-border:hover {
  cursor: pointer;
  background-color: rgba(62, 99, 199, 0.02);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.18);
}
.searchBar{
  height: 60px;
  border: none;
  line-height: 60px;
  padding: 0;
  width: 100%;
  font-size: 20px;
  background-color: transparent !important;
  color: var(--font-primary-color);
}
.searchBar:focus{
  outline: none;
}
</style>
