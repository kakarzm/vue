<template>
    <div class="header">
      <div class="logo">牛逼管理系统</div>
      <div class="title">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">系统管理</a></el-menu-item>
        </el-menu>
      </div>
        <div class="user-info">
            <el-dropdown  @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    <img class="user-logo" v-if="userFace!=''" :src="userFace"/>
                    {{ showName }}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="getUserInfo">个人信息</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
      <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="ID"  v-show="false" :label-width="formLabelWidth">
            <el-input v-model="form.id"  auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"  auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.telephone" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" auto-complete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" auto-complete="off" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUserInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
export default {
  data () {
    return {
      showName: this.$store.state.user.name,
      storeData: this.$store.state,
      dialogFormVisible: false,
      activeIndex: '1',
      activeIndex2: '1',
      form: {
        id: '',
        name: '',
        telephone: '',
        phone: '',
        address: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    'storeData.user': function (val) {
      this.showName = val.name
    }
  },
  computed: {
    userFace () {
      return this.$store.getters.getUser.userface
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'logout') {
        this.$confirm('确定注销登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/logout')
          this.$store.commit('logout')
          this.$router.replace({path: '/'})
          this.$message({
            message: '您已注销登录状态',
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消'
          })
        })
      } else if (command === 'getUserInfo') {
        this.dialogFormVisible = true
        this.getRequest('/system/hr/id/' + this.$store.getters.getUser.id).then(resp => {
          if (resp && resp.status === 200) {
            this.form.id = resp.data.id
            this.form.name = resp.data.name
            this.form.telephone = resp.data.telephone
            this.form.phone = resp.data.phone
            this.form.address = resp.data.address
            this.$store.dispatch('setUser', resp.data)
          } else {
            this.$message({
              message: '获取用户信息失败',
              type: 'error'
            })
          }
        })
      }
    },
    submitUserInfo () {
      this.putRequest('/system/hr/update', {
        'id': this.form.id,
        'name': this.form.name,
        'telephone': this.form.telephone,
        'phone': this.form.phone,
        'address': this.form.address,
        'enabled': true
      }).then(resp => {
        if (resp && resp.status === 200) {
          let u = JSON.parse(window.sessionStorage.getItem('user'))
          u.name = this.form.name
          u.telephone = this.form.telephone
          u.phone = this.form.phone
          u.address = this.form.address
          this.$store.dispatch('setUser', u)
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
    .title{
      float:left ;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
</style>
