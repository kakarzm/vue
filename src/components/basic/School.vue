<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 学校信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>培养方案</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="学校名称" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search" @click="search()">搜索</el-button>
      <el-button type="primary"   @click="showAddDepView(data, event)" >添加</el-button>
    </div>
    //展示信息专用，从数组pageInfo.list调出
    <el-table
      :data="pageInfo.list"
      :stripe="false"
      :show-header="true"
      :row-class-name="rowClass"
      @row-click="rowClick"
      style="width: 100%">
      <el-table-column prop="school_id" label="学校ID" width="250">
      </el-table-column>
      <el-table-column prop="school_code" label="学校代码" width="250">
      </el-table-column>
      <el-table-column prop="school_name" label="学校名称" width="250">
      </el-table-column>
      <el-table-column prop="school_english_name" label="学校英文名称" width="250">
      </el-table-column>
      <el-table-column prop="school_url" label="学校官方网站地址" width="250">
      </el-table-column>
      <el-table-column prop="school_info_id" label="学校信息ID" width="250">
      </el-table-column>
      <el-table-column prop="school_created_datatime" label="创建时间" width="250">
      </el-table-column>
      <el-table-column prop="school_updated_datatime" label="修改时间" width="250">
      </el-table-column>
      <el-table-column prop="school_info_email" label="学校官方信箱" width="250">
      </el-table-column>
      <el-table-column prop="school_info_email_code" label="学校邮政编码" width="250">
      </el-table-column>
      <el-table-column prop="school_info_address" label="学校地址" width="250">
      </el-table-column>
      <el-table-column prop="school_info_address_code" label="学校地址代码" width="250">
      </el-table-column>
      <el-table-column prop="school_info_organization_code" label="组织机构代码证号" width="250">
      </el-table-column>
      <el-table-column prop="school_status" label="状态 0/1" width="250">
      </el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small"
                     @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    //翻页专用
    <div class="pagination">
      <el-pagination
        @current-change="initList"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageInfo.total">
      </el-pagination>
    </div>
    //dialogVisible为真时出现，增加信息页面，把添加的信息放到对应的变量中。
    <div style="text-align: left">
      <el-dialog
        title="添加培养方案"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>学校ID</span>
          <el-input size="mini" style="width: 200px;" v-model="school_id" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校代码</span>
          <el-input size="mini" style="width: 200px;" v-model="school_code" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校名称</span>
          <el-input size="mini" style="width: 200px;" v-model="school_name" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校英文名称</span>
          <el-input size="mini" style="width: 200px;" v-model="school_english_name" placeholder="请输入......" ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校官方网站地址</span>
          <el-input size="mini" style="width: 200px;" v-model="school_url" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校信息ID</span>
          <el-input size="mini" style="width: 200px;" v-model="school_info_id" placeholder="请输入......" ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>创建时间</span>
          <el-input size="mini" style="width: 200px;" v-model="school_created_datatime" placeholder="请输入......" ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>修改时间</span>
          <el-input size="mini" style="width: 200px;" v-model="school_updated_datatime" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校官方信箱</span>
          <el-input size="mini" style="width: 200px;" v-model="school_info_email" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校邮政编码</span>
          <el-input size="mini" style="width: 200px;" v-model="school_info_email_code" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校地址</span>
          <el-input size="mini" style="width: 200px;" v-model="school_info_address" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学校地址代码</span>
          <el-input size="mini" style="width: 200px;" v-model="school_info_address_code" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>组织机构代码证号</span>
          <el-input size="mini" style="width: 200px;" v-model="school_info_organization_code" placeholder="请输入..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>状态 0/1</span>
          <el-input size="mini" style="width: 200px;" v-model="school_status" placeholder="请输入..." ></el-input>
        </div>
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
        // 展示的数值
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
      // planName: '',
      school_id: '',
      school_code: '',
      school_name: '',
      school_english_name: '',
      school_url: '',
      school_info_id: '',
      school_created_datatime: '',
      school_updated_datatime: '',
      school_info_email: '',
      school_info_email_code: '',
      school_info_address: '',
      school_info_address_code: '',
      school_info_organization_code: '',
      school_status: '',
      // majorName: '',
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
    showAddDepView (data, event) {
      this.dialogVisible = true
      // 点击添加按钮以后展示添加界面
      event.stopPropagation()
    },
    add () {
      this.dialogVisible = false
      this.treeLoading = true
      this.postRequest('/planbasic/save', {
        school_id: this.school_id,
        school_code: this.school_code,
        school_name: this.school_name,
        school_english_name: this.school_english_name,
        school_url: this.school_url,
        school_info_id: this.school_info_id,
        school_created_datatime: this.school_created_datatime,
        school_updated_datatime: this.school_updated_datatime,
        school_info_email: this.school_info_email,
        school_info_email_code: this.school_info_email_code,
        school_info_address: this.school_info_address,
        school_info_address_code: this.school_info_address_code,
        school_info_organization_code: this.school_info_organization_code,
        school_status: this.school_status
      }).then(resp => {
        this.treeLoading = false
        if (resp && resp.status === 200) {
          // 让原信息清空
          // this.planName = ''
          // this.schoolName = ''
          // this.majorName = ''
          this.school_id = ''
          this.school_code = ''
          this.school_name = ''
          this.school_english_name = ''
          this.school_url = ''
          this.school_info_id = ''
          this.school_created_datatime = ''
          this.school_updated_datatime = ''
          this.school_status = ''
          this.school_info_email = ''
          this.school_info_email_code = ''
          this.school_info_address = ''
          this.school_info_address_code = ''
          this.school_info_organization_code = ''
          this.$message({type: 'success', message: '添加成功!'})
          this.initList()
        }
      })
    },
    del (id) {
      this.deleteRequest('/planbasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      alert(id)
    },
    // 这才是真正的搜索方法，搜索的结果给了pageInfo，pageInfo里有很多信息，包括list
    // 把搜索的结果展示在el-table
    initList (val = 1, title = '') {
      this.getRequest('/planbasic/list?pageNum=' + val + '&title=' + title).then(resp => {
        if (resp && resp.data.status === 'ok') {
          // alert(JSON.stringify(resp.data))
          this.pageInfo = resp.data.result
        }
      })
    },
    // 搜索方法
    search () {
      this.initList(1, this.select_word)
      // 给这个函数一个1，还有写在表单里的搜索关键词
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
