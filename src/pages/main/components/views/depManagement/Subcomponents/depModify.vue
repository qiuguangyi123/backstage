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

                <el-form-item :required="true" label="部门全称">
                    <el-input  v-model="userInfo.fullname"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="部门简称">
                    <el-input v-model="userInfo.simplename"></el-input>
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
    import {modifyMenu} from '@/network/main'
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
                    //部门全称
                    fullname:'',
                    //部门简称
                    simplename:'',
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
                this.$emit('modifyDept',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            modifyMenu(params){
                params.id = this.parveDept.id
                params.num = 0
                console.log(this.userInfo)
                modifyMenu('/dept',params,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '修改部门成功',
                            type: 'success'
                        });
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
                this.userInfo.fullname = this.parveDept.fullname,
                this.userInfo.simplename = this.parveDept.simplename
            }
        },

    }
</script>

<style scoped>

</style>