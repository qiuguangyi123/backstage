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
            {{status}}
            <el-form  label-position="left" label-width="auto" :model="userInfo">

                <el-form-item :required="true" label="字典名称">
                    <el-input  v-model="userInfo.dictName"></el-input>
                </el-form-item>
            <div v-if="status.length > 0">
                <div>字典详情</div>
                <el-row :gutter="20" v-for="(item,index) in this.status" :key="index">
                    <el-col :span="10">
                        <el-form-item :required="true" label="状态码">
                            <el-input  v-model="item.status"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item :required="true" label="含义">
                            <el-input  v-model="item.content"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="danger" @click="fRemove(index)">移除</el-button>
                    </el-col>
                </el-row>
            </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                 <el-button @click="fDickAdd">添加字典详情</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="fsetPass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {addDict} from '@/network/main'
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
                    dictName:'',
                },

                //字典详情字段数组
                status:[]
            }
        },
        methods:{
            //关闭弹窗
            fClose(){
                this.$emit('fClose',this.path)
            },
            //点击添加字典
            fDickAdd(){
                this.status.push({
                    status:'',
                    content:''
                })
            },
            //点击移除字典
            fRemove(index){
                this.status.splice(index,1)
            },
            //点击确定，发送请求
            fsetPass(){
                this.dialogVisible = false;
                this.addDict(this.userInfo)
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(() => {
                        done();
                    })
                    .catch(() => {});
            },
            //发送添加用户请求
            addDict(params){
                //检测添加输入框是否都有数据
                if(this.status.length != 0){
                    for (let i of this.status){
                        if (i.status == '' || i.content == ''){
                            this.$message.error('请补全字典详情信息')
                            return 0
                        }
                    }
                }
                if(this.userInfo.dictName == ''){
                    this.$message.error('请补全字典名称信息')
                    return 0
                }
                let dictValues = this.fStatus(this.status);
                console.log(params,this.fStatus(this.status));
                addDict(`/dict?dictName=${params.dictName}&dictValues=${dictValues}`,{},'post').then(res=>{
                    console.log(res)
                    if(res.msg == '成功'){
                        this.$message({
                            message: '添加字典成功',
                            type: 'success'
                        });
                        this.$emit('dictAdd',this.path)
                    }
                    else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$message.error(err)
                })

            },
            //处理字典详情
            fStatus(status){
                let str = '';
                for(let i of status){
                    str += i.status+':'+i.content+';'
                }
                return str
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