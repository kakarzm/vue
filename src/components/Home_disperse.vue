<template>
  <div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
        <keep-alive>
          <transition name="fade" mode="out-in">
          <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </transition>
        </keep-alive>
      <transition name="fade" mode="out-in">
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import vHead from './common/Header.vue'
import vSidebar from './common/Sidebar.vue'
export default{
  components: {
    vHead, vSidebar
  }
}
</script>
