<template>
    <div class="articleEdit">
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="60%"
                :before-close="fClose"
                @open="fOpen">
            {{articleData}}
            <el-form ref="form" :model="form">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-form-item label="标题" style="display: flex">
                            <el-input  v-model="form.title"  style="width: 300px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.idChannel" placeholder="文章的类型">
                            <el-option v-for="item in selectList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form>
            <div ref="wangeditor" class="wangeditor" ></div>
            <div class="articleEdit-submit" style="display: flex;justify-content: flex-end;margin-top: 10px">
                <el-button type="primary" @click="fSubmit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    //引入轻量级富文本编辑器
    import wangeditor from 'wangeditor'

    //网络请求的方法
    import {fileImage,getChannel,fromSubmit} from "@/network/main";

    export default {
        name: "articleEdit",
        data(){
            return {
                form:{
                    title:'',
                    idChannel:'',
                },
                //分类数组
                selectList:[],

                //轻量级富文本编辑器new出来的对象
                wangEditor:'',
                //控制弹窗显示还是关闭
                dialogVisible:false
            }
        },
        props:['articleData','type','path'],
        methods:{
            //弹窗打开
            fOpen(){
                this.$nextTick(()=>{
                    //富文本编辑器
                    this.wangEditor = new wangeditor(this.$refs.wangeditor)
                    this.wangEditor.config.uploadImgServer = '/upload-img'
                    this.wangEditor.config.uploadImgMaxLength = 1
                    //上传图片
                    this.wangEditor.config.customUploadImg = function (resultFiles,insertImgFn) {
                        // resultFiles 是 input 中选中的文件列表
                        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
                        let d = resultFiles[0]
                        let g = new FormData
                        g.append('file',d)
                        console.log(g)
                        fileImage('/file',g,'post').then(res=>{
                            console.log(res)
                            // 上传图片，返回结果，将图片插入到编辑器中
                            insertImgFn(res.realFileName)
                        }).catch(err=>{
                            console.log(err)
                        })
                    }
                    this.wangEditor.create()
                    this.wangEditor.txt.html(this.articleData.content)
                })
            },
            //弹窗关闭的回掉函数
            fClose(){
                this.dialogVisible = false
                this.$emit('fClose',this.path)
            },
            //获取分类列表
            getChannel(params){
                getChannel('/channel/list',params,'get').then(res=>{
                    this.selectList = res.data
                })
            },
            //提交表单
            fSubmit(){
                let that = this
                //构造要提交的参数
                let json = {
                    author:this.articleData.author,
                    content:this.wangEditor.txt.html().replace(/\%/g,'%25'),
                    id:this.articleData.id
                }
                this.form.idChannel = parseInt(this.form.idChannel)
                Object.assign(json,this.form)
                console.log(json)
                fromSubmit('/article',json,'post').then(res=>{
                    if(res.msg == '成功'){
                        this.$message({
                            message: '提交表单成功',
                            type:'success'
                        })
                        that.form.Title = '';
                        that.form.idChannel = '';
                        that.wangEditor.txt.clear()

                        that.$emit('modifyArticle',this.path)
                        //关闭弹窗
                        that.dialogVisible = false
                    }
                }).catch(err=>{
                    this.$message.error(err)
                    console.log(err)
                })
            },
        },
        mounted(){
            //请求分类数据
            this.getChannel({})
        },
        watch:{
            type(){
              this.dialogVisible = this.type
            },
            articleData(){
                this.form.title = this.articleData.title
                this.form.idChannel = this.articleData.idChannel
            }
        }
    }
</script>

<style scoped>
    .articleEdit-nav{
        position: relative;
        margin: 15px 0;
        z-index: 2;
    }
    .wangeditor{
        position: relative;
        z-index: 1;
    }
</style>