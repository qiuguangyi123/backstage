<template>
    <div class="Modify">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose"
                @open="fOpen">
            {{userInfo}}
            <!--            输入框-->
            <el-tree :default-expanded-keys="checkedIds" node-key="id" :default-checked-keys="checkedIds" :data="menuItemList" :props="defaultProps" @check="handleNodeClick" :show-checkbox="true" ref="treeEl"></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fSet">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {menuTreeListByRoleId,setRoleMenu} from '@/network/main'
    export default {
        name: "roleMenuTreeList",
        props:['type','userInfo1','path'],
        data(){
            return {
                //请求过来的权限分配数据
                menuItemList:[],
                //请求过来的菜单权限数组
                checkedIds:[],
                //菜单权限id数组
                permissions:[],
                //弹窗状态
                dialogVisible:this.type,

                //要修改的信息
                userInfo:{},
                //树状组件的格式
                defaultProps: {
                    children: 'children',
                    label: 'name',
                }
            }
        },
        methods:{
            //消息弹窗打开
            fOpen(){
                //请求树状组件数据
                this.menuTreeListByRoleId({
                    roleId:parseInt(this.userInfo.id),
                })
            },
            //消息弹窗关闭
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击确定，发送请求
            fSet(){
                this.dialogVisible = false;
                console.log(this.permissions)
                //发送更改权限请求
                this.setRoleMenu({
                    roleId:parseInt(this.userInfo.id),
                    permissions:`${this.permissions}`
                })
                this.$emit('menuUser',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送分配权限的请求
            menuTreeListByRoleId(params){
                menuTreeListByRoleId('/menu/menuTreeListByRoleId',params,'get').then(res=>{
                    this.menuItemList = res.data.treeData
                    this.checkedIds = res.data.checkedIds
                    this.permissions = res.data.checkedIds
                }).catch(err=>{
                    console.log(err)
                })
            },
            //发送更改权限请求
            setRoleMenu(params){
                console.log(params)
                setRoleMenu('/role/savePermisson',params,'post').then(res=>{
                    console.log(res)
                })
            },
            //树状结构被点击的时候触发
            handleNodeClick(){
                let arr = this.$refs.treeEl.getCheckedKeys();
                let arr1 = this.$refs.treeEl.getHalfCheckedKeys();
                // 菜单权限id数组
                this.permissions = arr.concat(arr1)
                console.log(this.permissions)
            }
        },
        watch:{
            type(){
                this.dialogVisible = this.type;
            },
            userInfo1(){
                this.userInfo = this.userInfo1
            }
        },
        mounted(){}

    }
</script>

<style scoped>

</style>