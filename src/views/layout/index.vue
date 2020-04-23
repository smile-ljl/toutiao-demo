<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu"/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- <div>
          <i class="el-icon-s-fold"></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>

        <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" src="http://toutiao.meiduo.site/FrvifflobfNNRM9V_ZBTI2ZaTH4n" alt="">
            <span>用户昵称</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div> -->
          <!-- <span>
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <!-- <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <app-header />

      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './commponents/aside'
import AppHeader from './commponents/header'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  // background-color: #b3c0d1;
  height: 60px;
  display: flex;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  align-items: center;
}
.main {
  background-color: #e9eef3;
}

</style>
