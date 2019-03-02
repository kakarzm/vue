<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过行业证书名搜索行业证书,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchCer"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchCer">搜索
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
                     @click="showAddCerView">
            添加员工
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible">
              <el-row>
                <el-col :span="5">
                  <el-select v-model="cer.industryCertificateOrganization" style="width: 200px" size="mini" placeholder="颁发机构">
                    <el-option
                      v-for="item in organizations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="cer.industryCertificateDept" style="width: 200px" size="mini" placeholder="关联系别">
                    <el-option
                      v-for="item in depts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-select v-model="cer.industryCertificateProfession" style="width: 200px" size="mini" placeholder="适用专业">
                    <el-option
                      v-for="item in professions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select v-model="cer.industryCertificateAuthenticationType" style="width: 200px" size="mini" placeholder="认证种类">
                    <el-option
                      v-for="item in authenticationTypes"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="7">
                  <el-select v-model="cer.industryCertificateIdentificationSite" style="width: 200px" size="mini" placeholder="认证方式">
                    <el-option
                      v-for="item in identificationSites"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="5" :offset="4">
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchCer">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </transition>
          <el-table
            :data="cers"
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
              prop="industryCertificateName"
              align="left"
              fixed
              label="证书名称"
              width="90">
            </el-table-column>
            <el-table-column
              prop="industryCertificateSign"
              width="85"
              align="left"
              label="报名要求">
            </el-table-column>
            <el-table-column
              prop="industryCertificateDept"
              label="系别"
              width="100">
            </el-table-column>
            <el-table-column
              prop="industryCertificateProfession"
              width="150"
              align="left"
              label="对应专业">
            </el-table-column>
            <el-table-column
              prop="industryCertificateAuthenticationType"
              width="70"
              label="认证种类">
            </el-table-column>
            <el-table-column
              prop="industryCertificateModule"
              width="70"
              label="等级模块">
            </el-table-column>
            <el-table-column
              prop="industryCertificateIdentificationSite"
              width="80"
              label="认证方式">
            </el-table-column>
            <el-table-column
              prop="industryCertificateOrganization"
              width="80"
              label="组织机构">
            </el-table-column>
            <el-table-column
              prop="industryCertificateUrl"
              width="180"
              label="官方网站">
              <template slot-scope="scope">
                <a target="_blank" :href="scope.row.industryCertificateUrl" style="margin-left: 10px">{{ scope.row.industryCertificateUrl }}</a>
              </template>
            </el-table-column>
            <el-table-column
              width="100"
              align="left"
              label="创建时间">
              <template slot-scope="scope">{{ scope.row.industryCertificateCreated | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="industryCertificateUpdated"
              align="left"
              width="100"
              label="更新时间">
              <template slot-scope="scope">{{ scope.row.industryCertificateCreated | formatDate}}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="195">
              <template slot-scope="scope">
                <el-button @click="showEditCerView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="mini">编辑
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary"
                           size="mini">查看高级资料
                </el-button>
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="mini"
                           @click="deleteCer(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="cers.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyCers">批量删除
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
    <el-form :model="cer" :rules="rules" ref="addCerForm" style="margin: 0px;padding: 0px;">
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
                <el-form-item label="证书名称:" prop="industryCertificateName">
                  <el-input prefix-icon="el-icon-edit" v-model="cer.industryCertificateName" size="mini" style="width: 150px"
                            placeholder="请输入证书名称"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="颁发机构:" prop="industryCertificateOrganization">
                  <el-select v-model="cer.industryCertificateOrganization" style="width: 200px" size="mini" placeholder="颁发机构">
                    <el-option
                      v-for="item in organizations"
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
                <el-form-item label="报名要求:" prop="industryCertificateSign">
                  <el-input prefix-icon="el-icon-edit" v-model="cer.industryCertificateSign" size="mini" style="width: 150px"
                            placeholder="请输入报名要求"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="系别:" prop="industryCertificateDept">
                  <el-select v-model="cer.industryCertificateDept" style="width: 200px" size="mini" placeholder="政治面貌">
                    <el-option
                      v-for="item in depts"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="适用专业:" prop="industryCertificateProfession">
                  <el-select v-model="cer.industryCertificateProfession" style="width: 200px" size="mini" placeholder="适用专业">
                    <el-option
                      v-for="item in professions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="认证种类:" prop="industryCertificateAuthenticationType">
                  <el-select v-model="cer.industryCertificateAuthenticationType" style="width: 200px" size="mini" placeholder="认证种类">
                    <el-option
                      v-for="item in authenticationTypes"
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
                <el-form-item label="等级模块:" prop="industryCertificateModule">
                  <el-input prefix-icon="el-icon-edit" v-model="cer.industryCertificateModule" size="mini" style="width: 150px"
                            placeholder="请输入等级模块"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <el-form-item label="认证方式:" prop="industryCertificateIdentificationSite">
                  <el-select v-model="cer.industryCertificateIdentificationSite" style="width: 200px" size="mini" placeholder="政治面貌">
                    <el-option
                      v-for="item in identificationSites"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="官方网站:" prop="industryCertificateUrl">
                  <el-input prefix-icon="el-icon-edit" v-model="cer.industryCertificateUrl" size="mini" style="width: 150px"
                            placeholder="请输入官方网站"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <el-form-item label="关联课程:" prop="industryCertificateCourse">
                  <el-select v-model="cer.industryCertificateCourse" style="width: 300px"  size="mini" multiple placeholder="请选择">
                    <el-option
                      v-for="item in courses"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelEidt">取 消</el-button>
            <el-button size="mini" type="primary" @click="addCertificate('addCerForm')">确 定</el-button>
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
      cers: [],
      keywords: '',
      fileUploadBtnText: '导入数据',
      faangledoubleup: 'fa-angle-double-up',
      faangledoubledown: 'fa-angle-double-down',
      dialogTitle: '',
      multipleSelection: [],
      depTextColor: '#c0c4cc',
      totalCount: -1,
      currentPage: 1,
      dialogVisible: false,
      tableLoading: false,
      advanceSearchViewVisible: false,
      showOrHidePop: false,
      showOrHidePop2: false,
      courses: [{id: 1, name: 'java程序设计'}, {id: 2, name: '数据库原理'}, {id: 3, name: '数据分析'}],
      depts: [{id: 1, name: '系别1'}, {id: 2, name: '系别2'}, {id: 3, name: '系别3'}],
      professions: [{id: 1, name: '信息管理与信息系统1'}, {id: 2, name: '信息管理与信息系统2'}],
      authenticationTypes: [{id: 1, name: '计算机类'}, {id: 2, name: '数据分析类'}],
      identificationSites: [{id: 1, name: '校外'}, {id: 2, name: '考试中心'}],
      organizations: [{id: 1, name: '教育部'}, {id: 2, name: '工业信息化部'}],
      cer: {
        industryCertificateName: '',
        industryCertificateCourse: '',
        industryCertificateSign: '',
        industryCertificateDept: '',
        industryCertificateProfession: '',
        industryCertificateAuthenticationType: '',
        industryCertificateModule: '',
        industryCertificateIdentificationSite: '',
        industryCertificateOrganization: '',
        industryCertificateUrl: ''
      },
      rules: {
        industryCertificateName: [{required: true, message: '必填:证书名称', trigger: 'blur'}],
        industryCertificateCourse: [{required: true, message: '必填:关联课程', trigger: 'blur'}],
        industryCertificateSign: [{required: true, message: '必填:报名要求', trigger: 'blur'}],
        industryCertificateDept: [{required: true, message: '必填:关联系别', trigger: 'blur'}],
        industryCertificateProfession: [{required: true, message: '必填:关联专业', trigger: 'blur'}],
        industryCertificateAuthenticationType: [{required: true, message: '必填:认证种类', trigger: 'blur'}],
        industryCertificateModule: [{required: true, message: '必填:等级模块', trigger: 'blur'}],
        industryCertificateIdentificationSite: [{required: true, message: '必填:认证方式', trigger: 'blur'}],
        industryCertificateOrganization: [{required: true, message: '必填:电话号码', trigger: 'blur'}],
        industryCertificateUrl: [{
          required: true,
          message: '必填:官方网址',
          trigger: 'blur'
        }, {
          pattern: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/,
          message: '网址格式不正确',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted: function () {
    this.initData()
    this.loadCers()
  },
  methods: {
    /*  fileUploadSuccess (response, file, fileList) {
      if (response) {
        this.$message({type: response.status, message: response.msg})
      }
      this.loadCers()
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
    cancelSearch () {
      this.advanceSearchViewVisible = false
      this.emptyCerData()
      this.beginDateScope = ''
      this.loadCers()
    },
    showAdvanceSearchView () {
      this.advanceSearchViewVisible = !this.advanceSearchViewVisible
      this.keywords = ''
      if (!this.advanceSearchViewVisible) {
        this.emptyCerData()
        this.beginDateScope = ''
        this.loadCers()
      }
    },
    handleSelectionChange (val) {
      console.log(val)
      this.multipleSelection = val
    },
    deleteManyCers () {
      this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = ''
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids += this.multipleSelection[i].industryCertificateId + ','
        }
        this.doDelete(ids)
      }).catch(() => {
      })
    },
    deleteCer (row) {
      this.$confirm('此操作将永久删除[' + row.industryCertificateName + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(row.industryCertificateId)
      }).catch(() => {
      })
    },
    doDelete (ids) {
      this.tableLoading = true
      var _this = this
      this.deleteRequest('/certificate/basic/certificate/' + ids).then(resp => {
        _this.tableLoading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({type: data.status, message: data.msg})
          _this.loadCers()
        }
      })
    },
    keywordsChange (val) {
      if (val === '') {
        this.loadCers()
      }
    },
    searchCer () {
      this.loadCers()
    },
    currentChange (currentChange) {
      this.currentPage = currentChange
      this.loadCers()
    },
    loadCers () {
      var _this = this
      this.tableLoading = true
      this.getRequest('/certificate/basic/certificate?page=' + this.currentPage + '&size=2&keywords=' + this.keywords + '&industryCertificateOrganization=' + this.cer.industryCertificateOrganization + '&industryCertificateDept=' + this.cer.industryCertificateDept + '&industryCertificateProfession=' + this.cer.industryCertificateProfession + '&industryCertificateAuthenticationType=' + this.cer.industryCertificateAuthenticationType + '&industryCertificateIdentificationSite=' + this.cer.industryCertificateIdentificationSite).then(resp => {
        this.tableLoading = false
        if (resp && resp.status === 200) {
          let data = resp.data
          _this.cers = data.cers
          _this.totalCount = data.count
          // _this.emptyCerData()
        }
      })
    },
    addCertificate (formName) {
      var _this = this
      console.log('执行到这了')
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.cer.industryCertificateId)
          if (this.cer.industryCertificateId) {
            // 更新
            console.log('执行到这了2')
            this.tableLoading = true
            this.putRequest('/certificate/basic/certificate', this.cer).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                let data = resp.data
                _this.$message({type: data.status, message: data.msg})
                _this.dialogVisible = false
                _this.emptyCerData()
                _this.loadCers()
              }
            })
          } else {
            // 添加
            this.tableLoading = true
            this.postRequest('/certificate/basic/certificate', this.cer).then(resp => {
              _this.tableLoading = false
              if (resp && resp.status === 200) {
                let data = resp.data
                _this.$message({type: data.status, message: data.msg})
                _this.dialogVisible = false
                _this.emptyCerData()
                _this.loadCers()
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
      this.emptyCerData()
    },
    initData () {
      // let _this = this
      /*  this.getRequest('/emp/basic/basicdata').then(resp => {
        if (resp && resp.status === 200) {
          let data = resp.data
          _this.nations = data.nations
          _this.politics = data.politics
          _this.deps = data.deps
          _this.positions = data.positions
          _this.joblevels = data.joblevels
          _this.emp.workID = data.workID
        }
      }) */
    },
    showEditCerView (row) {
      console.log(row)
      this.dialogTitle = '编辑证书'
      this.cer = row
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
    showAddCerView () {
      this.dialogTitle = '添加证书'
      this.dialogVisible = true
      // var _this = this
      /* this.getRequest('/emp/basic/maxWorkID').then(resp => {
        if (resp && resp.status === 200) {
          _this.emp.workID = resp.data
        }
      }) */
    },
    emptyCerData () {
      this.cer = {
        industryCertificateName: '',
        industryCertificateCourse: '',
        industryCertificateSign: '',
        industryCertificateDept: '',
        industryCertificateProfession: '',
        industryCertificateAuthenticationType: '',
        industryCertificateModule: '',
        industryCertificateIdentificationSite: '',
        industryCertificateOrganization: '',
        industryCertificateUrl: ''
      }
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
