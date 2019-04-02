<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过学校名称搜索xxxx,记得回车哦..."
            v-model="keyword"
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="false"
            prefix-icon="el-icon-search">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEntity">搜索
          </el-button>
          <el-button slot="reference" type="primary" @click="advanceSearchViewVisible = true" size="mini" style="margin-left: 5px">
            <i class="fa fa-lg" style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-popover
            placement="left-start"
            width="200"
            v-model="popoverUploadVisible">
            <div style="padding: 5px">
              <el-button size="mini"><i class="el-icon-download"></i>文件格式</el-button>
              <el-upload
                class="upload-demo"
                action="https://www.demo.com/posts/"
                multiple
                :limit="3">
                <el-button type="primary" size="mini"><i class="el-icon-upload2"></i>文件上传</el-button>
              </el-upload>
            </div>
            <el-button slot="reference" type="primary" size="mini"><i class="fa fa-lg fa-level-down" style="margin-right: 5px" @click="openUploadView"></i>文件操作
            </el-button>
          </el-popover>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-table
            :data="trainingplans"
            size="mini"
            style="width: 100%"
            stripe
            v-loading="loading"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              type="expand"
              align="left"
              width="30">
              <template slot-scope="props">
                <el-table :data="props.row.courses" size="mini" style="width: 66%" stripe>
                  <el-table-column type="index" align="left" width="30">
                  </el-table-column>
                  <el-table-column
                    prop="code"
                    align="left"
                    label="课程代码"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    align="left"
                    label="中文名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="englishName"
                    align="left"
                    label="英文名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="courseType.name"
                    align="left"
                    label="课程类型"
                    width="100">
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              label="中文名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="englishName"
              align="left"
              label="英文名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="major.name"
              align="left"
              label="关联专业"
              width="150">
            </el-table-column>
            <el-table-column
              prop="statue"
              align="left"
              label="状态"
              width="100">
              <template slot-scope="scope">{{scope.row.statue == '1'?'Normal':'Del'}}</template>
            </el-table-column>
            <el-table-column
              prop="createby"
              align="left"
              label="创建人"
              width="100">
              <template slot-scope="scope">{{scope.row.createby == '1'?'宁哥':'凯哥'}}</template>
            </el-table-column>
            <el-table-column
              prop="editby"
              align="left"
              label="修改人"
              width="100">
              <template slot-scope="scope">{{scope.row.editby == '1'?'凯哥':'宁哥'}}</template>
            </el-table-column>
            <el-table-column
              prop="createtime"
              align="left"
              label="创建时间"
              width="120">
              <template slot-scope="scope">{{scope.row.createtime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="edittime"
              align="left"
              label="修改时间"
              width="120">
              <template slot-scope="scope">{{scope.row.edittime | formatDate}}</template>
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right"
              width="200">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" @click="openUpdateView(scope.row)">编辑主干课程</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="margin-top: 5px">
            <el-col :span="1"><el-button type="danger" size="mini" :disabled="true">批量删除</el-button></el-col>
            <el-col :span="20" :pull="5">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageSize"
                :page-sizes="[10,15,20,50]"
                :page-size="pageNumber"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
    <el-dialog width="50%"
               :title="dialogTitle"
               :close-on-click-modal="false"
               style="padding: 0;"
               :visible.sync="dialogFormVisible">
      <el-transfer
        style="text-align: left; display: inline-block"
        v-model="mainCourses"
        filterable
        :titles="['所有课程', '主干课程']"
        :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
        @change="handleTransferChange"
        :data="courses">
      </el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeSaveOrUpdateView" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateMainCourse" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PlanCourse',
  data () {
    return {
      advanceSearchViewVisible: false,
      dialogFormVisible: false,
      popoverUploadVisible: false,
      loading: false,
      dialogTitle: '',
      pageSize: 1,
      pageNumber: 10,
      total: 10,
      multipleSelection: [],
      keyword: '',
      courses: [],
      planId: '',
      trainingplans: [],
      mainCourses: []
    }
  },
  created () {
    this.loadTable()
    this.initCourses()
  },
  computed: {
    selectionChange () {
      return this.multipleSelection.length === 0
    }
  },
  methods: {
    initCourses () {
      let _this = this
      this.getRequest('/course/initMain').then(resp => {
        if (resp && resp.status === 200) {
          _this.courses = resp.data.list
        }
      })
    },
    loadTable () {
      let _this = this
      this.loading = true
      this.getRequest('/trainingplan/course?keyword=' + this.keyword + '&pageSize=' + this.pageSize + '&pageNumber=' + this.pageNumber).then(resp => {
        if (resp && resp.status === 200) {
          _this.trainingplans = resp.data.list
          _this.total = resp.data.total
        }
        this.loading = false
      })
    },
    searchEntity () {
      this.pageSize = 1
      this.loadTable()
    },
    openUpdateView (item) {
      this.dialogTitle = '编辑主干课程'
      this.planId = item.id
      let _this = this
      item.courses.forEach((item, index) => {
        _this.mainCourses.push(item.id)
      })
      this.dialogFormVisible = true
    },
    updateMainCourse () {
      let _this = this
      this.postRequest('/trainingplan/course?id=' + this.planId + '&courses=' + this.mainCourses).then(resp => {
        if (resp && resp.status === 200) {
          _this.$message({type: resp.data.status, message: resp.data.msg})
          _this.closeSaveOrUpdateView()
          _this.loadTable()
        }
      })
    },
    closeSaveOrUpdateView () {
      this.emptyEntity()
      this.dialogFormVisible = false
    },
    emptyEntity () {
      this.mainCourses = []
    },
    handleTransferChange (value, direction, key) {
      console.log(value)
      console.log(direction)
      console.log(key)
    },
    handleCascaderChange (item) {
      if (item.length === 0) {
        this.trainingplan.type = ''
        return
      }
      let id = item[item.length - 1]
      this.trainingplan.type = id
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageNumber = val
      this.loadTable()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageSize = val
      this.loadTable()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    openUploadView () {
      this.popoverUploadVisible = true
    }
  }
}
</script>

<style scoped>
  .el-main {
    padding-left: 0;
    padding-top: 0;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .upload-demo {
    display: inline;
  }
</style>
