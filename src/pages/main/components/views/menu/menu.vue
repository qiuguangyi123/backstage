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
                @row-click="rowClick"
                >
            <el-table-column
                    prop="name"
                    label="菜单名称"
                    sortable
            >
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="链接标识"
                    sortable
                    align="center">
            </el-table-column>
            <el-table-column
                    prop="isMenuName"
                    label="是否是菜单"
                    sortable
                    align="center"
                   >
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    sortable
                    align="center"
                    :formatter="formatter">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="菜单id"
                    align="center">
            </el-table-column>
        </el-table>
        <menuAdd  :type="btn['menuAdd']" :path="path" @fClose="fClose" :parveDept="info" @menuAdd="setUser"></menuAdd >
        <menuDelete :type="btn['menuDelete']" :path="path"  @fClose="fClose" @menuDelete="setUser" :parveDept="info"></menuDelete>
        <menuModify :type="btn['menuEdit']" :path="path" @fClose="fClose" @modifyMenu="setUser" :parveDept="info"></menuModify>
    </div>
</template>

<script>
    //组件
    import menuAdd from "main/components/views/menu/Subcomponents/menuAdd";
    import menuDelete from "main/components/views/menu/Subcomponents/menuDelet";
    import menuModify from "main/components/views/menu/Subcomponents/menuModify"
    //vuex
    import {mapState} from 'vuex'

    //网络请求函数
    import {getMenuList} from '@/network/main'
    export default {
        name: "dep",
        data(){
            return {
                //按钮权限列表（添加用户，修改用户。。。）
                mgrList:[],
                //部门列表绑定数据
                tableData:[],

                btn:{
                    menuAdd:false,
                    menuEdit:false,
                    menuDelete:false,
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
            this.getMenuList()
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
            getMenuList(){
                //请求部门信息
                getMenuList('/menu/list',{},'get').then(res=>{
                    console.log(res,'aaaaaa')
                    this.tableData = res.data
                })
            },
            //点击功能按钮
            fOperation(path){
                console.log(path)
                this.path = path
                if(path == 'menuAdd'){
                    this.btn[path] = true;
                }
                else{
                    if(!this.info){
                        this.$message.error('请选择要操作的菜单')
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
                if(path == 'menuEdit' || path == 'menutAdd'||path == 'menuDelete'){
                    this.info = ''
                }
            },
            setUser(path){
                this.btn[path] = false;
                if(path == 'menuEdit' || path == 'menuAdd'||path == 'menuDelete'){
                    this.info = ''
                }
                this.getMenuList()
            },
            //格式化状态数据
            formatter(row,column,cellValue){
                if(cellValue == 0){
                    return '禁用'
                }
                else if(cellValue == 1){
                    return '启用'
                }
                else{
                    return '删除'
                }
            }
        },
        components:{
            menuAdd,
            menuDelete,
            menuModify
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