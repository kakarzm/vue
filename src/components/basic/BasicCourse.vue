<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 课程管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="课程名称" class="handle-input mr10"></el-input>
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
      <el-table-column prop="course_name" label="课程名称" width="250">
      </el-table-column>
      <el-table-column prop="english_name" label="英文名称" width="250">
      </el-table-column>
      <el-table-column prop="course_code" label="课程代码" width="250">
      </el-table-column>
      <el-table-column prop="course_type_id" label="类别名称" width="250">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="edit(scope.row.course_id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.course_id)">删除</el-button>
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
        title="添加学校信息"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>课程名称</span>
          <el-input size="mini" style="width: 200px;" v-model="courseName" placeholder="请输入名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>英文名称</span>
          <el-input size="mini" style="width: 200px;" v-model="englishName" placeholder="请输入课程英文名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程代码</span>
          <el-input size="mini" style="width: 200px;" v-model="courseCode" placeholder="请输入课程代码..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>类别名称</span>
          <el-input size="mini" style="width: 200px;" v-model="courseType" placeholder="请输入类别名称..." ></el-input>
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
      courseName: '',
      englishName: '',
      courseCode: '',
      courseType: '',
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
        this.putRequest('/coursebasic/update', {
          id: this.id,
          title: this.courseName,
          englishName: this.englishName,
          courseCode: this.courseCode,
          courseType: this.courseType
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.courseName = ''
            this.englishName = ''
            this.courseCode = ''
            this.id = ''
            this.courseType = ''
            this.$message({type: 'success', message: '修改成功!'})
            this.initList()
          }
        })
      }

      if ((this.id.length) === 0) {
        this.dialogVisible = false
        this.treeLoading = true
        this.postRequest('/coursebasic/save', {
          title: this.courseName,
          englishName: this.englishName,
          courseCode: this.courseCode,
          courseType: this.courseType
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.courseName = ''
            this.englishName = ''
            this.courseCode = ''
            this.courseType = ''
            this.$message({type: 'success', message: '添加成功!'})
            this.initList()
          }
        })
      }
    },
    del (id) {
      this.deleteRequest('/coursebasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      this.getRequest('/coursebasic/searchbyid/' + id).then(resp => {
        console.log(resp)
        if (resp && resp.status === 200) {
          this.courseName = resp.data.result.title
          this.englishName = resp.data.result.englishName
          this.courseCode = resp.data.result.courseCode
          this.courseType = resp.data.result.courseType
          this.id = resp.data.result.id
          this.dialogVisible = true
          event.stopPropagation()
          this.initList()
        }
      })
    },
    initList (val = 1, title = '') {
      this.getRequest('/coursebasic/list?pageNum=' + val + '&title=' + title).then(resp => {
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
