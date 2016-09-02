<template>
    <audio src="">你的浏览器不支持播放音频</audio>
</template>
<script>
    export default {
        replace: true,
        props: ['txt','show']
    }
</script>
<style lang="less">
/**弱提示样式*/
.wx_loading {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    .wx_alert_inner {
        display: inline-block;
        margin: 0 auto;
        text-align: center;
        background-color: rgba(49, 49, 49, 0.8);
        color: #ffffff;
        border-radius: 3px;
        font-size: 14px;
        padding: 18px 25px;
        line-height: 27px;
        vertical-align: middle;
    }
}
</style>
