<template>
  <div class="wrapper">
    <div class="header-buttons">
      <my-button text="Home"  @click="this.$router.push('/HomePage')" style="width: 150px; height: 40px"></my-button>
    </div>
    <div class="dream-panel">
      <div class="half-panel">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 100%">
          <canvas id="image" width="512" height="512" class="img" style="margin: 20px"></canvas>
        </div>
      </div>

      <div class="half-panel">
        <div style="display: flex; flex-direction: row; align-items: flex-end; justify-content: flex-start; height: 100%">
          <div style="display: flex; flex-direction: column; align-items: center">
            <img :src="originalImage" style="margin-top: 20px; margin-left: 20px; width: 100px; height: 100px" class="img">
            <p class="primaryText" style="font-style:italic;">Original</p>
          </div>
          <p class="primaryText" style="font-style:italic;padding: 15px;text-align: left;font-size: 20px; padding-left: 50px; line-height: 30px">
            Step 1: Erase part of the picture on the right. <br>
            Step 2: Specify what you want that component to be in the text box. <br>
            Step 3: Click on Make an Edit to modify the image. <br>
            Step 4: Repeat the preceding steps. When you are satisfied with your image, click on Save to finalize your edits. <br>
          </p>
        </div>
        <div class="panel">
          <textarea placeholder="Describe how you would like to change this image..." v-model="prompt" class="textarea primaryText" rows="6"></textarea>
          <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; grid-column-gap: 5px; align-self: flex-end">
            <my-button :text="reloadBtnText"  @click="reload" style="width: 150px; height: 40px;align-self: flex-end"></my-button>
            <my-button :text="editBtnText"  @click="modify" style="width: 150px; height: 40px;align-self: flex-end"></my-button>
            <my-button :text="saveBtnText"  @click="update" style="width: 150px; height: 40px;align-self: flex-end"></my-button>
          </div>
        </div>
      </div>
    </div>
    <!-- log notifications: saving -->
    <div v-show="this.log !== ''" class="log">
      <p style="padding:  0 20px 0 20px; border-radius: 5px; border: 2px solid var(--primary-color); font-size: 25px">{{log}}</p>
    </div>
  </div>
</template>

<script>
import eye from '../assets/eye.jpg'
import left from '../assets/ico-two-left-arrow.svg'
import right from '../assets/ico-two-right-arrow.svg'
import {baseUrl, request, postToOpenAI} from "../js/requestConfig"
import myButton from "../components/myButton.vue";

export default {
  name: "ModifyPage",
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
      currentIndex: 0,

      // description
      description: '',
      date:'',

      // rescripting content
      rescripting: '',
      saveBtnText: 'Next step',

      // others
      baseUrl: baseUrl,
      log:'',

      // modify content
      isDrawing: false,
      prompt: '',
      originalImage: '',

      editBtnText: 'Make an edit',
      reloadBtnText: 'Reload',
    }
  },
  methods: {
    update(){
      window.localStorage.setItem('images', JSON.stringify(this.images));
      this.$router.push('/ReviewPage')
    },
    modify(){
      if(this.prompt==='') {
        this.$toast('You should add some description in the box first to make an edit.')
        return
      }
      this.editBtnText = 'Editing...'
      const canvas = document.getElementById('image');
      canvas.toBlob((blob)=>{
        const maskImage = blob;
        // generate inpainting image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.images[0];
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
          canvas.toBlob((originalImage) => {
            const formData = new FormData();
            formData.append('image', originalImage);
            formData.append('mask', maskImage);
            formData.append('prompt', this.prompt);
            formData.append('n', 1);
            formData.append('size', '512x512');
            postToOpenAI('/v1/images/edits', {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              data: formData
            }).then((res)=>{
              this.selectedIndex = 0 // TODO: change to current index
              // add Image
              request('post', '/add_image',{},
                  {
                    'url': res.data.data[0].url,
                    'description': this.description,
                    'user_id':  localStorage.getItem('userId')
                  }).then((res)=>{
                const canvas = document.getElementById('image');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                this.images.push(baseUrl + res.data.image)
                img.crossOrigin = 'anonymous';
                img.src = baseUrl + res.data.image;
                img.onload = () => {
                  ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
                  this.editBtnText = 'Make an edit'
                }
              })
            })
          })
        }
      })
    },
    reload(){
      this.reloadBtnText = 'Reloading...'
      const canvas = document.getElementById('image');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = this.images[0];
      img.onload = function() {
        ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
        this.reloadBtnText = 'Reload'
      }
    },
  },
  created() {
    this.images = JSON.parse(localStorage.getItem('images'))
    this.description = localStorage.getItem('description')
    this.rescripting = localStorage.getItem('rescripting')
    this.date = localStorage.getItem('date')
    this.originalImage = this.images[0]
  },
  mounted() {
    const canvas = document.getElementById('image');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.images[0];


    img.onload = function() {
      ctx.drawImage(img, 0, 0,canvas.width, canvas.height);
    }


    canvas.addEventListener('mousedown', () => {
      this.isDrawing = true;
    });

    canvas.addEventListener('mousemove', (event) => {
      if (this.isDrawing) {
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.clearRect(x - 25, y - 25, 50, 50);
      }
    });

    canvas.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.half-panel{
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  width: 100%;
  height: 300px;
  padding: 20px;
  margin-top:30px;
  text-align: left;
  border-radius: 20px;
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
  border-radius: 20px;
  border-style: none;
  resize: none;
}
.textarea:focus{
  outline: none;
}
.log{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position:absolute;
  top:0;
  left: 0;
  background-color: #00000070;
}
</style>
