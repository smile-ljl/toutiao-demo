<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="60px" size="mini">
        <el-form-item label="状态 :">
            <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
            <el-select v-model="form.region" placeholder="请选择">
            <el-option value="be" label="开发者资讯" ></el-option>
            <el-option value="be" label="ios"></el-option>
            <el-option value="be" label="c++"></el-option>
            <el-option value="be" label="android"></el-option>
            <el-option value="be" label="css"></el-option>
            <el-option value="be" label="数据库"></el-option>
            <el-option value="be" label="区块链"></el-option>
            <el-option value="be" label="go"></el-option>
            <el-option value="be" label="产品"></el-option>
            <el-option value="be" label="后端"></el-option>
            <el-option value="be" label="linux"></el-option>
            <el-option value="be" label="人工智能"></el-option>
            <el-option value="be" label="php"></el-option>
            <el-option value="be" label="javascript"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期 :">
          <el-date-picker
           v-model="form.date1"
           type="datetimerange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期"
          :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据筛选表单 -->
    </el-card>
    <!-- 数据列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果：
      </div>
      <!-- 表格 -->
      <el-table
      :data="articles"
      stripe
      style="width: 100%"
      class="list-table"
      size="mini">
      <el-table-column
      prop="date"
      label="封面">
        <template slot-scope="scope">
          <img v-if="scope.row.cover.images[0]"
            class="article-cover"
            :src="scope.row.cover.images[0]" alt="">
          <img v-else
            class="article-cover"
            src="./no-cover.gif" alt="">
        </template>
      </el-table-column>
      <el-table-column
      prop="title"
      label="标题">
      </el-table-column>
      <el-table-column
      label="状态">
        <template slot-scope="scope">
          <el-tag
          :type="articleStatus[scope.row.status].type">
          {{articleStatus[scope.row.status].text}}
          </el-tag>
          <!-- <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
          <el-tag v-if="scope.row.status === 1">待审核</el-tag>
          <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status === 3">审核失败</el-tag>
          <el-tag v-if="scope.row.status === 4" type="info">已删除</el-tag> -->
        </template>
      </el-table-column>
      <el-table-column
      prop="pubdate"
      label="发布时间">
      </el-table-column>
      <el-table-column
      prop="pubdata"
      label="操作">
        <template>
          <el-button
          size="mini"
          circle
          icon="el-icon-edit"
          type="primary"
          ></el-button>
          <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表分页 -->
    <el-pagination
    layout="prev, pager, next"
    background
    :total="totalCount"
    :page-size="pageSize"
    @current-change="onCurrentChange">
    </el-pagination>
    <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0, // 总数据条数
      pageSize: 10 // 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      getArticles({
        page,
        per_page: this.pageSize
      }).then(res => {
        // this.articles = res.data.data.results
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped lang="less">
.list-table {
  margin-bottom: 20px;
}
.filter-card {
  margin-bottom: 30px;
}
.article-cover {
  width: 70px;
}
</style>
