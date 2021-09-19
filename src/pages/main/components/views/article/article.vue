<template>
    <div class="article">
        <!--按钮-->
        <el-button type="primary" style="margin: 10px 20px" v-for="item in mgrList" :key="item.id" @click="fOperation(item.code)" :disabled="item.statusName == '禁用'?true:false">
            {{item.name}}
        </el-button>
        <el-form ref="form" :model="form">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item  style="display: flex">
                        <el-input placeholder="标题" v-model="form.title"  style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item  :span="6" label="作者" style="display: flex">
                        <el-input placeholder="作者" v-model="form.author" style="width: 300px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-date-picker
                            v-model="dateArr"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            align="right"
                            :span="12"
                            value-format="yyyyMMddHHmmss">
                    </el-date-picker>
                </el-col>
            </el-row>
        </el-form>
        <el-row :gutter="20" style="padding: 10px 0 ">
            <el-col :span="3">
                <el-button type="primary" @click="fSeach">搜索</el-button>
                <el-button type="primary" @click="fReset" >重置</el-button>
            </el-col>
        </el-row>
        <!--        表格-->
        <el-table
                :data="tableData"
                style="width: 100%"
                height="380px"
                @row-click="rowClick" :highlight-current-row="true">
            <el-table-column
                    label="id"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="标题"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="作者"
                    prop="author">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="createTime">
            </el-table-column>
        </el-table>
        <!--        分页器-->
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="fChange">
        </el-pagination>
        <articleModify :type="btn['update']" :path="path" @fClose="fClose" @modifyArticle="setUser" :articleData="info"></articleModify>
        <articleDelete :type="btn['deleteArticle']" :path="path" @fClose="fClose" :parveAriticle="info" @deleteArticle="setUser"></articleDelete>
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
    //组件
    import articleModify from "@/pages/main/components/views/article/Subcomponents/articleModify";
    import articleDelete from "@/pages/main/components/views/article/Subcomponents/articleDelete"

    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getArticle,getArticleList} from '@/network/main'
    export default {
        name: "articl",
        data(){
          return {
                  //按钮权限列表（添加用户，修改用户。。。）
                  mgrList:[],
                  //用户列表绑定数据
                  tableData:[],
                  //日期选择器所选择的时间数组
                  dateArr:[],

                  props:{},
                  btn:{
                      update:false,
                      deleteArticle:false
                  },
              // 请求文章列表数据参数
                  form:{
                    title:'',
                    startDate:'',
                    endDate:'',
                    author:'',
                  },
                  params:{
                        page:1,
                        limit:10,
                  },

                  //用户信息
                  info:null,
                  //总页数
                  total:null,
                  //搜索内容
                  setName:"",
                  //当前点击的按钮
                  path:null
              }
        },
        methods:{
            //绘制图表的初始函数
            setEcharts(xData,sData){
                let myChart = this.$echarts.init(document.getElementById('main'));

                // 指定图表的配置项和数据
                let option = {
                    title: {
                        text: '文章统计'
                    },
                    tooltip: {},
                    legend: {
                        data:['销量']
                    },
                    xAxis: {
                        data: xData
                    },
                    yAxis: {},
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: sData
                    }]
                };

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            //用户切换分页时触发
            fChange(page){
                console.log(page)
                this.params.page = page
                //请求用户列表数据
                this.getArticleList(this.params)
            },
            //搜索内容
            fSeach(){
                this.getArticleList(this.params)
            },
            //重置内容
            fReset(){
                this.form.title = '';
                this.dateArr = [],
                this.form.author = '';
                this.params.page = 1;
                this.getArticleList(this.params)
            },
            //点击功能按钮
            fOperation(path){
                console.log(path)
                this.path = path
                if(!this.info){
                    this.$message.error('请选择要操作的用户')
                }
                else{
                    this.btn[path] = true
                    console.log(this.btn)
                 }
            },
            //点击每一行时触发
            rowClick(info){
                console.log(info)
                this.info = info
            },
            //弹窗关闭的回调函数
            fClose(path){
                console.log(path)
                this.btn[path] = false;
                this.info = ''
            },
            setUser(path){
                this.btn[path] = false;
                setTimeout(()=>{
                    //请求用户列表数据
                    this.getArticleList(this.params)
                },1000)
                this.info = ''
            },
            //获取文章列表数据
            getArticleList(params){
                Object.assign(params,this.form)
                params.startDate = this.dateArr[0]
                params.endDate = this.dateArr[1]
                getArticleList('/article/list',params,'get').then(res=>{
                    console.log(res)
                    this.tableData = res.data.records
                    this.total = res.data.total
                })
            },
            //获取文章表格数据
            getArticle(){
                getArticle().then(res=>{
                    let sData = res[0].data.map(n=>{
                        return n.name;
                    })
                    let xData = res[1].data.map(n=>{
                        return n.articles;
                    })
                    this.setEcharts(sData,xData);
                });
            }
        },
        mounted() {
            //请求文章图表数据
           this.getArticle()
            //请求文章表格数
            this.getArticleList(this.params)

            //功能权限数据处理
            this.mgrList =this.meuList[this.$route.path]
        },
        computed:{
            ...mapState({
                meuList:state=>{
                    return state.main.meuList
                }
            })
        },
        components:{
            articleModify,
            articleDelete
        }
    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>