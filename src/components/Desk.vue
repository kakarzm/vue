<template>
  <div style="background-color: #EBEBEB;">
    <div style="width:100%;background-color: #636363; overflow: hidden">
            <span class="demonstration" style="float:left;padding-top:10px;color:white;margin-left:1%">
                首页
            </span>
      <span class="demonstration" style="float:left;padding:5px;color:white;margin-left:2%;width:15%">
                <el-input
                  placeholder="请输入"
                  icon="search"
                  v-model="searchCriteria"
                  :on-icon-click="handleIconClick">
                </el-input>
            </span>
      <span class="demonstration" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown  @command="handleCommand">
                  <span class="el-dropdown-link" style="color:white">
                    {{username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="getUserInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
    </div>

    <div style="margin-top:5px">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" >
              <el-menu-item index="1"><i class="el-icon-message"></i>导航一</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-menu"></i>导航二</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-setting"></i>导航三</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <div>
            <div style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; margin:2px; background-color: white">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :key="item" v-for="item in breadcrumbItems">{{item}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchCriteria: '',
      breadcrumbItems: ['导航一']
    }
  },
  computed: {
    username () {
      return sessionStorage.getItem('user')
    }
  },
  created () {
    this.$axios.get(this.HOST + '/user/getUser?uname=' + this.username).then((res) => {
      if (res.data.user) {
        this.$message.success('获取用户信息成功')
      } else {
        this.$message.error('获取用户信息失败')
      }
      this.loading = false
    }, (err) => {
      this.$message.error('获取用户信息错误')
      alert(err)
      this.loading = false
    })
  },
  methods: {
    handleIconClick (ev) {
      console.log(ev)
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$message('您已退出登录')
        sessionStorage.removeItem('user')
        console.info('logout')
        this.$router.push('/')
      }
    }
  }
}
</script>
