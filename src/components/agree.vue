<template>
    <div>
        <span @click="doAgree(topicId)" v-text="agreeText">点赞</span>
    </div>
</template>
<script>
    export default {
        props: ['agreeCount','topicId',agreeText],
        // data (){
        //     return {
        //         hasErr:false,
        //         content:'',
        //         userId:localStorage.userId || '',
        //         authorTxt:'<br/><br/><a class="form" href="https://github.com/shinygang/Vue-cnodejs">I‘m webapp-cnodejs-vue</a>',
        //     }
        // },
        // ready (){
        //     var _self = this;
        //     if(_self.replyTo){
        //         _self.content = '@'+_self.replyTo+' ';
        //     }
        // },
        methods:{
            //点赞
            doAgree(id){
                let params={
                    id:id,
                    token:this.$route.query.token
                },address='';
                let _self=this;
                this.$http.post(address, params).then(function(response) {
                      // set data on vm
                      _self.topics.
                      this.$set('someData', response.json())
                 }, function(response) {
                      // error callback
                 });
            },
            addReply (){
                let _self = this;
                if(!_self.content){
                    _self.hasErr = true;
                }
                else{

                }
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
        }
    }
</script>
