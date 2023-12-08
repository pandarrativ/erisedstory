<template>
    <div class="item">
        <img class="head" :src="avatar"/>
        <div class="content">
          <slot></slot>
          <div v-if="type===contentType.Message&&content" class="text">
            <span> {{content}}</span>
          </div>
          <img v-else-if="type===contentType.Image" class="img" :src="content"/>
        </div>
    </div>
</template>

<script>
import avatar from '../../assets/avatar.jpg'
export default {
    name: "LeftItem",
    props:{
        id:{
            type: Number,
            default: 0
        },
        type:{
            type: Number,
            default: 1
        },
        content:{
            type: String,
            default: ''
        }
    },
    data(){
        return{
            contentType:{
                Message:1,
                Image:2
            },
          avatar: avatar
        }
    }
}
</script>

<style scoped>
.head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-family: var(--font-family);
}
.img {
  width: 100px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.text {
  background-color: rgba(240, 199, 119);
  border-radius: 4px 20px 20px 20px;
  padding: 10px;
  box-shadow: 1px 2px 5px var(--primary-color);
  color: var(--font-darker-color);
  font-size: var(--font-size);
  font-family: var(--font-family);
  text-align: left
}
.content {
  margin-left: 10px;
  margin-top: 10px;
}
.item {
    display: flex;
    padding: 10px 15px;
    margin-right: 60px;
}
.blueHighlight{
  background-color: #0275ff;
  color: white;
  font-weight:bold;
  padding: 0px 5px;
  border-radius: 8px;
}
.greenHighlight{
  background-color: #82d616;
  color: white;
  font-weight:bold;
  padding: 0px 5px;
  border-radius: 8px;
}
::selection {
  background-color: var(--primary-color); /* 设置高亮的背景色为橙色 */
  color: #000; /* 设置高亮的前景色为白色 */
  box-shadow: 0 0 10px var(--primary-color);
}
</style>
