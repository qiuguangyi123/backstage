<template>
    <div class="Modify">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            <!--            输入框-->
            {{userInfo}}
            <el-select v-model="roleIds" clearable placeholder="请选择">
                <el-option
                        v-for="item of treeData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fsetPass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getRole,setRoule} from '@/network/main'
    export default {
        name: "Modify",
        props:['type','props','options','userInfo1','path'],
        data(){
            return {
                //弹窗状态
                dialogVisible:this.type,

                //要修改的信息
                userInfo:{},

                //角色权限数组
                treeData:null,
                //选择的角色的id
                roleIds:0
            }
        },
        methods:{
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击确定，发送请求
            fsetPass(){
                this.dialogVisible = false;
                console.log(this.userInfo,parseInt(this.roleIds))
                this.setRoule({
                    userId:parseInt(this.userInfo.id),
                    roleIds:parseInt(this.roleIds)
                })
                this.$emit('assignUser',this.path)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送获取角色id的请求
            getRole(params){
                getRole('/role/roleTreeListByIdUser',params,'get').then(res=>{
                    console.log(res)
                    this.treeData = res.data.treeData
                })
            },
            //分配角色权限
            setRoule(params){
                setRoule('/user/setRole',params,'get').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '分配成功',
                            type: 'success'
                        })
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        watch:{
            type(){
                this.dialogVisible = this.type;
                if(!this.treeData){
                    this.getRole({
                        idUser:this.userInfo.id
                    })
                }
            },
            userInfo1(){
                this.userInfo = this.userInfo1
                this.roleIds = this.userInfo.roleid
                console.log(this.userInfo)
            }
        },
        mounted(){
        }

    }
</script>

<style scoped>

</style>