<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 培养方案管理</el-breadcrumb-item>
        <el-breadcrumb-item>培养方案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="方案名称" class="handle-input mr10"></el-input>
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
      <el-table-column prop="title" label="培养方案名称" width="250">
      </el-table-column>
      <el-table-column prop="school" label="所属学校" width="250">
      </el-table-column>
      <el-table-column prop="major" label="所属专业" width="250">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.id)">删除</el-button>
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
        title="添加培养方案"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>方案名称</span>
          <el-input size="mini" style="width: 200px;" v-model="planName" placeholder="请输入名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>所属学校</span>
          <el-input size="mini" style="width: 200px;" v-model="schoolName" placeholder="请输入学校..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>所属专业</span>
          <el-input size="mini" style="width: 200px;" v-model="majorName" placeholder="请输入专业..." ></el-input>
        </div>
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
      planName: '',
      schoolName: '',
      majorName: '',
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
    showAddDepView (data, event) {
      this.dialogVisible = true
      event.stopPropagation()
    },
    add () {
      this.dialogVisible = false
      this.treeLoading = true
      this.postRequest('/planbasic/save', {
        title: this.planName,
        school: this.schoolName,
        major: this.majorName
      }).then(resp => {
        this.treeLoading = false
        if (resp && resp.status === 200) {
          this.planName = ''
          this.schoolName = ''
          this.majorName = ''
          this.$message({type: 'success', message: '添加成功!'})
          this.initList()
        }
      })
    },
    del (id) {
      this.deleteRequest('/planbasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      alert(id)
    },
    initList (val = 1, title = '') {
      this.getRequest('/planbasic/list?pageNum=' + val + '&title=' + title).then(resp => {
        if (resp && resp.data.status === 'ok') {
          // alert(JSON.stringify(resp.data))
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
