<template>
  <div>
    <el-container  style="height:100%" direction="vertical">
      <!--<el-container style="height:650px;">-->
      <el-header   class="header">
        <div class="logo">培养方案</div>
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
                    <img class="user-logo" src="../../static/img/img.jpg">
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
            <el-form-item label="编辑头像"  :label-width="formLabelWidth">
              <img class="pre-img" :src="src" alt="">
              <vue-core-image-upload :class="['pure-button','pure-button-primary','js-btn-crop']"
                                     :crop="true"
                                     text="上传图片"
                                     url="/api/posts/"
                                     extensions="png,gif,jpeg,jpg"
                                     @imageuploaded="imageuploaded"
                                     @errorhandle="handleError"></vue-core-image-upload>
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
      </el-header>

      <el-container>
        <el-main>
          <div :class="barclass">
          <el-tooltip class="item" effect="dark" content="点击缩放菜单" placement="top">
            <el-button  type="primary" :class="move" :icon="moveIcon" @click="moveMenu"></el-button>
          </el-tooltip>
          <el-menu background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b"
                   show-overflow-tooltip
                   :collapse="isCollapse" :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
              <template v-if="item.subs">
                <el-submenu :key="item.title" :index="item.index">
                  <template slot="title"><i :class="item.icon"></i><span slot="title">{{ item.title }}</span></template>
                  <template v-for="subItem in item.subs">
                    <template v-if="subItem.subs">
                      <el-submenu :key="subItem.title" :index="subItem.index">
                        <template slot="title"><i :class="subItem.icon"></i><span slot="title">{{ subItem.title }}</span></template>
                        <el-menu-item v-for="(subsubItem, i) in subItem.subs" :key="i" :index="subsubItem.index">
                          <i :class="subsubItem.icon"></i><span slot="title">{{ subsubItem.title }}</span>
                        </el-menu-item>
                      </el-submenu>
                    </template>
                    <template v-else>
                      <el-menu-item :key="subItem.title" :index="subItem.index">
                        <i :class="subItem.icon"></i><span slot="title">{{ subItem.title }}</span>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :key="item.title" :index="item.index">
                  <i :class="item.icon"></i>{{ item.title }}
                </el-menu-item>
              </template>
            </template>

            <template v-for="(item,index) in this.routes" v-if="!item.hidden">
              <el-submenu :key="index" :index="index+''">
                <template slot="title">
                  <i :class="item.iconCls" ></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item width="180px"
                              style="padding-left: 30px;padding-right:0;margin-left: 0;width: 170px;text-align: left"
                              v-for="child in item.children"
                              :index="child.path"
                              :key="child.path">{{child.name}}
                </el-menu-item>
              </el-submenu>
            </template>
          </el-menu>
          </div>
          <div class="mainbar">
          <keep-alive>
            <transition name="fade" mode="out-in">
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </transition>
          </keep-alive>
          <transition name="fade" mode="out-in">
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </transition>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
  data () {
    return {
      clientHeight: '',
      showName: this.$store.state.user.name,
      storeData: this.$store.state,
      dialogFormVisible: false,
      activeIndex: '1',
      activeIndex2: '1',
      src: './static/img/img.jpg',
      fileList: [],
      form: {
        id: '',
        name: '',
        telephone: '',
        phone: '',
        address: '',
        userFace: ''
      },
      formLabelWidth: '120px',
      isCollapse: false,
      move: 'moveRight',
      barclass: 'sidebar',
      moveIcon: 'el-icon-arrow-left',
      items: [
        {
          icon: 'el-icon-success',
          index: 'exa0',
          title: '常用示例',
          subs: [
            {
              icon: 'el-icon-menu',
              index: 'exa2',
              title: '表格',
              subs: [
                {
                  name: '基础表格',
                  index: '/example/basetable',
                  title: '基础表格'
                }
              ]
            },
            {
              icon: 'el-icon-date',
              index: 'exa3',
              title: '表单',
              subs: [
                {
                  name: '基本表单',
                  index: '/example/baseform',
                  title: '基本表单'
                },
                {
                  name: '编辑器',
                  index: '/example/vueeditor',
                  title: '编辑器'
                },
                {
                  name: '穿梭框',
                  index: '/example/transfer',
                  title: '穿梭框'
                },
                {
                  name: '图片轮播',
                  index: '/example/carousel',
                  title: '图片轮播'
                },
                {
                  name: '文件上传',
                  index: '/example/upload',
                  title: '文件上传'
                }
              ]
            },
            {
              name: '图表',
              icon: 'el-icon-star-on',
              index: '/example/basecharts',
              title: '图表'
            },
            {
              name: '拖拽',
              icon: 'el-icon-upload2',
              index: '/example/drag',
              title: '拖拽'
            }
          ]
        }
      ]
    }
  },
  mounted () {
  },
  watch: {
    'storeData.user': function (val) {
      this.showName = val.name
    }
  },
  computed: {
    userFace () {
      return this.$store.getters.getUser.userface
    },
    onRoutes () {
      return this.$route.path.replace('/', '')
    },
    routes () {
      return this.$store.state.routes
    }
  },
  components: {
    VueCoreImageUpload
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
    },
    moveMenu () {
      if (this.isCollapse) {
        this.isCollapse = false
        this.move = 'moveRight'
        this.moveIcon = 'el-icon-arrow-left'
        this.barclass = 'sidebar'
      } else {
        this.isCollapse = true
        this.move = 'moveLeft'
        this.moveIcon = 'el-icon-arrow-right'
        this.barclass = 'sidebar_left'
      }
    },
    imageuploaded (res) {
      console.log(res)
    },
    handleError () {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    }
  }
}
</script>
<style>
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
  .mainbar{
    float: left;
    width: 82%;
    margin-left: 10px;
    margin-right: 0 ;
    bottom:0;
  }
  .moveRight{
    width: 100%;
    background-color: #545c64;
  }
  .moveLeft{
    width: 65px;
    background-color: #545c64;
  }
  .sidebar{
    float: left;
    width: 210px;
    margin-left: -20px;
    margin-top: -20px;
    left: 0;
    top: 70px ;
    bottom:0;
    background: #2E363F;
  }
  .sidebar_left{
    float: left;
    width: 65px;
    margin-left: -20px;
    margin-top: -20px;
    left: 0;
    top: 70px ;
    bottom:0;
    background: #2E363F;
  }
  .content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  .pre-img{
    width:250px;
    height: 250px;
    margin-bottom: 20px;
  }
</style>
