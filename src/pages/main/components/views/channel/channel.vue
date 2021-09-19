<template>
    <div class="channel">
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
                    label="名字"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="编码"
                    prop="code">
            </el-table-column>
            <el-table-column
                    label="更新时间"
                    prop="modifyTime">
            </el-table-column>
            <el-table-column
                    label="id"
                    prop="id">
            </el-table-column>
        </el-table>
        <channel-add :type="btn['channeladd']" :path="path" @fClose="fClose" @channelAdd="setUser"></channel-add>
        <channelModify  :type="btn['channelEdit']" :path="path"  @fClose="fClose" @channelModify="setUser" :parveDept="info"></channelModify >
        <channelDelete :type="btn['channelDelete']" :path="path" @fClose="fClose" @channelDelete="setUser" :parveDept="info" @deleteDict="setUser"></channelDelete>
    </div>
</template>

<script>
    //组件
    import channelAdd from "@/pages/main/components/views/channel/Subcomponents/channelAdd";
    import channelModify from "@/pages/main/components/views/channel/Subcomponents/channelModify";
    import channelDelete from "@/pages/main/components/views/channel/Subcomponents/channelDelete"

    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getChannel} from '@/network/main'
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

                btn:{
                    channeladd:false,
                    channelDelete:false,
                    channelEdit:false
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
            this.getChannel(this.params)
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
            getChannel(params){
                //请求用户列表数据
                getChannel('/channel/list',params,'get').then(res=>{
                    this.tableData = res.data
                    console.log(this.tableData,'ppppp')
                })
            },
            //点击功能按钮
            fOperation(path){
                this.path = path
                console.log(path)
                if(path == 'channeladd'){
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
                if(path == 'channelEdit' || path == 'channelDelete'){
                    this.info = ''
                }
            },
            setUser(path){
                setTimeout(()=>{
                    //请求用户列表数据
                    this.getChannel(this.params)
                },1000)
                if(path == 'channelEdit' || path == 'channelDelete'){
                    this.info = ''
                }
            },
        },
        components:{
            channelAdd,
            channelModify,
            channelDelete
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