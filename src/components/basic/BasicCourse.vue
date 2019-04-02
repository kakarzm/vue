<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 基础数据</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="handle-box">
      <el-input v-model="select_word" placeholder="课程名称" class="handle-input mr10"></el-input>
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
      <el-table-column prop="course_name" header-align="center" align="center" label="课程名称" width="250">
      </el-table-column>
      <el-table-column prop="coursecategory" header-align="center" align="center" label="课程类别表" width="250">
      </el-table-column>
      <el-table-column prop="generalcourse"  header-align="center" align="center" label="通识课" width="250">
      </el-table-column>
      <el-table-column prop="basiccourse"  header-align="center" align="center" label="专业基础课" width="250">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="corecourse"
        label="专业核心课"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="developcourse"
        label="专业拓展课"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="compulsorycredit"
        label="必修课学分"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="optionalscore"
        label="选修课学分"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="developscore"
        label="拓展课学分"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="practicescore"
        label="实践环节学分"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="totalhour"
        label="总学时"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="compulsoryhour"
        label="必修课学时"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="optionalhour"
        label="选修课学时"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="curriculum"
        label="课程设置"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="coursedesign"
        label="课程进程"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="standardcourse"
        label="标准课程体系"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="coursename"
        label="课程名称"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="courseid"
        label="课程编号"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="coursecharacter"
        label="课程性质"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="coursemajor"
        label="课程所属专业"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="term"
        label="所在学期"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="beforecourse"
        label="先修课程"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="aftercourse"
        label="后序课程"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="coursehour"
        label="课程学时"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="theoryhour"
        label="理论学时"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="practicehour"
        label="实践学时"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="referencebook"
        label="参考教材"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="publictime"
        label="教材出版时间"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="courseoutline"
        label="课程大纲"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="coursedescription"
        label="课程说明"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="courseaim"
        label="课程目标"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="courserequire"
        label="课程要求"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="teachcontent"
        label="教学内容"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="knowledgeaim"
        label="知识点"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="sectionid"
        label="章节号"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="difficult"
        label="难点"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="focus"
        label="重点"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="difficultrank"
        label="难度系数"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="hourgive"
        label="学时分配"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="教学方式"
        label="columnLabel"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="teacheffect"
        label="教学效果"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="teachresource"
        label="教学资源"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="isquality"
        label="是否精品课程"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="homework"
        label="作业"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="openscope"
        label="课程开放范围"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="courseteacher"
        label="授课教师"
      >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="250"
        prop="assessstandard"
        label="课程考核标准"
      >
      </el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="scope" header-align="center" align="center">
          <el-button size="small"
                     @click="edit(scope.row.course_id)">编辑</el-button>
          <el-button size="small" type="danger"
                     @click="del(scope.row.course_id)">删除</el-button>
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
        title="添加课程信息"
        :visible.sync="dialogVisible"
        width="25%">
        <div style="margin-top: 10px">
          <span>课程名称</span>
          <el-input  style="width: 200px;" v-model="courseName" placeholder="请输入名称..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程类别表</span>
          <el-input  style="width: 200px;" v-model="coursecategory" placeholder="请输入课程类别表..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>通识课</span>
          <!--generalcourse-->
          <!--selectform-->
          <el-select v-model="generalcourse" placeholder="请选择">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>专业基础课</span>
          <!--basiccourse-->
          <el-select v-model="basiccourse" placeholder="请选择">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>专业核心课</span>
          <!--corecourse-->
          <el-select v-model="corecourse" placeholder="请选择">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>专业拓展课</span>
          <!--developcourse-->
          <el-select v-model="developcourse" placeholder="请选择">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="changePage()">下一页</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加课程信息"
        :visible.sync="dialogVisible2"
        width="25%">
        <div style="margin-top: 10px">
          <span>必修课学分</span>
          <el-input  style="width: 200px;" v-model="compulsorycredit" placeholder="请输入必修课学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>选修课学分</span>
          <el-input  style="width: 200px;" v-model="optionalscore" placeholder="请输入选修课学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>拓展课学分</span>
          <el-input  style="width: 200px;" v-model="developscore" placeholder="请输入拓展课学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>实践环节学分</span>
          <el-input  style="width: 200px;" v-model="practicescore" placeholder="请输入实践环节学分..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>总学时</span>
          <el-input  style="width: 200px;" v-model="totalhour" placeholder="请输入总学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>必修课学时</span>
          <el-input  style="width: 200px;" v-model="compulsoryhour" placeholder="请输入必修课学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>选修课学时</span>
          <el-input  style="width: 200px;" v-model="optionalhour" placeholder="请输入选修课学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程设置</span>
          <el-input  style="width: 200px;" v-model="curriculum" placeholder="请输入课程设置..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程进程</span>
          <el-input  style="width: 200px;" v-model="coursedesign" placeholder="请输入课程进程..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>标准课程体系</span>
          <el-input  style="width: 200px;" v-model="standardcourse" placeholder="请输入标准课程体系..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
         <el-button type="primary" @click="returnPage()">上一页</el-button>
          <el-button type="primary" @click="changePage2()">下一页</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加课程信息"
        :visible.sync="dialogVisible3"
        width="25%">
        <div style="margin-top: 10px">
          <span>课程编号</span>
          <el-input  style="width: 200px;" v-model="courseid" placeholder="请输入课程编号..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程性质</span>
          <el-input  style="width: 200px;" v-model="coursecharacter" placeholder="请输入课程性质..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程所属专业</span>
          <el-input  style="width: 200px;" v-model="coursemajor" placeholder="请输入课程所属专业..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>所在学期</span>
          <el-select v-model="term" placeholder="请选择...">
            <el-option
              v-for="item in terms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>先修课程</span>
          <el-input  style="width: 200px;" v-model="beforecourse" placeholder="请输入先修课程..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>后序课程</span>
          <el-input  style="width: 200px;" v-model="aftercourse" placeholder="请输入后序课程..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程学时</span>
          <el-input  style="width: 200px;" v-model="coursehour" placeholder="请输入课程学时..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="returnPage2()">上一页</el-button>
          <el-button type="primary" @click="changePage3()">下一页</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加课程信息"
        :visible.sync="dialogVisible4"
        width="25%">
        <div style="margin-top: 10px">
          <span>理论学时</span>
          <el-input  style="width: 200px;" v-model="theoryhour" placeholder="请输入理论学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>实践学时</span>
          <el-input  style="width: 200px;" v-model="practicehour" placeholder="请输入实践学时..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>参考教材</span>
          <el-input  style="width: 200px;" v-model="referencebook" placeholder="请输入参考教材..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>教材出版时间</span>
          <el-date-picker v-model="publictime" type="date" placeholder="请选择日期"></el-date-picker>
        </div>
        <div style="margin-top: 10px">
          <span>课程大纲</span>
          <el-input  style="width: 200px;" v-model="courseoutline" placeholder="请输入课程大纲..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程说明</span>
          <el-input  style="width: 200px;" v-model="coursedescription" placeholder="请输入课程说明..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程要求</span>
          <el-input  style="width: 200px;" v-model="courserequire" placeholder="请输入课程要求..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程目标</span>
          <el-input  style="width: 200px;" v-model="courseaim" placeholder="请输入课程目标..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="returnPage3()">上一页</el-button>
          <el-button type="primary" @click="changePage4()">下一页</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加课程信息"
        :visible.sync="dialogVisible5"
        width="25%">
        <div style="margin-top: 10px">
          <span>教学内容</span>
          <el-input  style="width: 200px;" v-model="teachcontent" placeholder="请输入教学内容..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>知识点</span>
          <el-input  style="width: 200px;" v-model="knowledgeaim" placeholder="请输入知识点..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>章节号</span>
          <el-input  style="width: 200px;" v-model="sectionid" placeholder="请输入章节号..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>难点</span>
          <el-input  style="width: 200px;" v-model="difficult" placeholder="请输入难点..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>重点</span>
          <el-input  style="width: 200px;" v-model="focus" placeholder="请输入重点..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>难度系数</span>
          <el-input  style="width: 200px;" v-model="difficultrank" placeholder="请输入难度系数..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>学时分配</span>
          <el-input  style="width: 200px;" v-model="hourgive" placeholder="请输入学时分配..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="returnPage4()">上一页</el-button>
          <el-button type="primary" @click="changePage5()">下一页</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="添加课程信息"
        :visible.sync="dialogVisible6"
        width="25%">
        <div style="margin-top: 10px">
          <span>教学方式</span>
          <el-input  style="width: 200px;" v-model="teachstyle" placeholder="请输入教学方式..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>教学效果</span>
          <el-input  style="width: 200px;" v-model="teacheffect" placeholder="请输入教学效果..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>教学资源</span>
          <el-input  style="width: 200px;" v-model="teachresource" placeholder="请输入教学资源..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>精品课程</span>
          <!--isquality-->
          <el-select v-model="isquality" placeholder="请选择...">
            <el-option
              v-for="item in selectform"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-top: 10px">
          <span>作业</span>
          <el-input  style="width: 200px;" v-model="homework" placeholder="请输入作业..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程开放范围</span>
          <el-input  style="width: 200px;" v-model="openscope" placeholder="请输入课程开放范围..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>授课教师</span>
          <el-input  style="width: 200px;" v-model="courseteacher" placeholder="请输入授课教师..." ></el-input>
        </div>
        <div style="margin-top: 10px">
          <span>课程考核标准</span>
          <el-input  style="width: 200px;" v-model="assessstandard" placeholder="请输入课程考核标准..." ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" type="primary" @click="returnPage5()">上一页</el-button>
          <el-button size="small" @click="dialogVisible6 = false">取消</el-button>
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
      selectform: [
        {
          value: '是',
          lable: '是'
        },
        {
          value: '否',
          lable: '否'
        }
      ],
      terms: [
        {
          value: '1',
          label: '1'
        },
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
        },
        {
          value: '6',
          label: '6'
        },
        {
          value: '7',
          label: '7'
        },
        {
          value: '8',
          label: '8'
        }
      ],
      id: '',
      courseName: '',
      coursecategory: '',
      generalcourse: '',
      basiccourse: '',
      corecourse: '',
      developcourse: '',
      compulsorycredit: '',
      optionalscore: '',
      developscore: '',
      practicescore: '',
      totalhour: '',
      compulsoryhour: '',
      optionalhour: '',
      curriculum: '',
      coursedesign: '',
      standardcourse: '',
      coursename: '',
      courseid: '',
      coursecharacter: '',
      coursemajor: '',
      term: '',
      beforecourse: '',
      aftercourse: '',
      coursehour: '',
      theoryhour: '',
      practicehour: '',
      referencebook: '',
      publictime: '',
      courseoutline: '',
      coursedescription: '',
      courseaim: '',
      courserequire: '',
      teachcontent: '',
      knowledgeaim: '',
      sectionid: '',
      difficult: '',
      focus: '',
      difficultrank: '',
      hourgive: '',
      teachstyle: '',
      teacheffect: '',
      teachresource: '',
      isquality: '',
      homework: '',
      openscope: '',
      courseteacher: '',
      assessstandard: '',
      is_search: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible5: false,
      dialogVisible6: false,
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
        this.dialogVisible6 = false
        this.treeLoading = true
        this.putRequest('/coursebasic/update', {
          id: this.id,
          // title: this.courseName,
          // englishName: this.englishName,
          // courseCode: this.courseCode,
          // courseType: this.courseType
          courseName: this.courseName,
          coursecategory: this.coursecategory,
          generalcourse: this.generalcourse,
          basiccourse: this.basiccourse,
          corecourse: this.corecourse,
          developcourse: this.developcourse,
          compulsorycredit: this.compulsorycredit,
          optionalscore: this.optionalscore,
          developscore: this.developscore,
          practicescore: this.practicescore,
          totalhour: this.totalhour,
          compulsoryhour: this.compulsoryhour,
          optionalhour: this.optionalhour,
          curriculum: this.curriculum,
          coursedesign: this.coursedesign,
          standardcourse: this.standardcourse,
          coursename: this.coursename,
          courseid: this.courseid,
          coursecharacter: this.coursecharacter,
          coursemajor: this.coursemajor,
          term: this.term,
          beforecourse: this.beforecourse,
          aftercourse: this.aftercourse,
          coursehour: this.coursehour,
          theoryhour: this.theoryhour,
          practicehour: this.practicehour,
          referencebook: this.referencebook,
          publictime: this.publictime,
          courseoutline: this.courseoutline,
          coursedescription: this.coursedescription,
          courseaim: this.courseaim,
          courserequire: this.courserequire,
          teachcontent: this.teachcontent,
          knowledgeaim: this.knowledgeaim,
          sectionid: this.sectionid,
          difficult: this.difficult,
          focus: this.focus,
          difficultrank: this.difficultrank,
          hourgive: this.hourgive,
          teachstyle: this.teachstyle,
          teacheffect: this.teacheffect,
          teachresource: this.teachresource,
          isquality: this.isquality,
          homework: this.homework,
          openscope: this.openscope,
          courseteacher: this.courseteacher,
          assessstandard: this.assessstandard
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            // this.courseName = ''
            // this.id = ''
            this.courseName = ''
            this.coursecategory = ''
            this.generalcourse = ''
            this.basiccourse = ''
            this.corecourse = ''
            this.developcourse = ''
            this.compulsorycredit = ''
            this.optionalscore = ''
            this.developscore = ''
            this.practicescore = ''
            this.totalhour = ''
            this.compulsoryhour = ''
            this.optionalhour = ''
            this.curriculum = ''
            this.coursedesign = ''
            this.standardcourse = ''
            this.coursename = ''
            this.courseid = ''
            this.coursecharacter = ''
            this.coursemajor = ''
            this.term = ''
            this.beforecourse = ''
            this.aftercourse = ''
            this.coursehour = ''
            this.theoryhour = ''
            this.practicehour = ''
            this.referencebook = ''
            this.publictime = ''
            this.courseoutline = ''
            this.coursedescription = ''
            this.courseaim = ''
            this.courserequire = ''
            this.teachcontent = ''
            this.knowledgeaim = ''
            this.sectionid = ''
            this.difficult = ''
            this.focus = ''
            this.difficultrank = ''
            this.hourgive = ''
            this.teachstyle = ''
            this.teacheffect = ''
            this.teachresource = ''
            this.isquality = ''
            this.homework = ''
            this.openscope = ''
            this.courseteacher = ''
            this.assessstandard = ''
            this.$message({type: 'success', message: '修改成功!'})
            this.initList()
          }
        })
      }

      if ((this.id.length) === 0) {
        this.dialogVisible6 = false
        this.treeLoading = true
        this.postRequest('/coursebasic/save', {
          // title: this.courseName,
          // englishName: this.englishName,
          // courseCode: this.courseCode,
          // courseType: this.courseType
          courseName: this.courseName,
          coursecategory: this.coursecategory,
          generalcourse: this.generalcourse,
          basiccourse: this.basiccourse,
          corecourse: this.corecourse,
          developcourse: this.developcourse,
          compulsorycredit: this.compulsorycredit,
          optionalscore: this.optionalscore,
          developscore: this.developscore,
          practicescore: this.practicescore,
          totalhour: this.totalhour,
          compulsoryhour: this.compulsoryhour,
          optionalhour: this.optionalhour,
          curriculum: this.curriculum,
          coursedesign: this.coursedesign,
          standardcourse: this.standardcourse,
          coursename: this.coursename,
          courseid: this.courseid,
          coursecharacter: this.coursecharacter,
          coursemajor: this.coursemajor,
          term: this.term,
          beforecourse: this.beforecourse,
          aftercourse: this.aftercourse,
          coursehour: this.coursehour,
          theoryhour: this.theoryhour,
          practicehour: this.practicehour,
          referencebook: this.referencebook,
          publictime: this.publictime,
          courseoutline: this.courseoutline,
          coursedescription: this.coursedescription,
          courseaim: this.courseaim,
          courserequire: this.courserequire,
          teachcontent: this.teachcontent,
          knowledgeaim: this.knowledgeaim,
          sectionid: this.sectionid,
          difficult: this.difficult,
          focus: this.focus,
          difficultrank: this.difficultrank,
          hourgive: this.hourgive,
          teachstyle: this.teachstyle,
          teacheffect: this.teacheffect,
          teachresource: this.teachresource,
          isquality: this.isquality,
          homework: this.homework,
          openscope: this.openscope,
          courseteacher: this.courseteacher,
          assessstandard: this.assessstandard
        }).then(resp => {
          this.treeLoading = false
          // alert(JSON.stringify(resp.data))
          if (resp && resp.status === 200) {
            // this.courseName = ''
            // this.englishName = ''
            // this.courseCode = ''
            // this.courseType = ''
            this.courseName = ''
            this.coursecategory = ''
            this.generalcourse = ''
            this.basiccourse = ''
            this.corecourse = ''
            this.developcourse = ''
            this.compulsorycredit = ''
            this.optionalscore = ''
            this.developscore = ''
            this.practicescore = ''
            this.totalhour = ''
            this.compulsoryhour = ''
            this.optionalhour = ''
            this.curriculum = ''
            this.coursedesign = ''
            this.standardcourse = ''
            this.coursename = ''
            this.courseid = ''
            this.coursecharacter = ''
            this.coursemajor = ''
            this.term = ''
            this.beforecourse = ''
            this.aftercourse = ''
            this.coursehour = ''
            this.theoryhour = ''
            this.practicehour = ''
            this.referencebook = ''
            this.publictime = ''
            this.courseoutline = ''
            this.coursedescription = ''
            this.courseaim = ''
            this.courserequire = ''
            this.teachcontent = ''
            this.knowledgeaim = ''
            this.sectionid = ''
            this.difficult = ''
            this.focus = ''
            this.difficultrank = ''
            this.hourgive = ''
            this.teachstyle = ''
            this.teacheffect = ''
            this.teachresource = ''
            this.isquality = ''
            this.homework = ''
            this.openscope = ''
            this.courseteacher = ''
            this.assessstandard = ''
            this.$message({type: 'success', message: '添加成功!'})
            this.initList()
          }
        })
      }
    },
    del (id) {
      this.deleteRequest('/coursebasic/del/' + id).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({type: 'success', message: '删除成功!'})
          this.initList()
        }
      })
    },
    edit (id) {
      this.getRequest('/coursebasic/searchbyid/' + id).then(resp => {
        // console.log(resp)
        if (resp && resp.status === 200) {
          // this.courseName = resp.data.result.title
          // this.englishName = resp.data.result.englishName
          // this.courseCode = resp.data.result.courseCode
          // this.courseType = resp.data.result.courseType
          this.id = resp.data.result.id
          this.dialogVisible = true
          event.stopPropagation()
          this.initList()
        }
      })
    },
    initList (val = 1, title = '') {
      this.getRequest('/coursebasic/list?pageNum=' + val + '&title=' + title).then(resp => {
        if (resp && resp.data.status === 'ok') {
          this.pageInfo = resp.data.result
        }
      })
    },
    search () {
      this.initList(1, this.select_word)
    },
    changePage () {
      this.dialogVisible = false
      this.dialogVisible2 = true
    },
    returnPage () {
      this.dialogVisible2 = false
      this.dialogVisible = true
    },
    changePage2 () {
      this.dialogVisible2 = false
      this.dialogVisible3 = true
    },
    returnPage2 () {
      this.dialogVisible3 = false
      this.dialogVisible2 = true
    },
    changePage3 () {
      this.dialogVisible3 = false
      this.dialogVisible4 = true
    },
    returnPage3 () {
      this.dialogVisible4 = false
      this.dialogVisible3 = true
    },
    changePage4 () {
      this.dialogVisible4 = false
      this.dialogVisible5 = true
    },
    returnPage4 () {
      this.dialogVisible5 = false
      this.dialogVisible4 = true
    },
    changePage5 () {
      this.dialogVisible5 = false
      this.dialogVisible6 = true
    },
    returnPage5 () {
      this.dialogVisible6 = false
      this.dialogVisible5 = true
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
