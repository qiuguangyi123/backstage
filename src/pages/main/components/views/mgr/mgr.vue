<template>
    <div class="mgr">
        <el-row :gutter="20">
            <el-col :span="18"><el-input v-model="setName" placeholder="请要搜索的内容"></el-input></el-col>
            <el-col :span="6">
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="昵称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createTime}}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ props.row.sexName }}</span>
                        </el-form-item>
                        <el-form-item label="部门">
                            <span>{{ props.row.deptName}}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span>{{ props.row.statusName }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="昵称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="账号"
                    prop="account">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="statusName">
            </el-table-column>
        </el-table>
<!--        分页器-->
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                @current-change="fChange">
        </el-pagination>
        <messageBox :type="btn['mgrAdd']" :path="path" :props="props" :options="options" @fClose="fClose" @setUser="setUser"></messageBox>
        <messageBoxModify :type="btn['mgrEdit']" :path="path"  :props="props" :options="options" @fClose="fClose" @modifyUser="setUser" :userInfo1="info"></messageBoxModify>
        <assignRoles :type="btn['mgrSetRole']" :path="path"  :props="props" :options="options" @fClose="fClose" :userInfo1="info" @assignUser="setUser"></assignRoles>
        <deleteMgr :type="btn['mgrDelete']" :path="path" @fClose="fClose" @modifyUser="setUser" :userInfo1="info" @deleteUser="setUser"></deleteMgr>
    </div>
</template>

<script>
    //组件
    import messageBox from "@/pages/main/components/views/mgr/Subcomponents/messageBox";
    import messageBoxModify from "@/pages/main/components/views/mgr/Subcomponents/messageBoxModify";
    import assignRoles from "@/pages/main/components/views/mgr/Subcomponents/assignRoles";
    import deleteMgr from "@/pages/main/components/views/mgr/Subcomponents/deleteMgr"

    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getUserList,getDeptList} from '@/network/main'
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
                    mgrAdd:false,
                    mgrEdit:false,
                    mgrDelete:false,
                    mgrReset:false,
                    mgrFreeze:false,
                    mgrUnfreeze:false,
                    mgrSetRole:false
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
            this.getUserList(this.params)
            //请求添加用户部门信息
            this.getDeptList()
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
            getUserList(params){
                params.name = this.setName;
                //请求用户列表数据
                getUserList('/user/list',params,'get').then(res=>{
                       console.log(res)
                       this.tableData = res.data.records
                        console.log(this.tableData,'=====')
                       this.total = res.data.total
                    })
            },
            //请求添加用户里的部门信息
            getDeptList(){
                //请求添加用户里的部门信息
                getDeptList('/dept/list',{},'get').then(res=>{
                    console.log(res)
                    let props = {
                            value:'id',
                            label:'simplename',
                            children:'children',
                            emitPath:false
                        }
                    this.props = props
                    this.options = this.fMapWhile(res.data)
                    console.log(this.props,this.options)
                })
            },
            //递归处理要传递的级联选择器的数据
            fMapWhile(data){
                data.map(n=>{
                    if (n.children.length == 0){
                           return n.children = null
                    }
                    else{
                        this.fMapWhile(n.children)
                    }
                })
                return data
            },
            //用户切换分页时触发
            fChange(page){
                console.log(page)
                this.params.page = page
                //请求用户列表数据
                this.getUserList(this.params)
            },
            //搜索内容
            fSeach(){
                this.params.page = 1
                this.getUserList(this.params)
            },
            //重置内容
            fReset(){
                this.setName = '';
                this.params.page = 1;
                this.getUserList(this.params)
            },
            //点击功能按钮
            fOperation(path){
                this.path = path
                if(path == 'mgrAdd'){
                    this.btn[path] = true;
                }
                else{
                    if(!this.info){
                        this.$message.error('请选择要操作的用户')
                    }
                    else if(path == 'mgrFreeze'){
                        console.log(this.info)
                        if(this.info.statusName == '冻结'){
                            this.$message.error('该用户已被冻结了哦')
                        }
                        else{
                            this.btn[path] = true
                        }
                    }
                    else if(path == 'mgrUnfreeze'){
                        if(this.info.statusName == '启用'){
                            this.$message.error('该用户已经启用了哦')
                        }
                        else{
                            this.btn[path] = true
                        }
                    }
                    else{
                        this.btn[path] = true
                        console.log(this.btn)
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
                if(path == 'mgrEdit' || path == 'mgrSetRole'||path == 'mgrDelete'){
                    this.info = ''
                }
            },
            setUser(path){
                setTimeout(()=>{
                    //请求用户列表数据
                    this.getUserList(this.params)
                },1000)
                if(path == 'mgrEdit' || path == 'mgrSetRole'||path == 'mgrDelete'){
                    this.info = ''
                }
            },
        },
        components:{
            messageBox,
            messageBoxModify,
            assignRoles,
            deleteMgr
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