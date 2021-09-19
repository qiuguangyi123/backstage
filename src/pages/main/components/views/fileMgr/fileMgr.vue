<template>
    <div class="article">
        <el-upload
                class="upload-demo"
                drag
                action="http://39.101.217.150:8086/file"
                :headers="headers"
                :on-success="success"
                :on-error="error">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <!--按钮-->
            <el-row :gutter="20">
                <el-col :span="18">
                    <el-input  v-model="params.originalFileName"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="fSeach">搜索</el-button>
                    <el-button type="primary" @click="fReset" >重置</el-button>
                </el-col>
            </el-row>
        <el-button type="primary" style="margin: 10px 20px" v-for="item in mgrList" :key="item.id" @click="fOperation(item.code)" :disabled="item.statusName == '禁用'?true:false">
            {{item.name}}
        </el-button>
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
                    label="创建时间"
                    prop="createTime">
            </el-table-column>
            <el-table-column
                    label="文件预览"
            >
                <template slot-scope="props">
                    <img :src="'http://39.101.217.150:8086/statics'+props.row.realFileName" alt="">
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
            >
                <template>
                    <div @click="fDownload">下载</div>
                </template>
            </el-table-column>
        </el-table>
        <!--        分页器-->
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="fChange">
        </el-pagination>
    </div>
</template>

<script>
    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getFileList} from '@/network/main'
    export default {
        name: "fileMgr",
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
                params:{
                    page:1,
                    limit:10,
                    originalFileName:''
                },
                //请求头参数
                headers:{
                    'constnet-type':'multipart/form-data',
                    'token':localStorage.token
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
            //上传图片成功回调函数
            success(res){
                console.log(res)
                this.$message({
                    message: '上传图片成功',
                    type:'success'
                })
                this.getFileList(this.params)
            },
            error(err){
                console.log(err)
            },
            //点击下载图片
            fDownload(){
                setTimeout(()=>{
                    if(this.info){
                        location.href = `http://39.101.217.150:8086/statics${this.info.realFileName}?idFile=${this.info.id}fileName=${this.info.originalFileName}`
                    }
                },500)
            },
            //用户切换分页时触发
            fChange(page){
                console.log(page)
                this.params.page = page
                //请求用户列表数据
                this.getFileList(this.params)
            },
            //搜索内容
            fSeach(){
                this.getFileList(this.params)
            },
            //重置内容
            fReset(){
                this.params.originalFileName = ''
                this.params.page = 1;
                this.getArticleList(this.params)
            },
            //点击每一行时触发
            rowClick(info){
                console.log(info)
                this.info = info
            },
            //获取文章列表数据
            getFileList(params){
                getFileList('/fileMgr/list',params,'get').then(res=>{
                    this.tableData = res.data.records
                    console.log(res)
                })
            },
        },
        mounted() {
            //请求文章表格数
            this.getFileList(this.params)

            //按钮功能权限数据处理
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
            // articleModify,
            // articleDelete
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