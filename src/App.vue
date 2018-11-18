<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'App'
  // created () {
  //   axios.get('static/data.json').then((res) => {
  //     // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
  //     this.$store.dispatch('set_UserList', res.data.users)
  //   }, (err) => {
  //     alert('用户获取失败')
  //     alert(err)
  //   })
  // }
}
</script>

<style>
  @import "../static/css/main.css";
  @import "../static/css/color-dark.css";
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin: 0;
}
</style>
