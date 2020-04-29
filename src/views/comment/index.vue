<template>
  <div class="comment-container">
    <el-card class="box-card">
      <!-- 面包屑路径导航 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">评论管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- /面包屑路径导航 -->
      <!-- 表格区域 -->
       <el-table
        class="table-list"
        :data="articles"
        stripe
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
          <template slot-scope="scope">
            {{ scope.row.comment_status ? '正常' : '关闭'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
        >
          <template slot-scope="scope">
             <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="100"
                inactive-value="0"
                @change="onStatusChange(scope.row)"
              >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格区域 -->
      <!-- 分页管理 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
      <!-- /分页管理 -->
  </el-card>
  </div>
</template>
<script>
import { getArticles } from '@/api/article'

export default {
  name: 'commentIndex',
  components: {},
  props: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage4: 1,
      articles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    loadArticles () {
      getArticles({
        response_type: 'comment'
      }).then(res => {
        this.articles = res.data.data.results
      })
    },
    onStatusChange (article) {
      console.log(article)
    }
  }
}
</script>

<style scoped lang="less">
.table-list {
  margin-bottom: 30px
}
</style>
