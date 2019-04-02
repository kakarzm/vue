<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过ccc搜索xxxx,记得回车哦..."
            v-model="keyword"
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="false"
            prefix-icon="el-icon-search">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEntity">搜索
          </el-button>
          <el-button slot="reference" type="primary" @click="advanceSearchViewVisible = true" size="mini"
                     style="margin-left: 5px">
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
            <el-button slot="reference" type="primary" size="mini"><i class="fa fa-lg fa-level-down"
                                                                      style="margin-right: 5px"
                                                                      @click="openUploadView"></i>文件操作
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
                <el-table :data="props.row.semesters" size="mini" style="width: 66%" stripe>
                  <el-table-column type="index" align="left" width="30">
                  </el-table-column>
                  <el-table-column
                    prop="semester"
                    align="left"
                    label="学期"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="week"
                    align="left"
                    label="周数"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="createby"
                    align="left"
                    label="创建者"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="editby"
                    align="left"
                    label="更新者"
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
            <el-col :span="1">
              <el-button type="danger" size="mini" :disabled="true">批量删除</el-button>
            </el-col>
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
    <el-dialog width="80%"
               :title="dialogTitle"
               :close-on-click-modal="false"
               style="padding: 0;"
               :visible.sync="dialogFormVisible">
      <el-form ref="CoursetypeInfoForm" :model="entity" label-width="80px">
        <div v-for="(item,index) in entity.coursetypeInfos" :key="index" style="margin-bottom:15px;padding:10px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
        <el-row :gutter="20">
          <el-col :span="20">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="课程类别"
                              :prop="'coursetypeInfos.' + index + '.courseTypeId'"
                              :rules="{required: true, message: '课程类别', trigger: 'blur'}"
                              size="mini">
                  <el-cascader
                    placeholder="搜索:通识课"
                    size="mini"
                    clearable
                    v-model="item.courseTypeId"
                    @change="handleCascaderChange"
                    :show-all-levels="false"
                    :options="courseTypes"
                    filterable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="总学分"
                              size="mini"
                              :prop="'coursetypeInfos.' + index + '.allCredit'"
                              :rules="{required: true, message: '总学分不能为空', trigger: 'blur'}">
                  <el-input v-model="item.allCredit" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="理论学时"
                              size="mini"
                              :prop="'coursetypeInfos.' + index + '.theory'"
                              :rules="{required: true, message: '理论学时不能为空(没有填0)', trigger: 'blur'}">
                  <el-input v-model="item.theory" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="实践学时"
                              size="mini"
                              :prop="'coursetypeInfos.' + index + '.practice'"
                              :rules="{required: true, message: '实践学时不能为空(没有填0)', trigger: 'blur'}">
                  <el-input v-model="item.practice" size="mini"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" size="mini">
              <el-button type="primary" icon="el-icon-plus" circle size="mini"
                         @click="addCoursetypeSemester(index)"></el-button>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item label-width="0px" size="mini">
              <el-button size="mini" @click="removeCoursetypeInfo(item)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(cs,csindex) in item.coursetypeSemesters" :key="csindex">
          <el-col :span="5">
            <el-form-item label="活动区域" size="mini">
              <el-select v-model="cs.semesterId" placeholder="请选择学期" size="mini" clearable>
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="周学时" size="mini">
              <el-input v-model="cs.weekCount" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="学期学分" size="mini">
              <el-input v-model="cs.creditCount" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-form-item size="mini" label-width="0px">
              <el-button type="danger" @click="removeCoursetypeSemester(index,cs)" icon="el-icon-delete" circle></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addCoursetypeInfo">添加</el-button>
        <el-button @click="closeSaveOrUpdateView" size="mini">取 消</el-button>
        <el-button type="primary" @click="updateSemester" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Semester',
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
      trainingplans: [],
      entity: {
        id: '',
        coursetypeInfos: [
          {
            courseTypeId: '',
            allCredit: '',
            theory: '',
            practice: '',
            coursetypeSemesters: [
              {
                semesterId: '',
                weekCount: '',
                creditCount: ''
              }
            ]
          }
        ]
      }
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
      this.getRequest('/trainingplan/semester?keyword=' + this.keyword + '&pageSize=' + this.pageSize + '&pageNumber=' + this.pageNumber).then(resp => {
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
      this.dialogTitle = '编辑关联课程体系详细'
      this.dialogFormVisible = true
    },
    updateSemester () {
      let _this = this
      this.axios.post('/trainingplan/semester', this.entity).then(resp => {
        if (resp && resp.status === 200) {
          _this.$message({type: resp.data.status, message: resp.data.msg})
          _this.closeSaveOrUpdateView()
          _this.loadTable()
        }
      })
    },
    addCoursetypeInfo () {
      this.entity.coursetypeInfos.push({
        courseTypeId: '',
        allCredit: '',
        theory: '',
        practice: '',
        coursetypeSemesters: [
          {
            semesterId: '',
            weekCount: '',
            creditCount: ''
          }
        ]
      })
    },
    addCoursetypeSemester (index) {
      this.entity.coursetypeInfos[index].coursetypeSemesters.push({
        semesterId: '',
        weekCount: '',
        creditCount: ''
      })
    },
    removeCoursetypeInfo (item) {
      let index = this.entity.coursetypeInfos.indexOf(item)
      if (index !== -1) {
        this.entity.coursetypeInfos.splice(index, 1)
      }
    },
    removeCoursetypeSemester (index, cs) {
      let csindex = this.entity.coursetypeInfos[index].coursetypeSemesters.indexOf(cs)
      if (csindex !== -1) {
        this.entity.coursetypeInfos[index].coursetypeSemesters.splice(index, 1)
      }
    },
    closeSaveOrUpdateView () {
      this.emptyEntity()
      this.dialogFormVisible = false
    },
    emptyEntity () {
      this.entity = {
        id: '',
        semesters: [
          {semester: '', week: ''}
        ]
      }
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
