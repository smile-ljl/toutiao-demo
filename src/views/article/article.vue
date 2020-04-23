<template>
  <div class="">
    <el-card class="box-card">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form ref="form" :model="form" label-width="80px" size="mini">
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
            <el-option label="开发者资讯" ></el-option>
            <el-option label="ios"></el-option>
            <el-option label="c++"></el-option>
            <el-option label="android"></el-option>
            <el-option label="css"></el-option>
            <el-option label="数据库"></el-option>
            <el-option label="区块链"></el-option>
            <el-option label="go"></el-option>
            <el-option label="产品"></el-option>
            <el-option label="后端"></el-option>
            <el-option label="linux"></el-option>
            <el-option label="人工智能"></el-option>
            <el-option label="php"></el-option>
            <el-option label="javascript"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期 :">
          <el-date-picker
           v-model="value1"
           type="daterange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
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
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less"></style>
