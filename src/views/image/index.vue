<template>
  <div class="image-container">
    <el-card class="box-card">
      <div class="clearfix" slot="header">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑导航 -->
      </div>
      <!-- 按钮 -->
      <div class="action-header">
        <el-radio-group
        v-model="collect"
        size="mini"
        @change="loadImages(1)">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button size="mini" type="success" @click="dialogUploadVisible=true">上传素材</el-button>
     </div>
      <!-- /按钮 -->
      <!-- 布局 -->
      <el-row :gutter="10">
        <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        v-for="(img, index) in images"
        :key="index"
        class="image-item"
        >
          <el-image
          style="height: 200px"
          :src="img.url"
          fit="cover">
          </el-image>
          <div class="image-action">
            <el-button
              type="warning"
              :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
              circle
              size="small"
              @click="onCollect(img)"
              :loading="img.loading"
            ></el-button>
            <!-- <i class="el-icon-delete-solid"></i> -->
            <el-button
              size="small"
              icon="el-icon-delete-solid"
              type="danger"
              circle
              :loading="img.loading"
              @click="onDelete(img)"
            ></el-button>
          </div>
        </el-col>
      </el-row>
    <!-- /布局 -->
    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :page-size="pageSize"
      :current-page.sync="page"
      @current-change="onPageChange">
    </el-pagination>
    <!-- /分页组件 -->
    </el-card>
    <!-- 上传图片 -->
    <el-dialog
    title="上传图片"
    :visible.sync="dialogUploadVisible"
    :append-to-body="true">
        <el-upload
        v-if="dialogUploadVisible"
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="uploadSuccess"
        multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </el-dialog>
    <!-- /上传图片 -->
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'imageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: 'false',
      images: [],
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 12,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(img => {
          img.loading = false
        })
        this.images = results
        this.totalCount = res.data.data.total_count
      })
    },
    onCollectChange () {
      this.loadImages(1)
    },
    uploadSuccess () {
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(this.page)
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      this.loadImages(page)
    },
    onCollect (img) {
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
        img.loading = false
      })
    },
    onDelete (img) {
      this.loading = true
      deleteImage(img.id).then(res => {
        // 重新加载数据列表
        this.loadImages(this.page)
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.action-header {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
}
.image-item {
  position: relative;
}
.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: rgb(231, 178, 99);
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
</style>
