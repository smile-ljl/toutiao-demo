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
            <!-- <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
            </el-radio-group> -->
            <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
            <el-select v-model="channelId" placeholder="请选择频道">
              <el-option
              label="全部"
              :value="null"
            ></el-option>
              <el-option
                :value="channel.id"
                :label="channel.name"
                v-for="(channel, index) in channels"
                :key="index"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期 :">
          <el-date-picker
           v-model="rangeDate"
           type="datetimerange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期"
          :default-time="['12:00:00']"
          format="yy-MM-dd"
          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button
            type="primary"
            :disabled="loading"
            @click="loadArticles(1)">筛选</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据筛选表单 -->
    </el-card>
    <!-- 数据列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <!-- 表格 -->
      <el-table
      :data="articles"
      stripe
      style="width: 100%"
      class="list-table"
      size="mini"
      v-loading="loading">
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
    :disabled="loading"
    @current-change="onCurrentChange">
    </el-pagination>
    <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import {
  getArticles,
  getArticleChannels
} from '@/api/article'
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
      pageSize: 10, // 每页大小
      status: null, // 查询文章的状态,不传就是全部
      channels: [], // 文章频道列表
      channelId: null, // 查询文章频道
      rangeDate: null, // 筛选的范围日期
      loading: true // 表单数据加载中
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 截止日期
      }).then(res => {
        // this.articles = res.data.data.results
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        this.loading = false // 关闭加载中
      })
    },
    onSubmit () {
      console.log('submit!')
    },
    onCurrentChange (page) {
      this.loadArticles(page)
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
