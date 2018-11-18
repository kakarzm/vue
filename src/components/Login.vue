<template>
  <div class="full_div">
  <el-form  class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item class="login_butItem">
      <el-button type="primary" @click.native.prevent="submitClick" class="login_butItem">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
export default{
  data () {
    return {
      checked: false,
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  created () {
    if (localStorage.getItem('username')) {
      this.loginForm.username = localStorage.getItem('username')
    }
    if (localStorage.getItem('password')) {
      this.loginForm.password = localStorage.getItem('password')
      this.checked = true
    }
  },
  methods: {
    submitClick: function () {
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        this.$message.error('用户名或密码不能为空！')
      } else {
        // 读取本地文件验证身份
        // let isuser = false
        // for (let i = 0; i < this.$store.state.userList.length; i++) {
        //   if (this.$store.state.userList[i].username === this.username && this.$store.state.userList[i].password === this.password) {
        //     isuser = true
        //   }
        // }
        // if (isuser) {
        //   sessionStorage.setItem('user', this.username)
        //   localStorage.setItem('user', this.username)
        //   setTimeout(() => {
        //     this.loading = false
        //     this.$router.push('./desk')
        //   }, 2000)
        // } else {
        //   this.$message.error('用户名或密码错误')
        //   this.loading = false
        // }
        let _this = this
        this.loading = true
        this.postRequest('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp => {
          _this.loading = false
          if (resp && resp.status === 200) {
            localStorage.setItem('username', this.loginForm.username)
            if (this.checked) {
              localStorage.setItem('password', this.loginForm.password)
            } else {
              localStorage.removeItem('password')
            }
            let data = resp.data
            _this.$store.commit('setUser', data.msg)
            let path = _this.$route.query.redirect
            _this.$router.replace({path: path === '/' || path === undefined ? '/readme' : path})
            this.$message({
              message: '登录成功',
              type: 'success'
            })
          } else {
          }
        })
      }
    }
  }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto ;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_remember {
    margin: 0 0 35px 0;
    text-align: left;
  }
  .login_butItem {
    width: 100% ;
  }
  .full_div {
    width:100%;
    height: 100%;
    background: #484b45;
    background: url('../assets/pexels-photo-696644.jpeg');
    background-size: cover;
    position: absolute;
  }
</style>
