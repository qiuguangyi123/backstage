<template>
    <div class="messageBox">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            <!--            输入框-->
            <el-form  label-position="left" label-width="auto" :model="userInfo">

                <el-form-item :required="true" label="角色名称">
                    <el-input  v-model="userInfo.name"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="角色编码">
                    <el-input v-model="userInfo.tips"></el-input>
                </el-form-item>
                <el-form-item :required="true" label="部门">
                    <el-cascader :options="options" :props="props"  :show-all-levels="false" v-model="userInfo.deptid" clearable></el-cascader>
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
    import {addUser} from '@/network/main'
    import {mapState} from 'vuex'
    export default {
        name: "messageBox",
        props:['type','props','options','path'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //要添加的角色信息
                userInfo:{
                    //用户编码
                    tips:'',
                    //名字
                    name:'',
                    //部门id
                    deptid:'',
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
                this.addUser(this.userInfo)
                this.$emit('setUser',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            addUser(params){
                console.log(this.user)
                params.pid = parseInt(this.user.profile.id)
                params.deptid = parseInt(this.userInfo.deptid)
                params.num = 0
                console.log(this.userInfo)
                addUser('/role',params,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '添加角色成功',
                            type: 'success'
                        });
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
                delete params.num
                delete params.pid

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
            }
        },
        mounted(){

        }

    }
</script>

<style scoped>

</style>