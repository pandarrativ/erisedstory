<template>
  <div class="outerWrapper">
    <div class="innerWrapper" @click="handleClick">
      <p class="text">{{text}}</p>
      <p class="notice text" v-if="notice!=''">{{notice}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "myButton",
  props:{
    text:{
      type: String,
      default: 'HOME PAGE'
    },
    notice: {
      type: String,
      default: ''
    }
  },
  data: ()=> {
    return {
    }
  },
  methods:{
    handleClick(){
      this.$emit('myClick')
    }
  }
}
</script>

<style scoped>
.outerWrapper{
  width: 100%;
  height: 100%;
  border-radius: 100px;
  border: 2px solid var(--secondary-color);box-shadow: 0 0 20px var(--primary-color);
  background-color: #32363A;
  cursor: pointer;
}
.innerWrapper {
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px var(--primary-color) inset;
  border-radius: 100px;
  display: flex;
  z-index: 1;
  justify-content: center;
  align-items: center;
  position:relative;
}
.text{
  font-size: 18px;
  font-family: var(--font-family);
  color: #8B9DA9
}
.notice{
  display: none;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: absolute;
  bottom:35px;
  padding: 8px;
  color: var(--font-primary-color)
}
.innerWrapper:hover .notice {
  display: unset;
}
</style>
