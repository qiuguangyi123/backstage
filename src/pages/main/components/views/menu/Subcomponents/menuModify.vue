<template>
    <div class="messageBox">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            {{parveDept}}
            <!--            输入框-->
            <el-form  label-position="left" label-width="auto" :model="userInfo">

                <el-form-item label="菜单名称">
                    <el-input v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input  v-model="userInfo.code"></el-input>
                </el-form-item>
                <el-form-item label="组件">
                    <el-input  v-model="userInfo.components"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input  v-model="userInfo.url"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="userInfo.status">
                        <el-radio :label="1">启用</el-radio>
                        <el-radio :label="2">弃用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否是菜单">
                    <el-radio-group v-model="userInfo.isMenu">
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="0">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fsetPass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {setDep} from '@/network/main'
    import {mapState} from 'vuex'
    export default {
        name: "messageBox",
        props:['type','path','parveDept'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //要添加的角色信息
                userInfo:{
                    //菜单名称
                    name:'',
                    //编码
                    code:'',
                    //组件
                    component:'',
                    //链接
                    url:'',
                    //状态
                    status:1,
                    //是否是菜单
                    isMenu:1
                },
            }
        },
        methods:{
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击确定，发送请求
            fsetPass(){
                this.dialogVisible = false;
                this.setDep(this.userInfo)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            setDep(params){
                params.id = this.parveDept.id
                params.num = 0
                console.log(this.userInfo)
                setDep('/menu',params,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '修改部门成功',
                            type: 'success'
                        });
                        this.$emit('modifyMenu',this.path)
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                delete params.num,
                    delete params.id
            }
        },
        computed:{
            ...mapState({
                user:state=>state.main.user
            })
        },
        watch:{
            type(){
                this.dialogVisible = this.type;
            },
            parveDept(){
                for(let i in this.userInfo){
                    this.userInfo[i] = this.parveDept[i]
                }

            }
        },

    }
</script>

<style scoped>

</style>