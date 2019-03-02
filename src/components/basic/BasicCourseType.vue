<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 课程类别信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>培养方案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="课程名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary"   @click="showAddDepView(data, event)" >添加</el-button>
    </div>
    // 展示信息专用，从数组pageInfo.list调出
    <el-table
      :data="pageInfo.list"
      :stripe="false"
      :show-header="true"
      :row-class-name="rowClass"
      @row-click="rowClick"
      style="width: 100%">
      <el-table-column prop="course_type_id" label="课程类别ID" width="250">
      </el-table-column>
      <el-table-column prop="course_type_name" label="类别名称" width="250">
      </el-table-column>
      <el-table-column prop="preorder_id" label="上级类别ID" width="250">
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

    // 翻页专用
    <div class="pagination">
      <el-pagination
        @current-change="initList"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
    // dialogVisible为真时出现，增加信息页面，把添加的信息放到对应的变量中。
    <div style="text-align: left">
      <el-dialog
        title="添加培养方案"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>课程类别ID</span>
          <el-input size="mini" style="width: 200px;" v-model="course_type_id" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>类别名称</span>
          <el-input size="mini" style="width: 200px;" v-model="course_type_name" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>上级类别ID</span>
          <el-input size="mini" style="width: 200px;" v-model="preorder_id" placeholder="请输入..." ></el-input>
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
        // 展示的数值
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
      // planName: '',
      preorder_id: '',
      course_type_name: '',
      course_type_id: '',
      // majorName: '',
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
      // 点击添加按钮以后展示添加界面
      event.stopPropagation()
    },
    add () {
      this.dialogVisible = false
      this.treeLoading = true
      this.postRequest('/planbasic/save', {
        course_type_id: this.course_type_id,
        course_type_name: this.course_type_name,
        preorder_id: this.preorder_id
      }).then(resp => {
        this.treeLoading = false
        if (resp && resp.status === 200) {
          // 让原信息清空
          // this.planName = ''
          // this.schoolName = ''
          // this.majorName = ''
          this.course_type_id = ''
          this.course_type_name = ''
          this.preorder_id = ''
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
    // 这才是真正的搜索方法，搜索的结果给了pageInfo，pageInfo里有很多信息，包括list
    // 把搜索的结果展示在el-table
    initList (val = 1, title = '') {
      this.getRequest('/planbasic/list?pageNum=' + val + '&title=' + title).then(resp => {
        if (resp && resp.data.status === 'ok') {
          // alert(JSON.stringify(resp.data))
          this.pageInfo = resp.data.result
        }
      })
    },
    // 搜索方法
    search () {
      this.initList(1, this.select_word)
      // 给这个函数一个1，还有写在表单里的搜索关键词
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
