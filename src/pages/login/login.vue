<template>
    <div class="login">
       <signIn></signIn>
    </div>

</template>

<script>
    import signIn from "@/pages/login/components/common/signIn";
    export default {
        name: "login",
        components:{
            signIn
        }
    }
</script>

<style scoped lang="less">
    @import "~@/assets/css/normalize.css";
    @import "~@/assets/css/icon.css";
    .login{
        width: 100vw;
        height: 100vh;
        background-image: url("~@/assets/image/1.jpg");
        background-size: 100%;
    }
</style>