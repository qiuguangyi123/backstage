<template>
    <div class="messageBox">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="handleClose"
                @close="fClose">
            {{parveDept}}
            <el-alert
                    title="当前添加的是子级菜单"
                    v-if="parveDept != ''"
                    type="warning"
            >
            </el-alert>
            <el-alert
                    title="当前选择的是父级菜单"
                    type="warning"
                    v-else
            >
            </el-alert>
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
    import {setMenuList} from '@/network/main'
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
                this.setMenuList(this.userInfo)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            setMenuList(params){
                console.log(params)
                //判断输入框中是否全都有值
                for(let i of Object.values(params)){
                    if(i == ''){
                        console.log(i)
                        if (i != 0){
                            this.$message.error('请补全信息')
                            return 0
                        }
                    }
                }
                if(this.parveDept){
                    params.pcode = this.parveDept.pcode
                }
                else{
                    params.pcode  = 0
                }
                params.num = 0
                console.log(this.userInfo)
                setMenuList('/menu',params,'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '添加菜单成功',
                            type: 'success'
                        });
                        this.userInfo = {
                            //菜单名称
                            name:'',
                            //编码
                            code:'',
                            //组件
                            components:'',
                            //状态
                            status:1,
                            //是否是菜单
                            isMenu:1
                        }
                        this.$emit('menuAdd',this.path)
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$message.error(err)
                })
                delete params.pid
                delete params.pcode

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