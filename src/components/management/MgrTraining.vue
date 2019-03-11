<template>
    <div class="table">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i> 培养目标和要求管理</el-breadcrumb-item>
          <el-breadcrumb-item>培养目标和要求管理</el-breadcrumb-item>
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
      <el-table-column prop="project_catalog_college" label="学校名称" width="200">
      </el-table-column>
      <el-table-column prop="project_catalog_majorName" label="专业名称" width="150">
      </el-table-column>
      <el-table-column prop="project_catalog_majorCode" label="专业代码" width="100">
      </el-table-column>
      <el-table-column prop="project_catalog_majorType" label="专业类别" width="160">
      </el-table-column>
      <el-table-column prop="project_catalog_mission" label="培养目标" width="flexColumnWidth(project_catalog_mission)" show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="project_content_mission_count" label="培养要求数量" width="120">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="edit(scope.row.project_catalog_id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.project_catalog_id)">删除</el-button>
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
        title="添加信息"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>学校名称</span>
          <el-input size="mini" style="width: 200px;" v-model="college" placeholder="请输入学校名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业名称</span>
          <el-input size="mini" style="width: 200px;" v-model="majorName" placeholder="请输入专业名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业代码</span>
          <el-input size="mini" style="width: 200px;" v-model="majorCode" placeholder="请输入专业代码..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业类别</span>
          <el-input size="mini" style="width: 200px;" v-model="majorType" placeholder="请输入专业类别..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>专业介绍</span>
          <el-input type="textarea" :rows="2" placeholder="请输入培养目标,不要超过300字" v-model="information" style="">
          </el-input>
        </div>
       <div>
       <el-form>
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :label="'培养要求' + (index+1)"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          style=""  >
          <el-input v-model="domain.value" style="" placeholder="请输入培养要求,不要超过300字"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain">新增培养要求</el-button>
        </el-form-item>
        </el-form>
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
      dynamicValidateForm: {
        domains: [{
          value: ''
        }]
      },
      id: '',
      college: '',
      majorName: '',
      majorType: '',
      majorCode: '',
      information: '',
      trainingRequires: [],
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
    flexColumnWidth (str) {
      let flexWidth = 0
      for (const char of str) {
        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 8
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          // 如果是中文字符，为字符分配20个单位宽度
          flexWidth += 20
        } else {
          // 其他种类字符，为字符分配5个单位宽度
          flexWidth += 5
        }
      }
      if (flexWidth < 50) {
        // 设置最小宽度
        flexWidth = 200
      }
      if (flexWidth > 250) {
        // 设置最大宽度
        flexWidth = 250
      }
      return flexWidth + 'px'
    },
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
        for (var j = 0; j < this.dynamicValidateForm.domains.length; j++) {
          this.trainingRequires[j] = this.dynamicValidateForm.domains[j].value
        }
        this.putRequest('/trainingProject/update', {
          title: this.majorName,
          majorType: this.majorType,
          majorCode: this.majorCode,
          information: this.information,
          college: this.college,
          id: this.id,
          missionCount: this.missionCount,
          trainingRequires: this.trainingRequires
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.majorName = ''
            this.majorType = ''
            this.majorCode = ''
            this.information = ''
            this.college = ''
            this.trainingRequires = ''
            this.id = ''
            this.$message({type: 'success', message: '修改成功!'})
            this.initList()
          }
        })
      }

      if ((this.id.length) === 0) {
        this.dialogVisible = false
        this.treeLoading = true

        for (var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
          this.trainingRequires[i] = this.dynamicValidateForm.domains[i].value
        }
        this.postRequest('/trainingProject/save', {
          title: this.majorName,
          majorType: this.majorType,
          majorCode: this.majorCode,
          information: this.information,
          college: this.college,
          trainingRequires: this.trainingRequires
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.majorName = ''
            this.majorType = ''
            this.majorCode = ''
            this.information = ''
            this.college = ''
            this.trainingRequires = ''
            this.$message({type: 'success', message: '添加成功!'})
            this.initList()
          }
        })
      }
    },
    del (id) {
      this.deleteRequest('/trainingProject/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      this.getRequest('/trainingProject/searchbyid/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.majorName = resp.data.result.title
          this.college = resp.data.result.college
          this.majorCode = resp.data.result.majorCode
          this.information = resp.data.result.information
          this.majorType = resp.data.result.majorType
          this.id = resp.data.result.id
          resp.data.result.trainingRequires = resp.data.result.trainingRequires.map(x => { return {value: x} })
          this.dynamicValidateForm.domains = resp.data.result.trainingRequires
          console.log(resp.data.result.trainingRequires)
          this.dialogVisible = true
          event.stopPropagation()
          this.initList()
        }
      })
    },
    initList (val = 1, title = '') {
      this.getRequest('/trainingProject/list?pageNum=' + val + '&title=' + title).then(resp => {
        if (resp && resp.data.status === 'ok') {
          this.pageInfo = resp.data.result
        }
      })
    },
    search () {
      this.initList(1, this.select_word)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
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
