<template>
  <div class="image-container">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑导航 -->
      </div>
      <!-- 按钮 -->
      <div style="padding-bottom: 20px">
        <el-radio-group
        v-model="collect"
        size="mini"
        @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
     </div>
      <!-- 按钮 -->
      <!-- 布局 -->
      <el-row :gutter="10">
        <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        >
            <el-image
            height="100px"
            :src="img.url"
            fit="cover">
            </el-image>
        </el-col>
      </el-row>
    <!-- 布局 -->
    </el-card>
  </div>
</template>

<script>
import { getImages } from '@/api/image'
export default {
  name: 'imageIndex',
  components: {},
  props: {},
  data () {
    return {
      collect: 'false',
      images: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () {},
  methods: {
    loadImages (collect = false) {
      getImages({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollectChange (value) {
      this.loadImages(value)
    }
  }
}
</script>

<style scoped lang="less"></style>
