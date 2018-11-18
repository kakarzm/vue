<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><i class="el-icon-menu"></i> 操作员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px">
      <el-table
        v-loading="loading"
        :data="posData"
        size="mini"
        stripe
        border
        @selection-change="handleSelectionChange"
        style="width: 80%">
        <el-table-column type="selection" width="55" align="left">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="left">
        </el-table-column>
        <el-table-column prop="name" label="职位名称" width="180" align="left">
        </el-table-column>
        <el-table-column width="180" label="创建时间" align="left">
          <template slot-scope="scope">{{ scope.row.createDate | formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function () {
    this.loadTableData()
  },
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  methods: {
    loadTableData () {
      this.loading = true
      this.getRequest('/system/basic/positions').then(resp => {
        this.loading = false
        if (resp && resp.status === 200) {
          this.tableData = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
