<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过xxxx,记得回车哦..."
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
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="openSaveView" :disabled="addButtonDisabled">
            添加目标
          </el-button>
        </div>
      </el-header>
      <el-main>
        <div>
          <el-table
            :data="planTrainingtargets"
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
                <el-form label-position="left" class="demo-table-expand">
                  <el-form-item v-for="(item,index) in props.row.targetRequires" :key="index" :label="'要求' + (index + 1) + ':'">
                    <span style="font-style: italic;font-family: 楷体;color: gray">{{ item.context }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="trainingplan.name"
              align="left"
              label="培养方案名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="target"
              align="left"
              show-overflow-tooltip="true"
              label="培养目标"
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
      <el-form :model="planTrainingtarget" size="mini" label-width="80px" :rules="rules" ref="addEntityForm">
        <el-row :gutter="10">
         <el-col :span="8">
           <el-row :gutter="20">
             <el-col :span="20">
               <el-form-item label="培养方案" prop="name">
                 <el-select v-model="planTrainingtarget.planId" placeholder="请选择培养方案">
                   <el-option
                     v-for="item in trainingplans"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
                   </el-option>
                 </el-select>
               </el-form-item>
             </el-col>
           </el-row>
           <el-row :gutter="20">
             <el-col :span="24">
               <el-form-item label="培养目标" prop="limitYear">
                 <el-input type="textarea" rows="6" v-model="planTrainingtarget.target" prefix-icon="el-icon-edit" placeholder="培养目标"></el-input>
               </el-form-item>
             </el-col>
           </el-row>
         </el-col>
         <el-col :span="16">
           <el-row :gutter="20">
            <el-col :span="4">
              <el-button type="primary" size="mini" icon="el-icon-plus" circle @click="addRequire" style="margin-right: 15px"></el-button>
            </el-col>
             <el-col :span="4">
               <span style="font-weight: bolder">新增要求</span>
             </el-col>
           </el-row>
           <el-row :gutter="20">
             <el-col :span="12" v-for="(r, index) in planTrainingtarget.targetRequires" :key="index">
               <el-row :gutter="20">
                <el-col :span="20">
                  <el-form-item :label="'要求' + (index+1)" :prop="'targetRequires.' + index + '.context'" :rules="{required: true, message: '需求不能为空', trigger: 'blur'}">
                    <el-input type="text" v-model="r.context" prefix-icon="el-icon-edit"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1">
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle @click.prevent="removeRequire(r)"></el-button>
                </el-col>
               </el-row>
               </el-col>
           </el-row>
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
  name: 'PlanTrainingtarget',
  data () {
    return {
      advanceSearchViewVisible: false,
      dialogFormVisible: false,
      popoverUploadVisible: false,
      addButtonDisabled: false,
      loading: false,
      dialogTitle: '',
      pageSize: 1,
      pageNumber: 10,
      total: 10,
      multipleSelection: [],
      keyword: '',
      trainingplans: [],
      planTrainingtarget: {
        planId: '',
        target: '',
        targetRequires: [
          {context: ''}
        ]
      },
      planTrainingtargets: [],
      rules: {
        planId: [{required: true, message: '必填:培养方案', trigger: 'blur'}],
        target: [{required: true, message: '必填:培养目标', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.loadTable()
    this.initTrainingplan()
  },
  computed: {
    selectionChange () {
      return this.multipleSelection.length === 0
    }
  },
  methods: {
    initTrainingplan () {
      let _this = this
      this.getRequest('/ptt/load/tp').then(resp => {
        if (resp && resp.status === 200) {
          _this.trainingplans = resp.data.list
        }
        if (this.trainingplans.length === 0) {
          this.addButtonDisabled = true
        } else {
          this.addButtonDisabled = false
        }
      })
    },
    loadTable () {
      let _this = this
      this.loading = true
      this.getRequest('/ptt/list?keyword=' + this.keyword + '&pageSize=' + this.pageSize + '&pageNumber=' + this.pageNumber).then(resp => {
        if (resp && resp.status === 200) {
          _this.planTrainingtargets = resp.data.list
          _this.total = resp.data.total
        }
        this.loading = false
        this.initTrainingplan()
      })
    },
    searchEntity () {
      this.pageSize = 1
      this.loadTable()
    },
    openSaveView () {
      this.dialogTitle = '添加培养目标'
      this.dialogFormVisible = true
    },
    openUpdateView (item) {
      this.dialogTitle = '编辑培养目标'
      this.planTrainingtarget = {
        id: item.id,
        planId: item.planId,
        target: item.target,
        targetRequires: item.targetRequires
      }
      this.dialogFormVisible = true
    },
    saveOrUpdate (formName) {
      this.keyword = ''
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this
          if (this.planTrainingtarget.id) {
            this.axios.put('/ptt/entity', this.planTrainingtarget).then(resp => {
              if (resp && resp.status === 200) {
                this.$message({type: resp.data.status, message: resp.data.msg})
                _this.closeSaveOrUpdateView()
                _this.loadTable()
              }
            })
          } else {
            this.axios.post('/ptt/entity', this.planTrainingtarget).then(resp => {
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
      this.$confirm('此操作将删除该培养方案, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.putRequest('/ptt/statue/' + item.id).then(resp => {
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
      this.dialogFormVisible = false
    },
    emptyEntity () {
      this.planTrainingtarget = {}
      this.planTrainingtarget = {
        planId: '',
        target: '',
        targetRequires: [
          {context: ''}
        ]
      }
    },
    addRequire () {
      this.planTrainingtarget.targetRequires.push({
        context: ''
      })
    },
    removeRequire (item) {
      let index = this.planTrainingtarget.targetRequires.indexOf(item)
      if (index !== -1) {
        this.planTrainingtarget.targetRequires.splice(index, 1)
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
  .demo-table-expand{
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px ;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 60%;
  }
</style>
