<template>
    <div :class="barclass">
      <el-tooltip class="item" effect="dark" content="点击收缩菜单" placement="top">
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
</template>

<script>
export default {
  data () {
    return {
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
                  index: '/example/basetable',
                  title: '基础表格1'
                }
              ]
            },
            {
              icon: 'el-icon-date',
              index: 'exa3',
              title: '表单',
              subs: [
                {
                  index: '/example/baseform',
                  title: '基本表单'
                },
                {
                  index: '/example/vueeditor',
                  title: '编辑器'
                },
                {
                  index: '/example/transfer',
                  title: '穿梭框'
                },
                {
                  index: '/example/carousel',
                  title: '图片轮播'
                },
                {
                  index: '/example/upload',
                  title: '文件上传'
                }
              ]
            },
            {
              icon: 'el-icon-star-on',
              index: '/example/basecharts',
              title: '图表'
            },
            {
              icon: 'el-icon-upload2',
              index: '/example/drag',
              title: '拖拽'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    },
    routes () {
      return this.$store.state.routes
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
    .moveRight{
      width: 100%;
      background-color: #545c64;
    }
    .moveLeft{
      width: 65px;
      background-color: #545c64;
    }
    .sidebar{
        display: block;
        position: absolute;
        width: 210px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar_left{
      display: block;
      position: absolute;
      width: 65px;
      left: 0;
      top: 70px;
      bottom:0;
      background: #2E363F;
    }

</style>
