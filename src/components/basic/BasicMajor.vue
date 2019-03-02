<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 专业管理</el-breadcrumb-item>
        <el-breadcrumb-item>专业管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="专业名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary"   @click="showAddDepView(data, event)" >添加</el-button>
    </div>
    <el-table
      :data="pageInfo.list"
      :stripe="false"
      :show-header="true"
      :row-class-name="rowClass"
      @row-click="rowClick"
      style="width: 100%">
      <el-table-column prop="major_name" label="专业名称" width="250">
      </el-table-column>
      <el-table-column prop="major_url" label="专业官方地址" width="250">
      </el-table-column>
      <el-table-column prop="major_code" label="专业代码" width="250">
      </el-table-column>
      <el-table-column prop="major_introduction" label="专业介绍" width="250">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="edit(scope.row.major_id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.major_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="initList"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
    <div style="text-align: left">
      <el-dialog
        title="添加专业信息"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>专业名称</span>
          <el-input size="mini" style="width: 200px;" v-model="majorName" placeholder="请输入名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业地址</span>
          <el-input size="mini" style="width: 200px;" v-model="majorUrl" placeholder="请输入专业官方地址(url)..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业代码</span>
          <el-input size="mini" style="width: 200px;" v-model="majorCode" placeholder="请输入专业代码..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业介绍</span>
          <el-input size="mini" style="width: 200px;" v-model="majorIntroduction" placeholder="请输入专业介绍..." ></el-input>
        </div>
        <el-input size="mini" style="width: 200px;display:none" v-model="id" ></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="add">添加</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>
<script>
export default{
  data () {
    return {
      tableData: [],
      pageInfo: {
        total: 0,
        list: [],
        pageNum: 0,
        pageSize: 0,
        size: 0,
        startRow: 0,
        endRow: 0,
        pages: 0,
        prePage: 0,
        nextPage: 0,
        isFirstPage: true,
        isLastPage: false,
        hasPreviousPage: false,
        hasNextPage: true,
        navigatePage: 0,
        navigatepageNums: [],
        navigateFirstPage: 0,
        navigateLastPage: 0,
        lastPage: 0,
        firstPage: 0
      },
      id: '',
      majorName: '',
      majorUrl: '',
      majorCode: '',
      majorIntroduction: '',
      is_search: false,
      dialogVisible: false,
      select_word: '',
      treeLoading: false
    }
  },
  created: function () {
    this.initList()
  },
  mounted: function () {
  },
  computed: {
  },
  methods: {
    rowClass () {
    },
    rowClick () {
    },
    showAddDepView (data, event) {
      this.dialogVisible = true
      event.stopPropagation()
    },
    add () {
      if (this.id) {
        this.dialogVisible = false
        this.treeLoading = true
        this.putRequest('/majorbasic/update', {
          id: this.id,
          title: this.majorName,
          majorUrl: this.majorUrl,
          majorCode: this.majorCode,
          majorIntroduction: this.majorIntroduction
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.majorName = ''
            this.majorUrl = ''
            this.majorCode = ''
            this.id = ''
            this.majorIntroduction = ''
            this.$message({type: 'success', message: '修改成功!'})
            this.initList()
          }
        })
      }

      if ((this.id.length) === 0) {
        this.dialogVisible = false
        this.treeLoading = true
        this.postRequest('/majorbasic/save', {
          title: this.majorName,
          majorUrl: this.majorUrl,
          majorCode: this.majorCode,
          majorIntroduction: this.majorIntroduction
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.majorName = ''
            this.majorUrl = ''
            this.majorCode = ''
            this.majorIntroduction = ''
            this.$message({type: 'success', message: '添加成功!'})
            this.initList()
          }
        })
      }
    },
    del (id) {
      this.deleteRequest('/majorbasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      this.getRequest('/majorbasic/searchbyid/' + id).then(resp => {
        console.log(resp)
        if (resp && resp.status === 200) {
          this.majorName = resp.data.result.title
          this.majorUrl = resp.data.result.majorUrl
          this.majorCode = resp.data.result.majorCode
          this.majorIntroduction = resp.data.result.majorIntroduction
          this.id = resp.data.result.id
          this.dialogVisible = true
          event.stopPropagation()
          this.initList()
        }
      })
    },
    initList (val = 1, title = '') {
      this.getRequest('/majorbasic/list?pageNum=' + val + '&title=' + title).then(resp => {
        if (resp && resp.data.status === 'ok') {
          this.pageInfo = resp.data.result
        }
      })
    },
    search () {
      this.initList(1, this.select_word)
    }
  }
}
</script>
<style>
  .handle-box{
    margin-bottom: 20px;
  }
  .handle-input{
    width: 300px;
    display: inline-block;
  }
</style>
