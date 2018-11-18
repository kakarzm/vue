<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> Neo4j数据</el-breadcrumb-item>
        <el-breadcrumb-item>节点</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-bottom:10px;">
      当前数据库中共有节点{{nodeCount}}个
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" >
      <el-table-column prop="id" label="id" sortable width="150">
      </el-table-column>
      <el-table-column prop="labels" label="标签" width="150">
      </el-table-column>
      <el-table-column prop="pkey" label="属性" width="150">
      </el-table-column>
      <el-table-column prop="pvalue" label="值" width="150">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change ="handleCurrentChange"
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>

</template>
<script>
export default{
  data () {
    return {
      nodeCount: '',
      url: 'static/vuetable.json',
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false
    }
  },
  created: function () {
    this.getData()
  },
  mounted: function () {
    this.initCount()
  },
  computed: {
    data () {
      const self = this
      return self.tableData.filter(function (d) {
        let isDel = false
        for (let i = 0; i < self.del_list.length; i++) {
          if (d.name === self.del_list[i].name) {
            isDel = true
            break
          }
        }
        if (!isDel) {
          if (d.address.indexOf(self.select_cate) > -1 && (d.name.indexOf(self.select_word) > -1 ||
              d.address.indexOf(self.select_word) > -1)
          ) {
            return d
          }
        }
      })
    }
  },
  methods: {
    initCount () {
      this.getRequest('/neoexa/count').then(resp => {
        if (resp && resp.status === 200) {
          this.nodeCount = resp.data.nodeCount
        }
      })
    },
    handleCurrentChange (val) {
      this.cur_page = val
      this.getData()
    },
    getData () {
      this.getRequest('/neoexa/nodes').then(resp => {
        if (resp && resp.status === 200) {
          this.tableData = resp.data.list
          alert(JSON.stringify(resp.data.list))
        }
      })
      // this.$axios.get(this.url, {page: this.cur_page}).then((res) => {
      //   this.tableData = res.data.list
      // })
    },
    search () {
      this.is_search = true
    }
  }
}
</script>
<style>
  .handle-box{
    margin-bottom: 20px;
  }
  .handle-select{
    width: 120px;
  }
  .handle-input{
    width: 300px;
    display: inline-block;
  }
</style>
