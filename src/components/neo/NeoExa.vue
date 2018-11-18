<template>
  <div style="margin-top: 10px" v-loading="fullloading">
    <div style="margin-bottom: 10px;display: flex;justify-content: center;align-items: center">
      <el-input
        placeholder="默认展示部分用户，可以通过用户名搜索更多用户..."
        prefix-icon="el-icon-search"
        size="small"
        style="width: 400px;margin-right: 10px"
        v-model="keywords">
      </el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      keywords: '',
      fullloading: false,
      hrs: [],
      cardLoading: [],
      eploading: [],
      allRoles: [],
      moreBtnState: false,
      selRoles: [],
      selRolesBak: []
    }
  },
  mounted: function () {
  },
  methods: {
    searchClick () {
      this.initCards()
      this.loadAllRoles()
    },
    updateHrRoles (hrId, index) {
      this.moreBtnState = false
      var _this = this
      if (this.selRolesBak.length === this.selRoles.length) {
        for (var i = 0; i < this.selRoles.length; i++) {
          for (var j = 0; j < this.selRolesBak.length; j++) {
            if (this.selRoles[i] === this.selRolesBak[j]) {
              this.selRolesBak.splice(j, 1)
              break
            }
          }
        }
        if (this.selRolesBak.length === 0) {
          return
        }
      }
      this.eploading.splice(index, 1, true)
      this.putRequest('/system/hr/roles', {
        hrId: hrId,
        rids: this.selRoles
      }).then(resp => {
        _this.eploading.splice(index, 1, false)
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({type: data.status, message: data.msg})
          if (data.status === 'success') {
            _this.refreshHr(hrId, index)
          }
        }
      })
    },
    refreshHr (hrId, index) {
      var _this = this
      _this.cardLoading.splice(index, 1, true)
      this.putRequest('/system/hr/id/' + hrId).then(resp => {
        _this.cardLoading.splice(index, 1, false)
        _this.hrs.splice(index, 1, resp.data)
      })
    },
    loadSelRoles (hrRoles, index) {
      this.moreBtnState = true
      this.selRoles = []
      this.selRolesBak = []
      hrRoles.forEach(role => {
        this.selRoles.push(role.id)
        this.selRolesBak.push(role.id)
      })
    },
    loadAllRoles () {
      var _this = this
      this.getRequest('/system/basic/roles').then(resp => {
        _this.fullloading = false
        if (resp && resp.status === 200) {
          _this.allRoles = resp.data
        }
      })
    },
    switchChange (newValue, hrId, index) {
      var _this = this
      _this.cardLoading.splice(index, 1, true)
      this.putRequest('/system/hr/', {
        enabled: newValue,
        id: hrId
      }).then(resp => {
        _this.cardLoading.splice(index, 1, false)
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({type: data.status, message: data.msg})
          if (data.status === 'error') {
            _this.refreshHr(hrId, index)
          }
        } else {
          _this.refreshHr(hrId, index)
        }
      })
    },
    initCards () {
      this.fullloading = true
      var _this = this
      let searchWords
      if (this.keywords === '') {
        searchWords = 'all'
      } else {
        searchWords = this.keywords
      }
      this.getRequest('/system/hr/' + searchWords).then(resp => {
        if (resp && resp.status === 200) {
          _this.hrs = resp.data
          let length = resp.data.length
          _this.cardLoading = Array.apply(null, Array(length)).map(function (item, i) {
            return false
          })
          _this.eploading = Array.apply(null, Array(length)).map(function (item, i) {
            return false
          })
        }
      })
    },
    deleteHr (hrId) {
      var _this = this
      this.fullloading = true
      this.deleteRequest('/system/hr/' + hrId).then(resp => {
        _this.fullloading = false
        if (resp && resp.status === 200) {
          var data = resp.data
          _this.$message({type: data.status, message: data.msg})
          if (data.status === 'success') {
            _this.initCards()
            _this.loadAllRoles()
          }
        }
      })
    }
  }
}
</script>
<style>
  .user-info {
    font-size: 12px;
    color: #09c0f6;
  }
</style>
