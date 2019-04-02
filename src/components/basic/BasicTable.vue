<template>
  <div>
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过{xxx}搜索xxx,记得回车哦..."
            clearable
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="false"
            prefix-icon="el-icon-search">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search">搜索
          </el-button>
          <el-button slot="reference" type="primary" @click="advanceSearchViewVisible = true" size="mini" style="margin-left: 5px">
            <i class="fa fa-lg" style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>

        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <el-button type="success" size="mini"><i class="fa fa-lg fa-level-down" style="margin-right: 5px"></i>导出数据
          </el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogFormVisible = true">
            添加员工
          </el-button>
        </div>
      </el-header>
      <el-main>
        <div>
          <transition name="el-zoom-in-top">
            <div v-show="advanceSearchViewVisible" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);margin: 5px">
              <el-form ref="form" :model="form" label-width="80px">
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <el-form-item label="活动名称">
                       <el-input v-model="form.name" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动年龄">
                        <el-input v-model="form.age" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动性别">
                        <el-input v-model="form.gender" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动邮箱">
                        <el-input v-model="form.email" size="mini"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <el-form-item label="活动区域">
                        <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动区域">
                        <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动区域">
                        <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动区域">
                        <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动区域">
                        <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="活动区域">
                        <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                   <el-col :span="12">
                     <el-form-item label="活动性质">
                       <el-checkbox-group v-model="form.likes">
                         <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                         <el-checkbox label="地推活动" name="type"></el-checkbox>
                         <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                         <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                       </el-checkbox-group>
                     </el-form-item>
                   </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="7">
                      <el-form-item label="特殊资源">
                        <el-radio-group v-model="form.email">
                          <el-radio label="线上品牌商赞助"></el-radio>
                          <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="活动时间">
                        <el-col :span="11">
                          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" size="mini"
                                          style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" size="mini"
                                          style="width: 100%;"></el-time-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                   <el-col :span="8">
                     <el-form-item label="即时配送">
                       <el-switch v-model="form.delivery"></el-switch>
                     </el-form-item>
                   </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="活动形式">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="mini" icon="el-icon-delete" @click="advanceSearchViewVisible = false">取消</el-button>
                        <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
                    </el-col>
                  </el-row>
              </el-form>
            </div>
          </transition>
          <el-table
            :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
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
              prop="date"
              align="left"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              align="left"
              label="地址">
            </el-table-column>
            <el-table-column
              label="操作"
              fixed="right">
              <template>
                <el-button size="mini" icon="el-icon-edit">编辑</el-button>
                <el-button type="primary" size="mini">查看详细信息</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
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
    <el-dialog width="66%" :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" size="mini">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动名称" size="mini">
              <el-input v-model="form.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-form-item label="活动区域">
              <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="活动区域">
              <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="活动区域">
              <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="活动区域">
              <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="活动区域">
              <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="活动区域">
              <el-select v-model="form.address" placeholder="请选择活动区域" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.likes">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.email">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" size="mini"
                                style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" size="mini"
                                style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button size="mini" icon="el-icon-delete" @click="advanceSearchViewVisible = false">取消</el-button>
            <el-button type="primary" size="mini" icon="el-icon-search">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BasicTable',
  data () {
    return {
      advanceSearchViewVisible: false,
      dialogFormVisible: false,
      loading: false,
      dialogTitle: '',
      pageSize: 1,
      pageNumber: 10,
      total: 10,
      multipleSelection: [],
      form: {
        name: '',
        age: '',
        gender: '',
        address: '',
        email: '',
        phone: '',
        likes: []
      }
    }
  },
  created () {
  },
  computed: {
    selectionChange () {
      return this.multipleSelection.length === 0
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
    margin-bottom: 0;
  }
</style>
