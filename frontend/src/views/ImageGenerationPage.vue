<template>
  <div class="wrapper">
    <!-- Home button -->
    <div style="width: 100%; height: 5%; flex-shrink: 0; display:flex; justify-content: flex-end">
  <!--    <my-button text="Help"  @click="this.showAgent=true" style="width: 150px; height: 40px; margin-right: 20px"></my-button>-->
      <my-button text="Home"  @click="this.$router.push('/HomePage')" style="width: 150px; height: 40px;"></my-button>
    </div>
    <!-- Image generation panel -->
    <div style="width: 100%; height: 90%;  display:flex; flex-shrink: 0; justify-content: space-between;flex-direction: column;margin-top: 80px">
      <div class="dream-section" v-for="(sentence,index) in sentences" :key="index">
        <!-- heading section -->
        <div class="heading-section">
          <textarea class="primaryText headingText" rows="4" disabled>A text prompt is created inspired by your narrative. Click the "Generate from Text" option to receive an image. You also have the option to provide additional details about pivotal moments in your tale.</textarea>
        </div>


        <!-- original section -->
        <div class="original-section" style="display: flex; flex-direction: column; height: auto; overflow-y: scroll; justify-content: space-between;">
          <textarea class="primaryText" v-model="description_note" rows="8"></textarea>
        </div>

        <!-- panel section-->
        <div class="panel" style="display: flex; flex-direction: column; height: 360px; overflow-y: scroll; justify-content: space-between; ">
          <textarea class="primaryText" v-model="message_note" rows="8"></textarea>
          <div style="display: flex;align-self: flex-end">
            <my-button :text="uploadBtnText" notice='Upload your own image for further editing.' style="width: 240px; height: 40px; margin-right: 10px" @my-click="uploadPicture(index)"></my-button>
            <my-button :text="polishBtnText" notice="Visualize your dream based on keyword(s)." style="width: 240px; height: 40px;margin-right: 10px" @my-click="polish(index)"></my-button>
          </div>
        </div>
        
        <!-- image section -->
        <div class="image-section" style="width: 400px; flex-shrink: 0; height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; margin-left:20px">
          <img v-if="this.images.length>index&&this.images[index]" :src="this.images[index]" class="img img-choices" style="width: 400px; height: 400px" alt="generated visualization">
          <img v-else :src="eye" class="img img-choices" style="width: 400px; height: 400px" alt="default picture">
          <div style="display: flex; justify-content: space-evenly; width: 400px; margin-bottom: 30px">
            <my-button text="Edit" style="width: 150px;height: 40px;margin-top:20px" @my-click="editImg"></my-button>
            <my-button text="Delete" style="width: 150px;height: 40px;margin-top:20px" @my-click="deleteImg"></my-button>
          </div>
        </div> 
        

      </div>
      <!-- generated images -->
      <div style="height: 200px; display: flex; align-items: center; justify-content: flex-end">
        <my-button text="💽 Next step" style="width: 200px;height: 40px;margin: 20px 0" @my-click="editDreamRecording"></my-button>
      </div>
    </div>
    <div style="display: none">
      <input ref="fileInput" type="file" @change="handleFileChange">
    </div>
  </div>
  
    <!-- image polish pop up panel -->
  <div v-if="showAdvance" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; top: 0;background-color: rgba(227,205,205,0.31); z-index:2;">
    <div class="promptPanel"  style="height: 500px;background-color: rgb(44,29,29);">
      <div class="prompts" style="height: 80%;font-size: 25px">
        <div style="display: flex; justify-content: space-between">
          <div style="border: #F0C777 2px solid; padding: 5px">
            <!-- <p>Customize your pictures!</p> -->
            <!-- <p><b>{{sentences[this.selectedIndex]}}</b></p> -->
            <p>Based on your description, we found the following possible visual elements/locations/characters/emotions, please click on the elements you would like to see in the generated pictures.</p>
          </div>
          <p style="margin-right: 5px; cursor: pointer; " @click="this.showAdvance=false">x</p>
        </div>

        <div style="width: 100%; display: flex; flex-direction: column; align-items: flex-start">
          <p style="margin-bottom: 0">Location:</p>
          <div style="display: flex; flex-wrap: wrap; width: 100%; align-items: center">
            <p v-for="(object, index) in this.objects[this.selectedIndex]['locations']" :key="index" class="primaryText" style="border-radius: 5px; padding: 5px; display: inline-block; margin: 15px 5px 15px 5px; cursor: pointer" :style="[{'backgroundColor':(object.selected?'var(--primary-color)':'#F0C77756')}, {'color':(object.selected?'white':'var(--primary-color)')}]" @click="object.selected=!object.selected">{{object.element}}</p>
            <div style="border-radius: 5px; padding: 5px; display: flex;flex-direction: row;  margin: 15px 5px; cursor: pointer; background-color: var(--primary-color); height: 30px; align-items: center">
              <input v-model="customizedKeywords['locations']" placeholder="Click to add more" class="input" style="height: 30px; margin: 25px 0 25px 0; font-size: 25px" @keydown.enter="addCustomizedKeyword('locations')">
              <p style="display: inline" @click="addCustomizedKeyword('locations')" >+</p>
            </div>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: column; align-items: flex-start">
          <p style="margin-bottom: 0">Character:</p>
          <div style="display: flex; flex-wrap: wrap; width: 100%; align-items: center">
            <p v-for="(object, index) in this.objects[this.selectedIndex]['characters']" :key="index" class="primaryText" style="border-radius: 5px; padding: 5px; display: inline-block; margin: 15px 5px 15px 5px; cursor: pointer" :style="[{'backgroundColor':(object.selected?'var(--primary-color)':'#F0C77756')}, {'color':(object.selected?'white':'var(--primary-color)')}]" @click="object.selected=!object.selected">{{object.element}}</p>
            <div style="border-radius: 5px; padding: 5px; display: flex;flex-direction: row;  margin: 15px 5px; cursor: pointer; background-color: var(--primary-color); height: 30px; align-items: center">
              <input v-model="customizedKeywords['characters']" placeholder="Click to add more" class="input" style="height: 30px; margin: 25px 0 25px 0; font-size: 25px" @keydown.enter="addCustomizedKeyword('characters')">
              <p style="display: inline" @click="addCustomizedKeyword('characters')" >+</p>
            </div>
          </div>
        </div>
        <div style="width: 100%; display: flex; flex-direction: column; align-items: flex-start">
          <p style="margin-bottom: 0">Emotion:</p>
          <div style="display: flex; flex-wrap: wrap; width: 100%; align-items: center">
            <p v-for="(object, index) in this.objects[this.selectedIndex]['emotions']" :key="index" class="primaryText" style="border-radius: 5px; padding: 5px; display: inline-block; margin: 15px 5px 15px 5px; cursor: pointer" :style="[{'backgroundColor':(object.selected?'var(--primary-color)':'#F0C77756')}, {'color':(object.selected?'white':'var(--primary-color)')}]" @click="object.selected=!object.selected">{{object.element}}</p>
            <div style="border-radius: 5px; padding: 5px; display: flex;flex-direction: row;  margin: 15px 5px; cursor: pointer; background-color: var(--primary-color); height: 30px; align-items: center">
              <input v-model="customizedKeywords['emotions']" placeholder="Click to add more" class="input" style="height: 30px; margin: 25px 0 25px 0; font-size: 25px" @keydown.enter="addCustomizedKeyword('emotions')">
              <p style="display: inline" @click="addCustomizedKeyword('emotions')" >+</p>
            </div>
          </div>
        </div>

        <!-- <div style="width: 100%; display: flex; flex-direction: column; align-items: flex-start">
          <p>Select a style you would like to see in the generated pictures.</p>
          <div style="position:relative;display: flex; flex-direction: row; align-items: center; width: 90%" class="outer"  @click="isShowStyleOptions=true">
            <p class="secondaryText" style="width: 95%; flex-shrink: 0; font-size: 25px; margin-left: 5%">{{style}}</p>
            <div v-show='isShowStyleOptions' style="width: 100%; border: 2px solid var(--font-tertiary-color); border-radius: 15px; padding: 15px; box-sizing: border-box;position:absolute; bottom:60px;background-color: var(--bg-primary-color); z-index: 1; max-height: 200px; min-height: 60px; overflow-y: scroll">
              <p style="font-weight: bolder; font-size: 25px">Following are some possible styles you may want to try:</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr 1fr; grid-column-gap: 10px; grid-row-gap: 10px">
                <div v-for="(option,style) in styleOptions" :key="style" class="primaryText" @click.stop="chooseStyle(style)">
                  <div style="width: 100px; height: 100px; background-size: 100%" alt="style image" :style="{backgroundImage: 'url(' + styleOptions[style].img+ ')'}"></div>
                  <p style="font-size: 25px">{{style}}</p>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <my-button text="Finish"  style="width: 150px; height: 40px; margin-right: 20px;align-self: center" @click="finishPolish()"></my-button>
    </div>
  </div>
  
    <!-- image upload modification panel -->
    <div v-if="loadImagePanel" v-show="showImagePanel" style="position: absolute; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; top: 0;background-color: rgba(227,205,205,0.31);z-index:2">
      <div class="panel-wrapper" style="display: grid; grid-template-columns: 1fr 1fr; grid-column-gap: 30px; background-color: #fff5ee95; padding: 20px; border: 2px solid var(--search-bar-color); border-radius: 15px;">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; height: 512px; width: 512px; background-color: black; border-radius: 15px">
          <canvas id="image" width="512" height="512" style="filter: drop-shadow(0px 0px 10px #F0C777); border-radius: 15px;"></canvas>
        </div>
        <div class="upload-modify-panel">
          <textarea placeholder="Erase part of the picture and specify what you want that component to be in the text box." v-model="modifyPrompt" class="textarea primaryText" rows="4"></textarea>
          <div style="display:flex; flex-direction: row; align-self: flex-end; width: 100%; justify-content: space-between">
            <my-button :text= "reloadBtnText" @click="reload" style="width: 150px; height: 40px;align-self: flex-end"></my-button>
            <my-button :text= "editBtnText" @click="modify" style="width: 150px; height: 40px;align-self: flex-end"></my-button>
            <my-button :text="saveBtnText"  @click="update" style="width: 150px; height: 40px;align-self: flex-end"></my-button>
          </div>
        </div>
      </div>
    </div>
    <!-- log notifications: generating  -->
    <div v-show="this.log !== ''" style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; position:absolute; top:0; left: 0; background-color: #00000070; ">
      <p style="padding:  0 20px 0 20px; border-radius: 5px; border: 2px solid var(--primary-color); font-size: 25px">{{log}}</p>
    </div>
  </template>
  
  <script>
  import MyButton from "../components/myButton.vue";
  import eye from '../assets/eye.jpg'
  // import {request, baseUrl, postToOpenAI} from "../js/requestConfig";
  import {request, baseUrl, createCompletion, postToOpenAI} from "../js/requestConfig";
  
  export default {
    name: 'ImageGenerationPage',
    components: {
      MyButton
    },
    data: ()=> {
      return {
        eye: eye,
        baseUrl,
        showAgent: false,
  
        // user basic info
        username: '',
        userId: '',
  
        // dream description
        selectedIndex: 0,
        sentences: [],
        images:[],
        description: '',
        description_note: '',
        message:'',
        message_note:'',
  
        // image upload
        file:null,
  
        // image polish
        showAdvance: false,
        customizedKeywords: {
          'visualElements': '',
          'locations': '',
          'characters': '',
          'emotions': ''
        },
        objects: {},
        style: 'Anime',
        isShowStyleOptions: false,
        // styleOptions:{
        //   'Anime':'',
        //   'Ukiyo-e':'',
        //   'Pixar': '',
        //   'Vintage': '',
        //   'Photorealism': ''
        // },
        styleOptions:{

          'Anime':{
            'img': '/anime.jpg',
            'description':'animation pixar style, pendleton ward, magali villeneuve, artgerm, rob rey and kentaro miura style, golden ratio, behance, trending on art station'
          },
          'Ukiyo-e':{
            'img': '/Ukiyo-e.jpg',
            "description":'Ukiyo-e'
          },
          'Pixar': {
            'img': '/pixar.jpg',
            'description': 'by pixar in the rainforest, blur, surrealism, fantasy, dreamlike, unreal engine, cozy indoor lighting, hyperrealistic, octane render'
          },
          'Vintage': {
            'img': '/vintage.jpg',
            'description': "in the style of 90's vintage anime, surrealism, akira style. detailed line art. fine details."
          },          
          'Photorealism': {
            'img': '/photorealism.png',
            'description': 'Photorealism, 8k, photography'
          },
        },
        originalImage: '',
        modifyPrompt: '',
        showImagePanel: false,
        loadImagePanel: false,
        saveBtnText: 'Next',
        editBtnText: 'Make an edit',
  
        uploadBtnText: 'Generate with Referring Image',
        generateBtnText: 'Generate Picture',
        polishBtnText: 'Generate based on Text',
        reloadBtnText: 'Reload Picture',
        log: '',
        generatedImg: ''
  
      }
    },
    methods:{
      merge(index){
        if(index>0){
          this.sentences[index-1] = this.sentences[index-1] + this.sentences[index]
          this.sentences.splice(index,1)
        }
      },
      async generateVisualElements(inputContent){
        // const openaiKey = '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'
        // const { Configuration, OpenAIApi } = require("openai");
        // const configuration = new Configuration({
        //   apiKey: openaiKey,
        // });
        // const openai = new OpenAIApi(configuration);
        let res = []
        this.objects[this.selectedIndex] = {}
  
        // generate visual elements based on third-person view
        let response = await createCompletion({
          model: "text-davinci-003",
          prompt: "Given a description, list 10 elements in painting associated with it.\n" +
          "Description: Alice walked with her dog after dinner along the seaside.\n" +
          "Answer: road, seaside, girl, stars, evening, sky, house, beach, coconut tree, relaxation\n" +
          "Description:" + inputContent + "\n" +
          "Answer:",
          max_tokens: 1000,
            temperature: 0,
            top_p: 1,
            n: 1,
          });
        let elements = response.data.choices[0].text.trim().split(',')



        this.objects[this.selectedIndex]['locations'] = []
        elements = localStorage.getItem('location').replace(".",'').split(',')
        for(let element of elements) {
          this.objects[this.selectedIndex]['locations'].push({
            'element': element,
            'selected': false
          })
        }

        this.objects[this.selectedIndex]['characters'] = []
        elements = localStorage.getItem('character').replace(".",'').split(',')
        for(let element of elements) {
          this.objects[this.selectedIndex]['characters'].push({
            'element': element,
            'selected': false
          })
        }

        this.objects[this.selectedIndex]['emotions'] = []
        elements = localStorage.getItem('emotion').replace(".",'').split(',')
        for(let element of elements) {
          this.objects[this.selectedIndex]['emotions'].push({
            'element': element,
            'selected': false
          })
        }
        return res
  
      },
      uploadPicture(){
        this.$refs.fileInput.click();
      },
      handleFileChange(event) {
        this.uploadBtnText = 'Uploading...'
        let file = event.target.files[0]
        let formData = new FormData();
        formData.append('file', file);
        formData.append('description', this.description);
        formData.append('user_id', this.userId);
        request('post', '/upload_image',{},formData
        ).then((res)=>{
          this.images[0]= baseUrl + res.data.image
          this.originalImage = baseUrl + res.data.image
          this.loadImagePanel = true
          this.showImagePanel = true
          setTimeout(()=>{
            this.createCanvas()
            // show image modification panel when uploading existing image
          },0)
        })
      },
      async preImgGenerate(index){
        this.selectedIndex = index
        // let input = this.message +  this.sentences[index]
        let input = this.message
  
        // check if the visual elements have been generated and then generate images
        if(!(this.selectedIndex in this.objects)){
          await this.generateVisualElements(input)
        }
        this.imgGenerate()
      },
      imgGenerate(){
        this.log = 'Generating....'
        let prompts = this.message
        let tags = []
        // for(let key in this.objects[this.selectedIndex]){
        //   for(let i = 0; i < this.objects[this.selectedIndex][key].length; i++){
        //     if(this.objects[this.selectedIndex][key][i].selected){
        //       prompts += ' ' + this.objects[this.selectedIndex][key][i].element
        //       tags.push(this.objects[this.selectedIndex][key][i].element)
        //     }
        //   }
        // }
        // if(prompts===''){
        //   for(let key in this.objects[this.selectedIndex]){
        //     for(let i = 0; i < this.objects[this.selectedIndex][key].length; i++){
        //       if(this.objects[this.selectedIndex][key][i].selected){
        //         prompts += ' ' + this.objects[this.selectedIndex][key][i].element
        //         tags.push(this.objects[this.selectedIndex][key][i].element)
        //       }
        //     }
        //   }      }
        // prompts += ' ' + this.styleOptions[this.style].description
        localStorage.setItem('tags', JSON.stringify(tags));
  

        // use DALL-E to generate images
        postToOpenAI('/v1/images/generations', {
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            "prompt": prompts,
            "n":1,
            "size":"1024x1024"
          },
        }).then((res)=>{
          this.images[this.selectedIndex] = res.data.data[0].url
          this.addImg()
        })
        // this.log = ''
      },
      addImg(){
        // save image to backend
        request('post', '/add_image',{},
          {
            'url': this.images[this.selectedIndex],
            'description': this.sentences[this.selectedIndex],
            'user_id': this.userId
          }).then((res)=>{
            this.images[this.selectedIndex]= baseUrl + res.data.image
            this.log = ''
  
        })
      },
      editDreamRecording(){
        this.description = this.sentences[0]
        localStorage.setItem('images', JSON.stringify(this.images));
        localStorage.setItem('description', this.description);
        let date = new Date();
        localStorage.setItem('date',date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
        this.$router.push('/ModifyPage')
      },
  
      // image polish
      async polish(index){
        this.polishBtnText = 'Generating...'
        this.selectedIndex = index
        await this.generateVisualElements(this.sentences[this.selectedIndex])
        // this.showAdvance = true
        this.finishPolish();
        this.polishBtnText = 'Generate based on Text'
      },
      addCustomizedKeyword(type){
        this.objects[this.selectedIndex][type].push({
          'element': this.customizedKeywords[type],
          'selected': true
        })
        this.customizedKeywords[type] = ''
      },
      chooseStyle(style){
        this.style=style
        this.isShowStyleOptions=false
      },
      finishPolish(){
        // this.showAdvance=false
        this.preImgGenerate(this.selectedIndex)
      },
      modify(){
        if(this.modifyPrompt === ''){
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
              formData.append('prompt', this.modifyPrompt);
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
                this.editBtnText = 'Downloading...'
                request('post', '/add_image',{},
                    {
                      'url': res.data.data[0].url,
                      'description': this.description,
                      'user_id':  localStorage.getItem('userId')
                    }).then((res)=>{
                      const canvas = document.getElementById('image');
                      const ctx = canvas.getContext('2d');
                      const img = new Image();
                      img.src = baseUrl + res.data.image;
                      this.generatedImg = baseUrl + res.data.image;
                      img.onload = ()=> {
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                        this.editBtnText = 'Make an edit'
                      }
                })
              })
            })
          }
        })
      },
      update(){
        this.loadImagePanel = false
        this.showImagePanel = false
        this.modifyPrompt = ''
        this.images[0] = this.generatedImg?this.generatedImg:this.images[0]
      },
      editImg(){
        if(!this.images[0]){
          this.$toast('You should have an image first.')
          return
        }
        this.originalImage = this.images[0]
        this.loadImagePanel = true
        this.showImagePanel = true
        setTimeout(()=>{
          this.createCanvas()
          // show image modification panel when uploading existing image
        },0)
      },
      reload(){
        this.reloadBtnText= 'Reloading...'
        this.generatedImg = this.images[0]
        this.createCanvas()
        this.reloadBtnText = 'Reload Picture'
        this.uploadBtnText = 'Generate with Image'
      },
      createCanvas(){
        const canvas = document.getElementById('image');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = this.images[0];
        img.onload = () => {
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
  
      },
      deleteImg(){
        if(!this.images[0]){
          this.$toast('You should have an image first.')
          return
        }
        this.images[0]='';
      },

    },
    created() {
      // load user info
      this.userId = localStorage.getItem('userId')
      this.username = localStorage.getItem('username')
  
      // load content
      const dreamId = localStorage.getItem('dreamId')
      this.description = localStorage.getItem('description')
      this.description_note = "Your story: " + this.description; 
      // sentence segmentation
      if(dreamId !== ''){
        // edit
        this.images = JSON.parse(localStorage.getItem('images'))
        this.sentences = []
        this.sentences.push(this.description)
      } else {
        this.sentences = []
        this.sentences.push(this.description)
      }
      this.message = localStorage.getItem("imagePresentation").split(":")[1]
      this.message_note = "Text Prompt: "+ this.message;
    },

  
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
    justify-content: space-around;
    overflow-y: scroll;
    background-color: var(--bg-primary-color);
  }
  .dream-section{
    width: 80%;
    margin-left: 10%;
    /* display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start; */
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto auto;
    grid-template-areas: "heading heading" "original original" "panel image";
  }

  .heading-section{
    grid-area: heading;

    background-image: var(--bg-secondary-color);
    background-color: #1D1B17;
    background-color: #6B261C;
    border: 3px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    text-align: left;
    border-radius: 15px;
    margin-bottom: 20px;
  }
  
  .heading-section > textarea{
    background-color: transparent;
    border-style: none;
  }

  .original-section{
    grid-area: original;

    background-image: var(--bg-secondary-color);
    background-color: #1D1B17;
    border: 2px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    text-align: left;
    border-radius: 15px;
    margin-bottom: 20px;
  }
  .original-section > textarea{
    background-color: transparent;
    border-style: none;
  }

  .image-section{
    grid-area: image;
  }

  .panel{
    grid-area: panel;
  }


  .img{
    filter: drop-shadow(0px 0px 10px #F0C777);
    border-radius: 15px;
    width: 90px;
    height: 90px;
    margin-right: 40px;
  }
  .img-choices{
    filter: drop-shadow(0px 0px 10px #F0C777);
    margin-right: 0 !important;
    cursor: pointer;
  }
  .img-choices:hover{
  }
  .panel{
    background-image: var(--bg-secondary-color);
    background-color: #1D1B17;
    border: 2px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    text-align: left;
    border-radius: 15px;
  }
  .upload-modify-panel{
    background-image: var(--bg-secondary-color);
    background-color: #1D1B17;
    border: 2px solid var(--primary-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    text-align: left;
    border-radius: 15px;
  }
  .panel > textarea{
    background-color: transparent;
    border-style: none;
  }
  .upload-modify-panel > textarea{
    background-color: transparent;
    border-style: none;
  }
  textarea:focus, input:focus{
    outline: 0;
  }
  .prompts{
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  .outer{
    margin-bottom: 15px;
    border-radius: 15px;
    border: 2px solid #E67662;
    height: 60px;
    flex-shrink: 0;
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
  textarea{
    resize: none;
  }
  .promptPanel{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 0 10px var(--primary-color);
    width: 700px;
  }
  ::selection {
    background-color: var(--primary-color); /* 设置高亮的背景色为橙色 */
    color: #000; /* 设置高亮的前景色为白色 */
    box-shadow: 0 0 10px var(--primary-color);
  }
  .input{
    background: var(--primary-color);
    border: none;
    display: inline;
    width: auto;
  }

  .headingText{
    font-size: larger;
    font-weight: 700;

    border: orange 2px solid;
    background-color: #E67662;

    
  }
  </style>
  
