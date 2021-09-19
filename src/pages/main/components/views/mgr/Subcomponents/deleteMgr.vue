<template>
    <div class="Modify">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            <!--            输入框-->
           <div>
               你确定要删除用户<span style="color:orangered;font-weight: bold;font-size: 20px">{{userInfo.name}}</span>嘛？
           </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fdelet">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { deletUser} from '@/network/main'
    export default {
        name: "deleteMgr",
        props:['type','userInfo1','path'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //要修改的信息
                userInfo:{},
            }
        },
        methods:{
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击确定，发送请求
            fdelet(){
                this.dialogVisible = false;
                this.deletUser({
                    userId:parseInt(this.userInfo.id),
                })
                this.$emit('deleteUser',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送获取角色id的请求
            deletUser(params){
                deletUser('/user',params,'delete').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '删除成功',
                            type:'success'
                        })
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                })
            },
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