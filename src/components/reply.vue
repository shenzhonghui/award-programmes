<template>
    <div>
        <section class="reply">
            <h4 class="detail-title">评论区</h4>
            <textarea id="content" rows="8" class="text"
                :class="{'err':hasErr}"
                v-model="content"
                placeholder='在此添加评论'>
            </textarea>
            <a class="button" @click="addReply">确定</a>
        </section>
        <!-- 模拟alert提示框 -->
        <Alert :show='show' :txt='txt'></Alert>
    </div>
</template>
<script>
    import Alert from './nvAlert.vue'
    export default {
        props: ['topic','topicId','show','txt'],
        methods:{
            addReply (){
                let _self = this;
                if(!_self.content){
                    _self.hasErr = true;
                    _self.content='';
                }
                let params={
                    id:this.$route.params.id,
                    token:this.$route.query.token,
                    content:_self.content
                },address='http://pay-t.naton.cn:8008/service/CreateComment';
                this.$http.post(address, params).then(function(response) {
                    var rep=response.json();
                    if(rep.Message=='Success'){
                        this.topic=rep;
                        this.replyData=rep.Data;
                        this.replyShow=true;
                        _self.content='';
                        _self.txt="评论成功";
                        _self.show=true;
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            _self.show = false;
                        }, 1000);
                        // alert('评论成功')
                         return false;
                    }
                 }, function(response) {
                     _self.txt = error.error_msg;
                     _self.show = true;
                     let timer;
                     clearTimeout(timer);
                     timer = setTimeout(function () {
                         _self.show = false;
                     }, 1000);
                    //  return false;
                 });
                //     let time=new Date()
                //         , linkUsers = utils.linkUsers(_self.content)
                //         , htmlText = markdown.toHTML(linkUsers) + _self.authorTxt
                //         , reply_content =$('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML
                //         , postData={accesstoken:localStorage.token,content: _self.content+ _self.authorTxt}
                //
                //     if(_self.replyId){
                //         postData.reply_id = _self.replyId;
                //     }
                //     $.ajax({
                //         type:'POST',
                //         url:'https://cnodejs.org/api/v1/topic/'+_self.topicId+'/replies',
                //         data: postData,
                //         dataType: 'json',
                //         success:function(res){
                //             if(res.success){
                //                 _self.topic.replies.push({
                //                     id:res.reply_id,
                //                     author:{
                //                         loginname:_self.userId,
                //                         avatar_url:localStorage.avatar_url
                //                     },
                //                     content:reply_content,
                //                     ups:[],
                //                     create_at:time
                //                 });
                //             }
                //             _self.content = '';
                //             if(_self.show){
                //                 _self.show = '';
                //             }
                //         },
                //         error:function(res){
                //             var error = JSON.parse(res.responseText);
                //             _self.alert.txt = error.error_msg;
                //             _self.alert.show = true;
                //             _self.alert.hideFn();
                //             return false;
                //         }
                //     });
                // }
            }
        },
        components:{
            Alert
        }
    }
</script>

<style lang="less" scoped>
/* 回复框样式 */
.reply {
    margin: 0 5px;
    .detail-title{
        padding: 15px 0;
        font-size: 16px;
        color: #313131;
        line-height: 1;
        text-align: center;
        border-bottom: 1px solid #d4d4d4;
    }
    textarea {
        padding: 10px 15px 0;
        margin: 0 0 10px;
        border: none;
        // border-top: 6px solid #f0f0f0;
        border-bottom: 6px solid #f0f0f0;
        display: block;
        width: 100%;
        height: 100px;
    }
    .button {
        display: block;
        margin: 15px auto 65px;
        width: 90%;
        color: #fff;
        font-size: 16px;
        border-radius: 3px;
        // background: #ff5a5f;
        background: #26a2ff;
        border: none;
        padding: 0;
        line-height: 44px;
        text-align: center;
    }
}
</style>
