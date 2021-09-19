<template>
    <div class="dict">
        <el-row :gutter="20">
            <el-col :span="18"><el-input v-model="setName" placeholder="请要搜索的内容"></el-input></el-col>
            <el-col :span="3">
                <el-button type="primary" @click="fSeach">搜索</el-button>
                <el-button type="primary" @click="fReset" >重置</el-button>
            </el-col>
        </el-row>
        <!--按钮-->
        <el-button type="primary" style="margin: 10px 20px" v-for="item in mgrList" :key="item.id" @click="fOperation(item.code)" :disabled="item.statusName == '禁用'?true:false">
            {{item.name}}</el-button>
        <!--        表格-->
        <el-table
                :data="tableData"
                style="width: 100%"
                height="380px"
                @row-click="rowClick" :highlight-current-row="true">
            <el-table-column
                    label="昵称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="详细"
                    prop="detail">
            </el-table-column>
            <el-table-column
                    label="字典id"
                    prop="id">
            </el-table-column>
        </el-table>
        <dictAdd :type="btn['dictAdd']" :path="path" @fClose="fClose" @dictAdd="setUser"></dictAdd>
        <dictModify  :type="btn['dictEdit']" :path="path"  @fClose="fClose" @dictModify="setUser" :parveDept="info"></dictModify >
        <dictDelete :type="btn['dictDelete']" :path="path" @fClose="fClose" @modifyUser="setUser" :parveDept="info" @deleteDict="setUser"></dictDelete>
    </div>
</template>

<script>
    //组件
    import dictAdd from "@/pages/main/components/views/dict/Subcomponents/dictAdd";
    import dictModify from "@/pages/main/components/views/dict/Subcomponents/dictModify";
    import dictDelete from "@/pages/main/components/views/dict/Subcomponents/dictDelete"

    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getDict} from '@/network/main'
    export default {
        name: "mgr",
        data(){
            return {
                //按钮权限列表（添加用户，修改用户。。。）
                mgrList:[],
                //用户列表绑定数据
                tableData:[],
                //添加用户选择部门数据
                options:[],
                props:{},

                // 请求用户列表数据参数
                params:{
                    page:1,
                    limit:7,
                    name:''
                },
                btn:{
                    dictAdd:false,
                    dictDelete:false,
                    dictEdit:false
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
        mounted(){
            //功能权限数据处理
            this.mgrList =this.meuList[this.$route.path]
            //请求用户列表数据
            this.getDict(this.params)
        },
        computed:{
            ...mapState({
                meuList:state=>{
                    return state.main.meuList
                }
            })
        },
        methods:{
            //请求用户列表数据
            getDict(params){
                params.name = this.setName;
                //请求用户列表数据
                getDict('/dict/list',params,'get').then(res=>{
                    this.tableData = res.data
                    console.log(this.tableData,'=====')
                })
            },
            //搜索内容
            fSeach(){
                this. getDict(this.params)
            },
            //重置内容
            fReset(){
                this.setName = '';
                this. getDict(this.params)
            },
            //点击功能按钮
            fOperation(path){
                this.path = path
                console.log(path)
                if(path == 'dictAdd'){
                    this.btn[path] = true;
                }
                else{
                    if(!this.info){
                        this.$message.error('请选择要操作的用户')
                    }
                    else{
                        this.btn[path] = true
                    }
                }
            },
            //点击每一行时触发
            rowClick(info){
                console.log(info)
                this.info = info
            },
            //弹窗关闭的回调函数
            fClose(path){
                this.btn[path] = false;
                if(path == 'dictEdit' || path == 'dictDelete'){
                    this.info = ''
                }
            },
            setUser(path){
                setTimeout(()=>{
                    //请求用户列表数据
                    this.getDict(this.params)
                },1000)
                if(path == 'dictEdit' || path == 'dictDelete'){
                    this.info = ''
                }
            },
        },
        components:{
            dictAdd,
            dictDelete,
            dictModify
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