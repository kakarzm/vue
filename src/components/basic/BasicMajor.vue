<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>专业管理</el-breadcrumb-item>
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
      <el-table-column prop="majorname" label="专业名称" width="250">
      </el-table-column>
      <el-table-column prop="majorschool" label="专业所在学校" width="250">
      </el-table-column>
      <el-table-column prop="professionallevel" label="层次" width="250">
      </el-table-column>
      <el-table-column prop="candfcooperation" label="中外合作办学" width="250">
      </el-table-column>
      <el-table-column prop="uandicooperation" label="校企合作办学" width="250">
      </el-table-column>
      <el-table-column prop="disciplinefields" label="学科门类" width="250">
      </el-table-column>
      <el-table-column prop="disciplinecode" label="学科代码" width="250">
      </el-table-column>
      <el-table-column prop="direction" label="方向" width="250">
      </el-table-column>
      <el-table-column prop="trainobjective" label="培养目标" width="250">
      </el-table-column>
      <el-table-column prop="trainrequirement" label="培养要求" width="250">
      </el-table-column>
      <el-table-column prop="miansubject" label="主干学科" width="250">
      </el-table-column>
      <el-table-column prop="maincourse" label="主干课程" width="250">
      </el-table-column>
      <el-table-column prop="eductionalsystem" label="学制" width="250">
      </el-table-column>
      <el-table-column prop="creditrating" label="额定学分" width="250">
      </el-table-column>
      <el-table-column prop="resetrequest" label="重修要求" width="250">
      </el-table-column>
      <el-table-column prop="professionalability" label="专业能力和素质" width="250">
      </el-table-column>
      <el-table-column prop="afterefects" label="行业认证要求知识" width="250">
      </el-table-column>
      <el-table-column prop="creditalloction" label="专业各学期学分分配" width="250">
      </el-table-column>
      <el-table-column prop="distribution" label="专业各学期学时分配" width="250">
      </el-table-column>
      <el-table-column prop="requriedcredits" label="必修课学分" width="250">
      </el-table-column>
      <el-table-column prop="optionalcredits" label="选修课学分" width="250">
      </el-table-column>
      <el-table-column prop="extensioncredits" label="拓展课学分" width="250">
      </el-table-column>
      <el-table-column prop="practicecredits" label="实践环节学分" width="250">
      </el-table-column>
      <el-table-column prop="totalhours" label="总学时" width="250">
      </el-table-column>
      <el-table-column prop="compulsoryhours" label="必修课学时" width="250">
      </el-table-column>
      <el-table-column prop="electivehours" label="选修课学时" width="250">
      </el-table-column>
      <el-table-column prop="curriculumprovision" label="课程设置" width="250">
      </el-table-column>
      <el-table-column prop=" syllabus" label="课程进程" width="250">
      </el-table-column>
      <el-table-column prop="standardcurriculumsystem" label="标准课程体系" width="250">
      </el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope">
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
        title="添加专业信息"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">专业名称</span>
          <el-input style="width: 200px;" v-model="majorName" placeholder="请输入名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 54px">层次</span>
          <el-select v-model="professionallevel" placeholder="请选择...">
            <el-option
              v-for="item in level"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>中外合作办学</span>
          <el-select v-model="candfcooperation" placeholder="请选择...">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>校企合作办学</span>
          <el-select v-model="uandicooperation" placeholder="请选择...">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 30px">学科门类</span>
          <el-select v-model="disciplinefields" placeholder="请选择...">
            <el-option
              v-for="item in disciplineshort"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 60px">方向</span>
          <el-input style="width: 200px;" v-model="direction" placeholder="请输入方向..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button size="small" type="primary" @click="changePage()">下一页</el-button>
       </span>
      </el-dialog>
      <el-dialog
        title="添加专业信息"
        :visible.sync="dialogVisible2"
        width="25%">
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">培养目标</span>
          <el-input style="width: 200px;" v-model="trainobjective" placeholder="请输入培养目标..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">培养要求</span>
          <el-input style="width: 200px;" v-model="trainrequirements" placeholder="请输入培养要求..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">学科代码</span>
          <el-input style="width: 200px;" v-model="disciplinecode" placeholder="请输入学科代码..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">主干学科</span>
          <el-input style="width: 200px;" v-model="mainsubject" placeholder="请输入主干学科..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">主干课程</span>
          <el-input style="width: 200px;" v-model="maincourse" placeholder="请输入主干课程..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 48px">学制</span>
          <el-select v-model="eductionalsystme" placeholder="请选择">
            <el-option
              v-for="item in eductionalsy"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
           <el-button size="small" type="primary" @click="returnPage2()">上一页</el-button>
           <el-button size="small" type="primary" @click="changePage2()">下一页</el-button>
       </span>
      </el-dialog>
      <el-dialog
        title="添加专业信息"
        :visible.sync="dialogVisible3"
        width="25%">
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">额定学分</span>
          <el-input style="width: 200px;" v-model="creditrating" placeholder="请输入额定学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">重修要求</span>
          <el-input style="width: 200px;" v-model="resetrequest" placeholder="请输入重修要求..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 47px">专业能力和素质</span>
          <el-input style="width: 200px;" v-model="professionalability" placeholder="请输入专业能力和素质..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 35px">行业认证要求知识</span>
          <el-input style="width: 200px;" v-model="aftereffects" placeholder="请输入行业认证要求知识..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">专业各学期学分分配</span>
          <el-input style="width: 200px;" v-model="creditalloction" placeholder="请输入专业各学期学分分配..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 23px">专业各学期学时分配</span>
          <el-input style="width: 200px;" v-model="distribution" placeholder="请输入专业各学期学时分配..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 62px">专业所在学校</span>
          <el-input style="width: 200px;" v-model="majorschool" placeholder="请输入专业所在学校..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="returnPage3()">上一页</el-button>
          <el-button size="small" type="primary" @click="changePage3()">下一页</el-button>
       </span>
      </el-dialog>
      <el-dialog
        title="添加专业信息"
        :visible.sync="dialogVisible4"
        width="25%">
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">必修课学分</span>
          <el-input style="width: 200px;" v-model="requriedcredits" placeholder="请输入必修课学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">选修课学分</span>
          <el-input style="width: 200px;" v-model="optionalcredits" placeholder="请输入选修课学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">拓展课学分</span>
          <el-input style="width: 200px;" v-model="extensioncredit" placeholder="请输入拓展课学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 83px">实践环节学分</span>
          <el-input style="width: 200px;" v-model="practicecredits" placeholder="请输入实践环节学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 123px">总学时</span>
          <el-input style="width: 200px;" v-model="totalhours" placeholder="请输入总学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">必修课学时</span>
          <el-input style="width: 200px;" v-model="compulsoryhours" placeholder="请输入必修课学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 93px">选修课学时</span>
          <el-input style="width: 200px;" v-model="electivehours" placeholder="请输入选修课学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 103px">课程设置</span>
          <el-input style="width: 200px;" v-model="curriculumprovision" placeholder="请输入课程设置..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 103px">课程进程</span>
          <el-input style="width: 200px;" v-model="syllabus" placeholder="请输入课程进程..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span style="margin-right: 78px">标准课程体系</span>
          <el-input style="width: 200px;" v-model="standardcurriculumsystem" placeholder="请输入标准课程体系..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="returnPage4()">上一页</el-button>
          <el-button size="small" @click="dialogVisible4 = false">取消</el-button>
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
      level: [
        {
          value: '本科',
          label: '本科'
        },
        {
          value: '硕士',
          label: '硕士'
        },
        {
          value: '博士',
          label: '博士'
        },
        {
          value: '专科',
          label: '专科'
        }
      ],
      selectform: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }
      ],
      disciplineshort: [
        {
          value: '哲学',
          label: '哲学'
        },
        {
          value: '经济学',
          label: '经济学'
        },
        {
          value: '法学',
          label: '法学'
        },
        {
          value: '教育学',
          label: '教育学'
        },
        {
          value: '文学',
          label: '文学'
        },
        {
          value: '历史学',
          label: '历史学'
        },
        {
          value: '理学',
          label: '理学'
        },
        {
          value: '工学',
          label: '工学'
        },
        {
          value: '农学',
          label: '农学'
        },
        {
          value: '医学',
          label: '医学'
        },
        {
          value: '军事学',
          label: '军事学'
        },
        {
          value: '管理学',
          label: '管理学'
        },
        {
          value: '艺术学',
          label: '艺术学'
        }
      ],
      eductionalsy: [
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        }
      ],
      id: '',
      majorName: '',
      professionallevel: '',
      candfcooperation: '',
      uandicooperation: '',
      disciplinefields: '',
      direction: '',
      trainobjective: '',
      trainrequirements: '',
      disciplinecode: '',
      mainsubject: '',
      maincourse: '',
      eductionalsystme: '',
      creditrating: '',
      resetrequest: '',
      professionalability: '',
      aftereffects: '',
      creditalloction: '',
      distribution: '',
      majorschool: '',
      requriedcredits: '',
      optionalcredits: '',
      extensioncredit: '',
      practicecredits: '',
      totalhours: '',
      compulsoryhours: '',
      electivehours: '',
      curriculumprovision: '',
      syllabus: '',
      standardcurriculumsystem: '',
      is_search: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
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
        this.dialogVisible4 = false
        this.treeLoading = true
        this.putRequest('/majorbasic/update', {
          // id: this.id,
          // title: this.majorName,
          // majorUrl: this.majorUrl,
          // majorCode: this.majorCode,
          // majorIntroduction: this.majorIntroduction
          id: this.id,
          majorName: this.majorName,
          professionallevel: this.professionallevel,
          candfcooperation: this.candfcooperation,
          uandicooperation: this.uandicooperation,
          disciplinefields: this.disciplinefields,
          direction: this.direction,
          trainobjective: this.trainobjective,
          trainrequirements: this.trainrequirements,
          disciplinecode: this.disciplinecode,
          mainsubject: this.mainsubject,
          maincourse: this.maincourse,
          eductionalsystme: this.eductionalsystme,
          creditrating: this.creditrating,
          resetrequest: this.resetrequest,
          professionalability: this.professionalability,
          aftereffects: this.aftereffects,
          creditalloction: this.creditalloction,
          distribution: this.distribution,
          majorschool: this.majorschool,
          requriedcredits: this.requriedcredits,
          optionalcredits: this.optionalcredits,
          extensioncredit: this.extensioncredit,
          practicecredits: this.practicecredits,
          totalhours: this.totalhours,
          compulsoryhours: this.compulsoryhours,
          electivehours: this.electivehours,
          curriculumprovision: this.curriculumprovision,
          syllabus: this.syllabus,
          standardcurriculumsystem: this.standardcurriculumsystem
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            // this.majorName = ''
            // this.majorUrl = ''
            // this.majorCode = ''
            // this.id = ''
            // 清空内容
            this.majorName = ''
            this.professionallevel = ''
            this.candfcooperation = ''
            this.uandicooperation = ''
            this.disciplinefields = ''
            this.direction = ''
            this.trainobjective = ''
            this.trainrequirements = ''
            this.disciplinecode = ''
            this.mainsubject = ''
            this.maincourse = ''
            this.eductionalsystme = ''
            this.creditrating = ''
            this.resetrequest = ''
            this.professionalability = ''
            this.aftereffects = ''
            this.creditalloction = ''
            this.distribution = ''
            this.majorschool = ''
            this.requriedcredits = ''
            this.optionalcredits = ''
            this.extensioncredit = ''
            this.practicecredits = ''
            this.totalhours = ''
            this.compulsoryhours = ''
            this.electivehours = ''
            this.curriculumprovision = ''
            this.syllabus = ''
            this.standardcurriculumsystem = ''
            this.$message({type: 'success', message: '修改成功!'})
            this.initList()
          }
        })
      }

      if ((this.id.length) === 0) {
        this.dialogVisible = false
        this.treeLoading = true
        this.postRequest('/majorbasic/save', {
          majorName: this.majorName,
          professionallevel: this.professionallevel,
          candfcooperation: this.candfcooperation,
          uandicooperation: this.uandicooperation,
          disciplinefields: this.disciplinefields,
          direction: this.direction,
          trainobjective: this.trainobjective,
          trainrequirements: this.trainrequirements,
          disciplinecode: this.disciplinecode,
          mainsubject: this.mainsubject,
          maincourse: this.maincourse,
          eductionalsystme: this.eductionalsystme,
          creditrating: this.creditrating,
          resetrequest: this.resetrequest,
          professionalability: this.professionalability,
          aftereffects: this.aftereffects,
          creditalloction: this.creditalloction,
          distribution: this.distribution,
          majorschool: this.majorschool,
          requriedcredits: this.requriedcredits,
          optionalcredits: this.optionalcredits,
          extensioncredit: this.extensioncredit,
          practicecredits: this.practicecredits,
          totalhours: this.totalhours,
          compulsoryhours: this.compulsoryhours,
          electivehours: this.electivehours,
          curriculumprovision: this.curriculumprovision,
          syllabus: this.syllabus,
          standardcurriculumsystem: this.standardcurriculumsystem
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            this.majorName = ''
            this.professionallevel = ''
            this.candfcooperation = ''
            this.uandicooperation = ''
            this.disciplinefields = ''
            this.direction = ''
            this.trainobjective = ''
            this.trainrequirements = ''
            this.disciplinecode = ''
            this.mainsubject = ''
            this.maincourse = ''
            this.eductionalsystme = ''
            this.creditrating = ''
            this.resetrequest = ''
            this.professionalability = ''
            this.aftereffects = ''
            this.creditalloction = ''
            this.distribution = ''
            this.majorschool = ''
            this.requriedcredits = ''
            this.optionalcredits = ''
            this.extensioncredit = ''
            this.practicecredits = ''
            this.totalhours = ''
            this.compulsoryhours = ''
            this.electivehours = ''
            this.curriculumprovision = ''
            this.syllabus = ''
            this.standardcurriculumsystem = ''
            this.$message({type: 'success', message: '添加成功!'})
            this.initList()
          }
        })
      }
    },
    del (id) {
      this.deleteRequest('/majorbasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      this.getRequest('/majorbasic/searchbyid/' + id).then(resp => {
        // console.log(resp)
        if (resp && resp.status === 200) {
          // this.majorName = resp.data.result.title
          // this.majorUrl = resp.data.result.majorUrl
          // this.majorCode = resp.data.result.majorCode
          // this.majorIntroduction = resp.data.result.majorIntroduction
          this.id = resp.data.result.id
          this.dialogVisible = true
          // 遮光板打开
          event.stopPropagation()
          this.initList()
        }
      })
    },
    initList (val = 1, title = '') {
      this.getRequest('/majorbasic/list?pageNum=' + val + '&title=' + title).then(resp => {
        // if (resp && resp.data.status === 'ok') {
        //   this.pageInfo = resp.data.result
        // }
      })
    },
    search () {
      this.initList(1, this.select_word)
    },
    changePage () {
      this.dialogVisible = false
      this.dialogVisible2 = true
    },
    returnPage2 () {
      this.dialogVisible2 = false
      this.dialogVisible = true
    },
    changePage2 () {
      this.dialogVisible2 = false
      this.dialogVisible3 = true
    },
    returnPage3 () {
      this.dialogVisible3 = false
      this.dialogVisible2 = true
    },
    changePage3 () {
      this.dialogVisible3 = false
      this.dialogVisible4 = true
    },
    returnPage4 () {
      this.dialogVisible4 = false
      this.dialogVisible3 = true
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
