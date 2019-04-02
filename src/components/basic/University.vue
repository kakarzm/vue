<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过学校名称搜索学校信息,记得回车哦..."
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
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="openSaveView">
            添加学校
          </el-button>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-table
            :data="universities"
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
              prop="name"
              align="left"
              label="学校名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="province.cityname"
              align="left"
              label="所属省份"
              width="100">
            </el-table-column>
            <el-table-column
              prop="city.cityname"
              align="left"
              label="所属城市"
              width="100">
            </el-table-column>
            <el-table-column
              prop="type"
              align="left"
              label="学校类别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="jubanType"
              align="left"
              label="学校举办"
              width="100">
            </el-table-column>
            <el-table-column
              prop="yuanxiaoType"
              align="left"
              label="院校类型"
              width="100">
            </el-table-column>
            <el-table-column
              prop="attribute"
              align="left"
              label="院校隶属"
              width="100">
            </el-table-column>
            <el-table-column
              prop="banxueType"
              align="left"
              label="办学类型"
              width="100">
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
                <el-button size="mini" icon="el-icon-edit" @click="openUpdateView(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteEntity(scope.row)">删除</el-button>
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
    <el-dialog width="66%"
               :title="dialogTitle"
               :close-on-click-modal="false"
               style="padding: 0;"
               :visible.sync="dialogFormVisible">
      <el-form :model="university" size="mini" label-width="80px" :rules="rules" ref="addEntityForm">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="学校名称" prop="name">
              <el-input v-model="university.name" prefix-icon="el-icon-edit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属省份" prop="provinceId">
              <el-select v-model="university.provinceId"
                         clearable
                         @change="loadCities"
                         placeholder="请选择省份">
                <el-option v-for="item in provinces" :key="item.id" :label="item.cityname" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属城市" prop="cityId">
              <el-select v-model="university.cityId"
                         clearable
                         placeholder="请选择城市">
                <el-option v-for="item in cities" :key="item.id" :label="item.cityname" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="学校类别" prop="type">
              <el-select v-model="university.type"
                         clearable
                         placeholder="请选择类型">
                <el-option label="985院校" value="985"></el-option>
                <el-option label="211院校" value="211"></el-option>
                <el-option label="其他院校" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="院校举办" prop="jubanType">
              <el-select v-model="university.jubanType"
                         clearable
                         placeholder="请选择类型">
                <el-option label="民办" value="民办"></el-option>
                <el-option label="公办" value="公办"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="院校类型" prop="yuanxiaoType">
              <el-select v-model="university.yuanxiaoType"
                         clearable
                         placeholder="请选择类型">
                <el-option label="综合类" value="综合类"></el-option>
                <el-option label="师范类" value="师范类"></el-option>
                <el-option label="工科类" value="工科类"></el-option>
                <el-option label="农业类" value="农业类"></el-option>
                <el-option label="财经类" value="财经类"></el-option>
                <el-option label="林业类" value="林业类"></el-option>
                <el-option label="医药类" value="医药类"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="院校隶属" prop="attribute">
              <el-select v-model="university.attribute"
                         clearable
                         placeholder="请选择类型">
                <el-option label="教育部" value="教育部"></el-option>
                <el-option label="工信部" value="工信部"></el-option>
                <el-option label="卫生部" value="工科类"></el-option>
                <el-option label="中国科学院" value="中国科学院"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="办学类型" prop="banxueType">
              <el-select v-model="university.banxueType"
                         clearable
                         placeholder="请选择类型">
                <el-option label="大学" value="大学"></el-option>
                <el-option label="学院" value="学院"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeSaveOrUpdateView" size="mini">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate('addEntityForm')" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'University',
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
      university: {
        name: '',
        provinceId: '',
        cityId: '',
        type: '',
        jubanType: '',
        yuanxiaoType: '',
        attribute: '',
        banxueType: ''
      },
      universities: [],
      provinces: [],
      cities: [],
      rules: {
        name: [{required: true, message: '必填:学校名称', trigger: 'blur'}],
        provinceId: [{required: true, message: '必填:所属省份', trigger: 'blur'}],
        cityId: [{required: true, message: '必填:所属城市', trigger: 'blur'}],
        type: [{required: true, message: '必填:学校类型', trigger: 'blur'}],
        jubanType: [{required: true, message: '必填:院校举办', trigger: 'blur'}],
        yuanxiaoType: [{required: true, message: '必填:院校类型', trigger: 'blur'}],
        attribute: [{required: true, message: '必填:院校隶属', trigger: 'blur'}],
        banxueType: [{required: true, message: '必填:办学类型', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.initProvince()
    this.loadTable()
  },
  computed: {
    selectionChange () {
      return this.multipleSelection.length === 0
    }
  },
  methods: {
    initProvince () {
      this.getRequest('/district/pid/100000').then(resp => {
        if (resp && resp.status === 200) {
          this.provinces = resp.data.list
        }
      })
    },
    loadCities () {
      this.university.cityId = ''
      if (this.university.provinceId) {
        this.getRequest('/district/pid/' + this.university.provinceId).then(resp => {
          if (resp && resp.status === 200) {
            this.cities = resp.data.list
          }
        })
      } else {
        this.cities = []
      }
    },
    loadTable () {
      let _this = this
      this.loading = true
      this.getRequest('/university/list?keyword=' + this.keyword + '&pageSize=' + this.pageSize + '&pageNumber=' + this.pageNumber).then(resp => {
        if (resp && resp.status === 200) {
          _this.universities = resp.data.list
          _this.total = resp.data.total
        }
        this.loading = false
      })
    },
    searchEntity () {
      this.pageSize = 1
      this.loadTable()
    },
    openSaveView () {
      this.dialogTitle = '添加学校'
      this.dialogFormVisible = true
    },
    openUpdateView (item) {
      this.dialogTitle = '编辑学校'
      let _this = this
      this.$.ajax({
        type: 'get',
        url: '/district/pid/' + item.provinceId,
        dataType: 'json',
        asycn: false,
        success: function (resp) {
          _this.cities = resp.list
        }
      })
      this.university = {
        id: item.id,
        name: item.name,
        provinceId: item.provinceId,
        cityId: item.cityId,
        type: item.type,
        jubanType: item.jubanType,
        yuanxiaoType: item.yuanxiaoType,
        attribute: item.attribute,
        banxueType: item.banxueType
      }
      this.dialogFormVisible = true
    },
    saveOrUpdate (formName) {
      this.keyword = ''
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this
          if (this.university.id) {
            this.putRequest('/university/entity', this.university).then(resp => {
              if (resp && resp.status === 200) {
                this.$message({type: resp.data.status, message: resp.data.msg})
                _this.closeSaveOrUpdateView()
                _this.loadTable()
              }
            })
          } else {
            this.postRequest('/university/entity', this.university).then(resp => {
              if (resp && resp.status === 200) {
                this.$message({type: resp.data.status, message: resp.data.msg})
                _this.closeSaveOrUpdateView()
                _this.loadTable()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    deleteEntity (item) {
      let _this = this
      this.$confirm('此操作将删除该学校, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.putRequest('/university/statue/' + item.id).then(resp => {
          if (resp && resp.status === 200) {
            _this.$message({
              type: resp.data.status,
              message: resp.data.msg
            })
            this.loadTable()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    closeSaveOrUpdateView () {
      this.emptyEntity()
      this.cities = []
      this.dialogFormVisible = false
    },
    emptyEntity () {
      this.university = {}
      this.university = {
        name: '',
        provinceId: '',
        cityId: '',
        type: '',
        jubanType: '',
        yuanxiaoType: '',
        attribute: '',
        banxueType: ''
      }
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
