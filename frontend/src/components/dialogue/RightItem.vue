<template>
    <div class="item">
        <img class="head" :src="user"/>
        <slot></slot>
        <div class="content">
            <div v-if="type===1&&content || type===3" class="text" style="word-break: break-all;">
                {{content}}
              <p v-if="type===3"></p>
            </div>
            <img v-else-if="type===2" class="img" :src="content"/>
        </div>
    </div>
</template>

<script>
import user from '../../assets/user.jpg'
export default {
  name: "RightItem",
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
  data() {
    return {
      user: user
    }
  }
}
</script>

<style scoped>
.img {
  width: 100px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.text {
  background-color: var(--primary-color);
  border-radius: 20px 4px 20px 20px;
  box-shadow: 1px 2px 5px var(--secondary-color);
  padding: 10px;
  color: var(--font-darker-color);
  font-family: var(--font-family);
  display: flex;
  flex-direction: column;
  font-size: 20px;
}
.content {
  margin-right: 10px;
  margin-top: 10px;
}
.head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.item {
    display: flex;
    padding: 10px 15px 10px 75px;
    flex-direction: row-reverse;
}
::selection {
  background-color: var(--primary-color); /* 设置高亮的背景色为橙色 */
  color: #000; /* 设置高亮的前景色为白色 */
  box-shadow: 0 0 10px var(--primary-color);
}
</style>
