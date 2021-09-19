<template>
    <div class="mgr">
        <!--按钮-->
        <el-button  type="primary" style="margin: 10px 20px" v-for="item in mgrList" :key="item.id" @click="fOperation(item.code)" :disabled="item.statusName == '禁用'?true:false">
            {{item.name}}</el-button>
        <!--        表格-->
        <el-table
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;text-align: center"
                row-key="id"
                border
                :tree-props="{children: 'children'}"
                :highlight-current-row="true"
                @row-click="rowClick">
            <el-table-column
                    prop="fullname"
                    label="部门全称"
                    sortable
                  >
            </el-table-column>
            <el-table-column
                    prop="simplename"
                    label="部门简称"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="id"
                    align="center">
            </el-table-column>
        </el-table>
        <deptAdd :type="btn['deptAdd']" :path="path" @fClose="fClose" :parveDept="info" @setUser="setUser"></deptAdd>
        <depDelet :type="btn['deptDelete']" :path="path"  @fClose="fClose" @deleteDep="setUser" :parveDept="info"></depDelet>
        <depModify :type="btn['deptEdit']" :path="path" @fClose="fClose" @modifyDept="setUser" :parveDept="info"></depModify>
    </div>
</template>

<script>
    //组件
    //
    import deptAdd from "@/pages/main/components/views/depManagement/Subcomponents/depAdd";
    import depDelet from "@/pages/main/components/views/depManagement/Subcomponents/depDelet";
    import depModify from "@/pages/main/components/views/depManagement/Subcomponents/depModify"
    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getDeptList} from '@/network/main'
    export default {
        name: "dep",
        data(){
            return {
                //按钮权限列表（添加用户，修改用户。。。）
                mgrList:[],
                //部门列表绑定数据
                tableData:[],

                // 请求用户列表数据参数
                params:{
                    page:1,
                    limit:7,
                    name:''
                },
                btn:{
                    deptAdd:false,
                    deptEdit:false,
                    deptDelete:false,
                },

                //用户信息
                info:null,
                //当前点击的按钮
                path:null,
                //是否高亮当前行
                rowShow:false
            }
        },
        mounted(){
            //功能权限数据处理
            this.mgrList =this.meuList[this.$route.path]
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
            //请求部门信息
            getDeptList(){
                //请求部门信息
                getDeptList('/dept/list',{},'get').then(res=>{
                    console.log(res)
                    this.tableData = res.data
                })
            },
            //点击功能按钮
            fOperation(path){
                console.log(path)
                this.path = path
                if(path == 'deptAdd'){
                    this.btn[path] = true;
                }
                else{
                    if(!this.info){
                        this.$message.error('请选择要操作的部门')
                    }
                    else{
                        this.btn[path] = true
                        console.log(this.btn)
                    }
                }
            },
            //点击每一行时触发
            rowClick(info){
                this.info = info
            },
            //弹窗关闭的回调函数
            fClose(path){
                this.btn[path] = false;
                if(path == 'deptEdit' || path == 'deptAdd'||path == 'deptDelete'){
                    this.info = ''
                }
            },
            setUser(path){
                this.btn[path] = false;
                if(path == 'deptEdit' || path == 'deptAdd'||path == 'deptDelete'){
                    this.info = ''
                }
                setTimeout(()=>{
                    this.getDeptList()
                },1000)
            },
        },
        components:{
            deptAdd,
            depDelet,
            depModify
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