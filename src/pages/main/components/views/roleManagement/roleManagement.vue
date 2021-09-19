<template>
    <div class="roleManagement">
                <el-row :gutter="20">
                    <el-col :span="18"><el-input v-model="setName" placeholder="请要搜索的内容"></el-input></el-col>
                    <el-col :span="6" style="padding-left: 15px">
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
                            label="角色名称"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            label="部门名称"
                            prop="deptName">
                    </el-table-column>
                    <el-table-column
                            label="id"
                            prop="id">
                    </el-table-column>
                </el-table>
                <roleAdd :type="btn['roleAdd']" :path="path" :props="props" :options="options" @fClose="fClose" @setUser="setUser"></roleAdd>
                <role-modify :type="btn['roleEdit']" :path="path"  :props="props" :options="options" @fClose="fClose" @modifyUser="setUser" :userInfo1="info"></role-modify>
                <role-menu :type="btn['roleSetAuthority']" :path="path"  :props="props" :options="options" @fClose="fClose" :userInfo1="info" @assignUser="setUser"></role-menu>
                <role-delet :type="btn['roleDelete']" :path="path" @fClose="fClose" :userInfo1="info" @deleteUser="setUser"></role-delet>
    </div>
</template>

<script>//组件
import roleAdd from "@/pages/main/components/views/roleManagement/Subcomponents/roleAdd";
import roleModify from "@/pages/main/components/views/roleManagement/Subcomponents/roleModify";
import roleMenu from "@/pages/main/components/views/roleManagement/Subcomponents/roleMenuTreeListByRoleId";
import roleDelet from "@/pages/main/components/views/roleManagement/Subcomponents/roleDelet"

//vuex
import {mapState} from 'vuex'

//网络请求函数
import {getRoleList,getDeptList} from '@/network/main'
export default {
                name: "mgr",
                data(){
                    return {
                        //按钮的值
                        mgrList:[],
                        //用户列表绑定数据
                        tableData:[],
                        //添加用户选择部门数据
                        options:[],
                        props:{},

                        // 请求用户列表数据参数
                        params:{
                            name:""
                        },
                        btn:{
                            roleAdd:false,
                            roleEdit:false,
                            roleDelete:false,
                            roleReset:false,
                            roleSetAuthority:false
                        },

                        //用户信息
                        info:null,
                        //搜索内容
                        setName:"",
                        //当前点击的按钮
                        path:null
                    }
                },
                mounted(){
                    this.mgrList =this.meuList[this.$route.path]
                    //请求用户列表数据
                    this.getRoleList(this.params)
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
                    getRoleList(params){
                        params.name = this.setName;
                        //请求用户列表数据
                        getRoleList('/role/list',params,'get').then(res=>{
                            console.log(res)
                            this.tableData = res.data
                        })
                    },
                    //请求添加角色里的部门信息
                    getDeptList(){
                        //请求添加角色里的部门信息
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
                    //搜索内容
                    fSeach(){
                        this.params.name = this.setName
                        this.getRoleList(this.params)
                    },
                    //重置搜索内容
                    fReset(){
                        this.setName = '';
                        this.getRoleList(this.params)
                    },
                    //点击功能按钮
                    fOperation(path){
                        this.path = path
                        console.log(path)
                        if(path == 'roleAdd'){
                            this.btn[path] = true;
                        }
                        else{
                            if(!this.info){
                                this.$message.error('请选择要操作的用户')
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
                        if(path == 'roleEdit' || path == 'roleSetRole'||path == 'roleDelete'){
                            this.info = ''
                        }
                    },
                    setUser(path){
                        setTimeout(()=>{
                            //请求用户列表数据
                            this.getRoleList(this.params)
                        },1000)
                        if(path == 'roleEdit' || path == 'roleSetRole'||path == 'roleDelete'){
                            this.info = ''
                        }
                    },
                },
                components:{
                    roleAdd,
                    roleModify,
                    // messageBoxModify,
                    roleMenu,
                    roleDelet,
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