<template>
  <div style="height:300px;width:600px">
    <el-carousel>
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 style="text-align: center;font-size: 41px;">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel'
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
