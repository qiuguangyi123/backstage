<template>
    <div class="channelAdd">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            <!--            输入框-->
            <el-form  label-position="left" label-width="auto" :model="userInfo">

                <el-form-item :required="true" label="栏目名称">
                    <el-input  v-model="userInfo.name"></el-input>
                </el-form-item>

                <el-form-item :required="true" label="栏目编码">
                    <el-input  v-model="userInfo.code"></el-input>
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
    import {setChannel} from '@/network/main'
    export default {
        name: "channelAdd",
        props:['type','path','parveDept'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //要添加的角色信息
                userInfo:{
                    //栏目名称
                    name:'',
                    //栏目编码
                    code:''
                },
            }
        },
        methods:{
            //关闭弹窗
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击确定，发送请求
            fsetPass(){
                this.dialogVisible = false;
                this.setChannel(this.userInfo)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加栏目请求
            setChannel(params){
                if(params.name == '' || params.code == ''){
                    this.$message.error('请补全信息')
                    return 0
                }
                //传入要修改的栏目id
                params.id = this.parveDept.id
                setChannel(`/channel?name=${params.name}&code=${params.code}&id=${params.id}`,{},'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '修改栏目成功',
                            type: 'success'
                        });
                        this.$emit('channelModify',this.path)
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$message.error(err)
                })

            },
        },
        computed:{},
        watch:{
            type(){
                this.dialogVisible = this.type;
            },
            parveDept(){
                this.userInfo.name = this.parveDept.name
                this.userInfo.code = this.parveDept.code
            }
        },
        mounted(){

        }

    }
</script>

<style scoped>

</style>