<template>
    <div class="roleModify">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            {{userInfo}}
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
    import {modifyUser} from '@/network/main'
    export default {
        name: "roleModify",
        props:['type','props','options','userInfo1','path'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //日期
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                //要修改的信息
                userInfo:{},
                //userInfo中输入框的上的信息
                userInfoInput:{
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
                for(let i of Object.keys(this.userInfoInput)){
                    console.log(this.userInfo[i])
                    if(!this.userInfo[i]){
                        this.$message.error('请补全信息')
                        return 0
                    }
                }
                this.modifyUser(this.userInfo)
                this.$emit('modifyUser',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            modifyUser(params){
                modifyUser('/role',params,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        watch:{
            type(){
                this.dialogVisible = this.type;
            },
            userInfo1(){
                let obj = {};
                for(let i in this.userInfo1){
                    obj[i] = this.userInfo1[i]
                }
                this.userInfo = obj
            }
        },
        mounted(){
        }

    }
</script>

<style scoped>

</style>