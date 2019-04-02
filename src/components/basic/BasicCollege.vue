<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>学校管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="学校名称" class="handle-input mr10"></el-input>
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
      <el-table-column prop="title" label="学校名称" width="150">
      </el-table-column>
      <el-table-column prop="twocenturysch" label="211" width="150">
      </el-table-column>
      <el-table-column prop="nineschool" label="985" width="150">
      </el-table-column>
      <el-table-column prop="country" label="国家" width="150">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="150">
      </el-table-column>
      <el-table-column prop="city" label="城市" width="150">
      </el-table-column>
      <el-table-column prop="region" label="地区" width="150">
      </el-table-column>
      <el-table-column prop="provinceschool" label="省属高校" width="150">
      </el-table-column>
      <el-table-column prop="regionschool" label="地市高校" width="150">
      </el-table-column>
      <el-table-column prop="stateschool" label="公立学校" width="150">
      </el-table-column>
      <el-table-column prop="privateschool" label="私立学校" width="150">
      </el-table-column>
      <el-table-column prop="addtime" label="发布时间" width="150">
      </el-table-column>
      <el-table-column prop="webtime" label="网页时间" width="150">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope" fixed="right">
          <el-button size="small"
                     @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.id)">删除</el-button>
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
        title="添加学校信息"
        :visible.sync="dialogVisible"
        width="50%">
        <div style="margin-top: 10px">
          <span id="collegename">学校名称</span>
          <el-input style="width: 200px;" v-model="collegeName" placeholder="请输入名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>211高校</span>
          <el-select v-model="is211" placeholder="请选择...">
            <el-option
              v-for="item in collegeform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>985高校</span>
          <el-select v-model="is985" placeholder="请选择...">
            <el-option
              v-for="item in collegeform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 27px">国家</span>
          <el-select v-model="country" placeholder="请选择...">
            <el-option
              v-for="item in countryform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 2px">学校地址</span>
          <el-cascader
            :options="options"
            v-model="regionform"
           ></el-cascader>
        </div>
        <div style="margin-top: 10px">
          <span>省属高校</span>
          <el-select v-model="isprovinceschool" placeholder="请选择...">
            <el-option
              v-for="item in collegeform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>地市高校</span>
          <el-select v-model="isregionschool" placeholder="请选择...">
            <el-option
              v-for="item in collegeform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>公立学校</span>
          <el-select v-model="isstateschool" placeholder="请选择...">
            <el-option
              v-for="item in collegeform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>私立学校</span>
          <el-select v-model="privateschool" placeholder="请选择...">
            <el-option
              v-for="item in collegeform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>发布时间</span>
          <el-date-picker v-model="addtime" type="date" placeholder="请选择日期"></el-date-picker>
        </div>
        <div style="margin-top: 10px">
          <span>网页时间</span>
          <el-date-picker v-model="webtime" type="date" placeholder="请选择日期"></el-date-picker>
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
  data: function () {
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
      collegeform: [
        {
          value: true,
          label: '是'
        }, {
          value: false,
          label: '否'
        }
      ],
      countryform: [
        {
          value: 'china',
          label: '中国'
        }, {
          value: 'America',
          label: '美国'
        }
      ],
      options: [
        {
          value: '山东',
          label: '山东',
          children: [
            {
              value: '济南',
              label: '济南',
              children: [
                {
                  value: '历城区',
                  label: '历城区'
                },
                {
                  value: '历下区',
                  label: '历下区'
                },
                {
                  value: '长清区',
                  label: '长清区'
                },
                {
                  value: '章丘区',
                  label: '章丘区'
                },
                {
                  value: '市中区',
                  label: '市中区'
                },
                {
                  value: '高新区',
                  label: '高新区'
                }
              ]
            },
            {
              value: '烟台',
              label: '烟台'
            },
            {
              value: '威海',
              label: '威海'
            },
            {
              value: '日照',
              label: '日照'
            },
            {
              value: '东营',
              label: '东营'
            },
            {
              value: '潍坊',
              label: '潍坊'
            },
            {
              value: '滨州',
              label: '滨州'
            },
            {
              value: '淄博',
              label: '淄博'
            },
            {
              value: '泰安',
              label: '泰安'
            },
            {
              value: '莱芜',
              label: '莱芜'
            },
            {
              value: '临沂',
              label: '临沂'
            },
            {
              value: '菏泽',
              label: '菏泽'
            },
            {
              value: '济宁',
              label: '济宁'
            },
            {
              value: '聊城',
              label: '聊城'
            },
            {
              value: '德州',
              label: '德州'
            },
            {
              value: '枣庄',
              label: '枣庄',
              children: [
                {
                  value: '市中区',
                  label: '市中区'
                },
                {
                  value: '薛城区',
                  label: '薛城区'
                },
                {
                  value: '台儿庄区',
                  label: '台儿庄区'
                },
                {
                  value: '峄城区',
                  label: '峄城区'
                },
                {
                  value: '山亭区',
                  label: '山亭区'
                },
                {
                  value: '滕州市',
                  label: '滕州市'
                }
              ]
            }
          ]
        },
        {
          value: '北京',
          label: '北京',
          children: [
            {
              value: '北京市',
              label: '北京市',
              children: [
                {
                  value: '海淀区',
                  label: '海淀区'
                },
                {
                  value: '朝阳区',
                  label: '朝阳区'
                },
                {
                  value: '西城区',
                  label: '西城区'
                },
                {
                  value: '昌平区',
                  label: '昌平区'
                }
              ]
            }
          ]
        },
        {
          value: '天津',
          label: '天津',
          children: [
            {
              value: '天津市',
              label: '天津市',
              children: [
                {
                  value: '南开区',
                  label: '南开区'
                },
                {
                  value: '和平区',
                  label: '和平区'
                },
                {
                  value: '北辰区',
                  label: '北辰区'
                }
              ]
            }
          ]
        },
        {
          value: '辽宁省',
          label: '辽宁省'
        },
        {
          value: '吉林省',
          label: '吉林省'
        },
        {
          value: '黑龙江省',
          label: '黑龙江省'
        },
        {
          value: '上海',
          label: '上海'
        },
        {
          value: '江苏省',
          label: '江苏省'
        },
        {
          value: '浙江省',
          label: '浙江省'
        },
        {
          value: '安徽省',
          label: '安徽省'
        },
        {
          value: '福建省',
          label: '福建省'
        },
        {
          value: '湖北省',
          label: '湖北省'
        },
        {
          value: '湖南省',
          label: '湖南省'
        },
        {
          value: '重庆',
          label: '重庆'
        },
        {
          value: '陕西省',
          label: '陕西省'
        },
        {
          value: '山西省',
          label: '山西省'
        },
        {
          value: '甘肃省',
          label: '甘肃省'
        },
        {
          value: '广东省',
          label: '广东省'
        },
        {
          value: '四川省',
          label: '四川省'
        },
        {
          value: '内蒙古藏族自治区',
          label: '内蒙古藏族自治区'
        },
        {
          value: '江西省',
          label: '江西省'
        },
        {
          value: '河南省',
          label: '河南省'
        },
        {
          value: '贵州省',
          label: '贵州省'
        },
        {
          value: '云南省',
          label: '云南省'
        },
        {
          value: '西藏自治区',
          label: '西藏自治区'
        },
        {
          value: '青海省',
          label: '青海省'
        },
        {
          value: '宁夏回族自治区',
          label: '宁夏回族自治区'
        },
        {
          value: '新疆维族自治区',
          label: '新疆维族自治区'
        },
        {
          value: '广西壮族自治区',
          label: '广西壮族自治区'
        },
        {
          value: '海南省',
          label: '海南省'
        }
      ],
      collegeName: '',
      is211: null,
      is985: null,
      country: '',
      regionform: [],
      isprovinceschool: null,
      isregionschool: null,
      isstateschool: null,
      privateschool: null,
      addtime: null,
      webtime: null,
      id: '',
      Address: '',
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
        this.putRequest('/collegebasic/update', {
          id: this.id
          // title: this.collegeName,
          // Address: this.Address
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.collegeName = ''
            this.is211 = null
            this.is985 = null
            this.country = ''
            this.regionform = []
            this.isprovinceschool = null
            this.isregionschool = null
            this.isstateschool = null
            this.privateschool = null
            this.addtime = null
            this.webtime = null
            // 数据清空
            this.$message({type: 'success', message: '修改成功!'})
            this.initList()
          }
        })
      }

      if ((this.id.length) === 0) {
        this.dialogVisible = false
        this.treeLoading = true
        this.postRequest('/collegebasic/save', {
          // 收集数据
          collegeName: this.collegeName,
          is211: this.is211,
          is985: this.is985,
          country: this.country,
          regionform: this.regionform,
          isprovinceschool: this.isprovinceschool,
          isregionschool: this.isregionschool,
          isstateschool: this.isstateschool,
          privateschool: this.privateschool,
          addtime: this.addtime,
          webtime: this.webtime
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.collegeName = ''
            this.is211 = null
            this.is985 = null
            this.country = ''
            this.regionform = []
            this.isprovinceschool = null
            this.isregionschool = null
            this.isstateschool = null
            this.privateschool = null
            this.addtime = null
            this.webtime = null
            this.$message({type: 'success', message: '添加成功!'})
            this.initList()
          }
        })
      }
    },
    del (id) {
      this.deleteRequest('/collegebasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      this.getRequest('/collegebasic/searchbyid/' + id).then(resp => {
        // console.log(resp)
        if (resp && resp.status === 200) {
          // this.collegeName = resp.data.result.title
          // this.Address = resp.data.result.address
          // 给id赋值
          this.id = resp.data.result.id
          this.dialogVisible = true
          event.stopPropagation()
          this.initList()
        }
      })
    },
    initList () {
      // val = 1, title = ''
      this.getRequest('https://www.easy-mock.com/mock/5c8de74f6fe7c7611499c749/biye/lili#!method=get').then(resp => {
        console.log(resp)
        // https://www.easy-mock.com/mock/5c8de74f6fe7c7611499c749/biye/lili#!method=get
        // '/collegebasic/list?pageNum=' + val + '&title=' + title
        // if (resp && resp.data.status === 'ok') {
        this.pageInfo.list = resp.data
        // }
      })
    },
    search () {
      this.initList()
      // 1, this.select_word
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
