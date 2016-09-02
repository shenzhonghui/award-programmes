<template>
<div>
  

        <!-- 路由外链 -->
        <router-view transition="fade" transition-mode="out-in"></router-view>
</div>
</template>
<style lang="less">
    @import '../assets/scss/iconfont/iconfont.css';
    @import '../assets/scss/github-markdown.css';
    .index{
        width: 100%;
        background-color: #fff;
        margin-top: 40%;
    }
    .back-transition {
      transition: transform .5s ease;
    }
    .back-enter{
      transform: translate(100%,0);
    }
    .back-leave {
      transform: translate(-200%,0);
    }
    .fade-transition {
          transition: opacity .3s ease;
    }
    .fade-enter, .fade-leave {
      opacity: 0;
    }
</style>
