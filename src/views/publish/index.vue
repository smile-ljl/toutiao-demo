<template>
  <div class="publish-container">
    <el-card class="box-card">
        <div slot="header">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="article" label-width="60px">
        <el-form-item label="标题:">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select
            v-model="article.channel_id"
            placeholder="请选择活动区域">
          <el-option
          :label="channel.name"
          :value="channel.id"
          v-for="(channel, index) in channels"
          :key="index"
          ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels } from '@/api/article'
export default {
  name: 'PublishIndex',
  components: {},
  props: {},
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadChannels () {
      getArticleChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
