<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过职位名搜索企业信息,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchCompany"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchCompany">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                     @click="showAdvanceSearchView"><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <!-- <el-upload
            :show-file-list="false"
            accept="application/vnd.ms-excel"
            action="/emp/basic/importEmp"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
            :before-upload="beforeFileUpload" style="display: inline">
            <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                                          style="margin-right: 5px"></i>{{fileUploadBtnText}}
            </el-button>
          </el-upload>
          <el-button type="success" size="mini" @click="exportEmps"><i class="fa fa-lg fa-level-down"
                                                                       style="margin-right: 5px"></i>导出数据
          </el-button> -->
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddCompanyView">
            添加企业信息
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <el-table
            :data="companys"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              prop="companyNeedJobName"
              align="left"
              fixed
              label="职位名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="companyNeedDescription"
              width="120"
              align="left"
              label="职位描述">
            </el-table-column>
            <el-table-column
              prop="companyNeedType"
              width="150"
              align="left"
              label="工作类型">
            </el-table-column>
            <el-table-column
              prop="companyNeedProfession"
              width="240"
              label="对口专业"
              :formatter="professionFormatter">
            </el-table-column>
            <el-table-column
              prop="companyNeedName"
              width="120"
              label="公司名称">
            </el-table-column>
            <el-table-column
              prop="companyNeedIntroduction"
              width="120"
              label="公司介绍">
            </el-table-column>
            <el-table-column
              prop="companyNeedRequirement"
              width="120"
              label="任职需求">
            </el-table-column>
            <el-table-column
              width="100"
              align="left"
              label="创建时间">
              <template slot-scope="scope">{{ scope.row.companyNeedCreated | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="industryCertificateUpdated"
              align="left"
              width="100"
              label="更新时间">
              <template slot-scope="scope">{{ scope.row.companyNeedUpdated | formatDate}}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditCompanyView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary"
                           size="mini">查看高级资料
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteCompany(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="companys.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyCompany">批量删除
            </el-button>
            <el-pagination
              background
              :page-size="2"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="company" :rules="rules" ref="addCompanyForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="职位名称:" prop="industryCertificateName">
                  <el-input prefix-icon="el-icon-edit" v-model="company.companyNeedJobName" size="mini" style="width: 150px"
                            placeholder="请输入职位名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="工作类别:" prop="companyNeedType">
                  <el-select v-model="company.companyNeedType" style="width: 200px" size="mini" placeholder="请选择工作类别">
                    <el-option
                      v-for="item in companyTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="职位描述:" prop="industryCertificateSign">
                  <el-input prefix-icon="el-icon-edit" v-model="company.companyNeedDescription" size="mini" style="width: 150px"
                            placeholder="请输入职位描述"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="公司名称:" prop="companyNeedName">
                  <el-input prefix-icon="el-icon-edit" v-model="company.companyNeedName" size="mini" style="width: 150px"
                            placeholder="请输入公司名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
             <div>
                <el-form-item label="公司介绍:" prop="companyNeedIntroduction">
                  <el-input prefix-icon="el-icon-edit" v-model="company.companyNeedIntroduction" size="mini" style="width: 150px"
                            placeholder="请输入公司介绍"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="任职需求:" prop="companyNeedRequirement">
                  <el-input prefix-icon="el-icon-edit" v-model="company.companyNeedRequirement" size="mini" style="width: 150px"
                            placeholder="请输入任职需求"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="对口专业:" prop="industryCertificateCourse">
                  <el-select v-model="companyNeedProfessionObject" style="width: 300px" value-key="professionId"  size="mini" multiple placeholder="请选择对口专业">
                    <el-option
                      v-for="item in professions"
                      :key="item.professionId"
                      :label="item.professionName"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addCompany('addCompanyForm')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      companys: [],
      keywords: '',
      fileUploadBtnText: '导入数据',
      faangledoubleup: 'fa-angle-double-up',
      faangledoubledown: 'fa-angle-double-down',
      dialogTitle: '',
      multipleSelection: '',
      depTextColor: '#c0c4cc',
      totalCount: -1,
      currentPage: 1,
      dialogVisible: false,
      tableLoading: false,
      advanceSearchViewVisible: false,
      showOrHidePop: false,
      showOrHidePop2: false,
      companyTypes: [{id: 1, name: '软件开发'}, {id: 2, name: '运维'}, {id: 3, name: '销售'}],
      professions: [],
      company: {
        companyNeedJobName: '',
        companyNeedDescription: '',
        companyNeedType: '',
        companyNeedProfession: '',
        companyNeedName: '',
        companyNeedIntroduction: '',
        companyNeedRequirement: ''
      },
      companyNeedProfessionObject: [],
      rules: {
        companyNeedJobName: [{required: true, message: '必填:职位名称', trigger: 'blur'}],
        companyNeedDescription: [{required: true, message: '必填:职位描述', trigger: 'blur'}],
        companyNeedType: [{required: true, message: '必填:职位类型', trigger: 'blur'}],
        companyNeedProfession: [{required: true, message: '必填:对口专业', trigger: 'blur'}],
        companyNeedName: [{required: true, message: '必填:公司名称', trigger: 'blur'}],
        companyNeedIntroduction: [{required: true, message: '必填:公司介绍', trigger: 'blur'}],
        companyNeedRequirement: [{required: true, message: '必填:任职需求', trigger: 'blur'}]
      }
    }
  },
  mounted: function () {
    this.initData()
    this.loadCompany()
  },
  methods: {
    /*  fileUploadSuccess (response, file, fileList) {
      if (response) {
        this.$message({type: response.status, message: response.msg})
      }
      this.loadCompany()
      this.fileUploadBtnText = '导入数据'
    },
    // eslint-disable-next-line
    fileUploadError (err, file, fileList) {
      this.$message({type: 'error', message: '导入失败!'})
      this.fileUploadBtnText = '导入数据'
    },
    beforeFileUpload (file) {
      this.fileUploadBtnText = '正在导入'
    },
    exportEmps () {
      //       var iframe = document.createElement("iframe");
      //       iframe.style.display = 'none';
      //       iframe.src = "/emp/basic/exportEmp";
      //        iframe.onload=function () {
      //          document.body.removeChild(iframe);
      //        }
      //        document.body.appendChild(iframe);
      window.open('/emp/basic/exportEmp', '_parent')
    }, */
    professionFormatter (row, column) {
      let jo = JSON.parse(row.companyNeedProfession)
      let res = ''
      for (let o of jo) {
        res = res + o.professionName + ','
      }
      return res.substring(0, res.length - 1)
    },
    cancelSearch () {
      this.advanceSearchViewVisible = false
      this.emptyCompanyData()
      this.beginDateScope = ''
      this.loadCompany()
    },
    showAdvanceSearchView () {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible
      this.keywords = ''
      if (!this.advanceSearchViewVisible) {
        this.emptyCompanyData()
        this.beginDateScope = ''
        this.loadCompany()
      }
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    deleteManyCompany () {
      this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids += this.multipleSelection[i].companyNeedId + ','
        }
        this.doDelete(ids)
      }).catch(() => {
      })
    },
    deleteCompany (row) {
      this.$confirm('此操作将永久删除[' + row.companyNeedName + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(row.companyNeedId)
      }).catch(() => {
      })
    },
    doDelete (ids) {
      this.tableLoading = true
      var _this = this
      this.deleteRequest('/company/basic/company/' + ids).then(resp => {
        _this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({type: data.status, message: data.msg})
          _this.loadCompany()
        }
      })
    },
    keywordsChange (val) {
      if (val === '') {
        this.loadCompany()
      }
    },
    searchCompany () {
      this.loadCompany()
    },
    currentChange (currentChange) {
      this.currentPage = currentChange
      this.loadCompany()
    },
    loadCompany () {
      var _this = this
      this.tableLoading = true
      this.getRequest('/company/basic/company?page=' + this.currentPage + '&size=2&keywords=' + this.keywords).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          let data = resp.data
          _this.companys = data.companys
          _this.totalCount = data.count
          // _this.emptyCompanyData()
        }
      })
    },
    addCompany (formName) {
      var _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let p = this.companyNeedProfessionObject
          let pj = JSON.stringify(p)
          this.company.companyNeedProfession = '' + pj
          if (this.company.companyNeedId) {
            // 更新
            this.tableLoading = true
            this.putRequest('/company/basic/company', this.company).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                let data = resp.data
                _this.$message({type: data.status, message: data.msg})
                _this.dialogVisible = false
                _this.emptyCompanyData()
                _this.loadCompany()
              }
            })
          } else {
            // 添加
            this.tableLoading = true
            this.postRequest('/company/basic/company', this.company).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                let data = resp.data
                _this.$message({type: data.status, message: data.msg})
                _this.dialogVisible = false
                _this.emptyCompanyData()
                _this.loadCompany()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    cancelEidt () {
      this.dialogVisible = false
      this.emptyCompanyData()
    },
    initData () {
      let _this = this
      this.getRequest('/company/basic/basicdata').then(resp => {
        if (resp && resp.status === 200) {
          let data = resp.data
          _this.professions = data.professions
        }
      })
    },
    showEditCompanyView (row) {
      console.log(row)
      this.dialogTitle = '编辑企业信息'
      this.company = row
      this.companyNeedProfessionObject = JSON.parse(this.company.companyNeedProfession)
      // 前期模拟数据 后期关联 list集合 返回 [{ id: 1, name: 'xxx'}] 格式的数据
      /* let cs = row.industryCertificateCourse.split(',')
      let r = []
      for (let c of cs) {
        r.push({value: cs[c], label: _this.courses[c].name})
        console.log(cs[c])
        console.log(_this.courses[c].label)
      }
      this.cer.industryCertificateCourse = r */
      this.dialogVisible = true
    },
    showAddCompanyView () {
      this.dialogTitle = '添加企业信息'
      this.dialogVisible = true
      // var _this = this
      /* this.getRequest('/emp/basic/maxWorkID').then(resp => {
        if (resp && resp.status === 200) {
          _this.emp.workID = resp.data
        }
      }) */
    },
    emptyCompanyData () {
      this.company = {
        companyNeedJobName: '',
        companyNeedDescription: '',
        companyNeedType: '',
        companyNeedProfession: '',
        companyNeedName: '',
        companyNeedIntroduction: '',
        companyNeedRequirement: ''
      }
      this.companyNeedProfessionObject = []
    }
  }
}
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
