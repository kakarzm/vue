<template>
  <div>
    <div style="text-align: left">
      <el-input
        placeholder="添加职位..."
        size="mini"
        @keyup.enter.native="addPosition"
        style="width: 300px;"
        prefix-icon="el-icon-plus"
        v-model="positionName">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="addPosition">添加</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-table
        v-loading="loading"
        :data="posData"
        size="mini"
        stripe
        border
        @selection-change="handleSelectionChange"
        style="width: 80%">
        <el-table-column
          type="selection"
          width="55"
          align="left">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="80"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="职位名称"
          width="180"
          align="left">
        </el-table-column>
        <el-table-column
          width="180"
          label="创建时间"
          align="left">
          <template slot-scope="scope">{{ scope.row.createDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align: left;margin-top: 10px">
      <el-button type="danger" size="mini" v-if="posData.length>0" :disabled="multipleSelection.length==0"
                 @click="deleteMany">批量删除
      </el-button>
    </div>
    <div style="text-align: left">
      <el-dialog
        title="编辑职位名称"
        :visible.sync="dialogVisible"
        width="25%">
        <el-input v-model="updatePosName" size="mini" placeholder="请输入新的职位名称..."></el-input>
        <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" size="mini" @click="updatePosNameExec">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default{
  mounted: function () {
    this.loadTableData()
  },
  methods: {
    updatePosNameExec () {
      if (!this.isNotNullORBlank(this.updatePosName)) {
        this.$message.warning('职位名称不能为空!')
        return
      }
      this.loading = true
      this.putRequest('/system/basic/position', {name: this.updatePosName, id: this.updatePosId, titleLevel: this.updateTitleLevel}).then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          this.dialogVisible = false
          let data = resp.data
          this.$message({type: data.status, message: data.msg})
          this.loadTableData()
        }
      })
    },
    deleteMany () {
      this.$confirm('删除' + this.multipleSelection.length + '条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let multipleSelection = this.multipleSelection
        let ids = ''
        multipleSelection.forEach(row => {
          ids = ids + row.id + ','
        })
        this.doDelete(ids)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addPosition () {
      if (!this.isNotNullORBlank(this.positionName)) {
        this.$message.warning('职位名称不能为空!')
        return
      }
      this.loading = true
      this.postRequest('/system/basic/position', {
        name: this.positionName,
        titleLevel: this.titleLevel
      }).then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          let data = resp.data
          this.$message({type: data.status, message: data.msg})
          this.loadTableData()
          this.positionName = ''
          this.titleLevel = ''
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleEdit (index, row) {
      this.updatePosName = row.name
      this.updatePosId = row.id
      this.updateTitleLevel = row.titleLevel
      this.dialogVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('删除[' + row.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.doDelete(row.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    doDelete (ids) {
      this.loading = true
      let url = '/system/basic/position/'
      this.deleteRequest(url + ids).then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          this.loadTableData()
        }
      })
    },
    loadTableData () {
      this.loading = true
      this.getRequest('/system/basic/positions').then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          this.posData = resp.data
        }
      })
    }
  },
  data () {
    return {
      positionName: '',
      updatePosName: '',
      updateTitleLevel: '',
      titleLevel: '',
      updatePosId: -1,
      loading: false,
      dialogVisible: false,
      multipleSelection: [],
      type: [],
      titleLevels: ['正高级', '副高级', '中级', '初级', '员级'],
      nameLabelName: '职位名称',
      posData: []
    }
  }
}
</script>
