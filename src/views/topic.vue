<template>
    <div>
        <h2 class="topic-title" v-text="topic.Title"></h2>
        <!-- <section class="author-info">
            <img class="avatar" :src="topic.author.avatar_url" />
            <div class="col">
                <span>{{topic.author.loginname}}</span>
                <time>
                    发布于:{{topic.create_at}}
                </time>
            </div>
            <div class="right">
                <span class="tag"
                        :class="topic.tab">
                        {{topic.tab}}
                </span>
                <span class="name">{{topic.visit_count}}次浏览</span>
            </div>
        </section> -->
        <!-- markdown文本 -->
        <section class='markdown-body topic-content' v-html="topic.Content">

        </section>
        <!-- 评论 -->
        <h3 class="topic-reply" v-show="replyShow">
            <strong>{{topic.ContentCount}}</strong>评论
        </h3>
        <!-- 评论列表 -->
        <section class="reply-list" v-show="replyShow">
            <ul>
                <li v-for="item in topic.Data">
                    <section class="user">
                        <img class="head" :src="defaultImg" />
                        <div class="info">
                            <span class="cl">
                                <span class="name" v-text="item.UserName"></span>
                                <span class="name mt10">
                                    <span></span>
                                    发布于:{{item.Time}}</span>
                            </span>
                        </div>
                    </section>
                    <div class="reply_content" v-html="item.Content"></div>
                    <!-- <nv-reply :topic.sync="topic"
                            :topic-id="topicId"
                            :reply-id="item.id"
                            :reply-to="item.author.loginname"
                            :show.sync="curReplyId"
                            v-if="userId && curReplyId === item.id">
                    </nv-reply> -->
                </li>
            </ul>
        </section>
        <!--数据不存在  -->
        <div class='no-data' v-if="noData">
            <i class="iconfont icon-empty">&#xe60a;</i>
            该话题不存在!
        </div>
        <!-- 评论 -->
        <reply :topic.sync="topic" :topic-id="topicId" v-show="replyShow">
        </reply>
        <footer>
            <div class="operation"> <img src="" alt="share" id="share"> </div>
            <div class="comment" v-link="">
                <p>我要评论</p>
            </div>
        </footer>
    </div>
</template>
<script>
    import Reply from '../components/reply.vue';
    export default {
        data (){
            let _self = this;
            return {
                topic:{},           //主题
                noData:false,       //数据为空
                topicId:'',         //节目ID
                replyData:null,      //评论数据
                curReplyId:'',      //评论id，暂时未用
                defaultImg:'dist/img/logo.png?t=123',
                replyShow:false,
                ContentCount:'' //评论数
            }
        },
        ready(){
            let _self = this;
            //获取url传的tab参数
            _self.topicId=this.$route.params.id;
            let params={
                id:this.$route.params.id,
                token:this.$route.query.token
            },address='service/ProgramDetail';
            this.$http.post(address, params).then(function(response) {
                var rep=response.json();
                if(rep.Message=='Success'){
                    this.topic=rep;
                    this.replyData=rep.Data;
                    this.replyShow=true;
                }
             }, function(response) {
                  // error callback
             });
        },
        methods:{
            //支持赞
            isUps (ups){
                let _self = this;
                return $.inArray(_self.userId,ups) >= 0;
            },
            addReply (id){
                this.curReplyId = id;
                let _self = this;
                if(!_self.userId){
                    _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
            },
            upReply (item){
                let _self = this;
                if(!_self.userId){
                    _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
                else{
                    $.ajax({
                        type:'POST',
                        url:'https://cnodejs.org/api/v1/reply/'+item.id+'/ups',
                        data:{accesstoken:localStorage.token},
                        dataType: 'json',
                        success:function(res){
                            if(res.success){
                                if(res.action == "down"){
                                    let index = $.inArray(_self.userId, item.ups);
                                    item.ups.splice(index,1);
                                }
                                else{
                                    item.ups.push(_self.userId);
                                }
                            }
                        },
                        error:function(res){
                            let error = JSON.parse(res.responseText);
                            _self.alert.txt = error.error_msg;
                            _self.alert.show = true;
                            _self.alert.hideFn();
                            return false;
                        }
                    });
                }
            }
        },
        components:{
            Reply
            // "nvHead":require('../components/header.vue'),
            // "nvAlert":require('../components/nvAlert.vue'),
            // "nvReply":require('../components/reply.vue'),
            // "nvTop":require('../components/backtotop.vue')
        }
    }
</script>
<style  lang="less" scoped >
.topic-title {
    padding: 15px 0;
    font-family: STHeiti;
    font-size: 16px;
    color: #313131;
    line-height: 1.2;
    text-align: center;
    border-bottom: 1px solid #d4d4d4;
}
iframe{
    width: 100%;
}
.author-info {
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flexbox;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: #34495e;
    font-size: 12px;
    .col {
        width: 100%;
        -webkit-flex: 1;
        -ms-flex: 1;
        -webkit-box-flex: 1;
        box-flex: 1;
        flex: 1;
    }
    .avatar {
        display: block;
        width: 40px;
        height: 40px;
        margin-right: $padding;
        border-radius: 50%;
    }
    .right{
        text-align: right;
    }
    span, time {
        display: block;
        padding: 5px 0;
    }
    .tag {
        padding: 5px 6px;
        font-size: 10px;
        font-weight: 400;
        border-radius: 4px;
        background-color: #e7e7e7;
        text-align: center;
        vertical-align: middle;
        color: #ffffff;
    }
}
.topic-content {
    padding: 15px;
    margin-top: 15px;
    background: #ffffff;
    border-bottom: solid 1px #d4d4d4;
    .from{
        color:$red;
    }
}
.topic-reply {
    color: #2c3e50;
    font-size: 16px;
    line-height: 1.5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 15px;
    border-bottom: solid 1px #d4d4d4;
    strong {
        color: #42b983;
    }
}
// .reply_num {
//     margin-top: $gap*4;
//     background-color: $colore7;
//     padding: $gap*2 0 $gap*2 $gap*2;
//     border-top: solid 1px $colord4;
//     border-bottom: solid 1px $colord4;
// }
.reply-list {
    width: 100%;
    // margin-top: $gap*3;
    // padding-bottom: 47px;
    ul {
        width: 100%;
        list-style: none;
        padding-left: 0;
        li {
            width: 100%;
            list-style: none;
            border-bottom: solid 1px #d4d4d4;
            :last-child {
                border-bottom: none;
            }
            .uped {
                // color: $color80;
            }
            .icon {
                font-size: 26px;
            }
            .from{
                // color:$red;
            }
            .language-javascript{
                // background-color:$colorf0;
                overflow-x:auto;
            }
            .user{
                display: -ms-flexbox;
                display: -webkit-box;
                display: -webkit-flex;
                display: flexbox;
                display: flex;
                width: 100%;
                margin: 15px 0;
                padding: 0 10px;
                .head{
                    display: inline-block;
                    width: 45px;
                    height: 45px;
                    border: 2px solid #fff;
                    // border-radius: 50%;
                    margin-right: 10px;

                }
                .info{
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    -webkit-box-flex: 1;
                    box-flex: 1;
                    flex: 1;
                    .name{
                        display: block;
                        color: #626262;
                    }
                }
            }
            .reply_content {
                padding: 0 15px;
                margin-bottom: 15px;
            }
        }
    }
}

footer{
    position: fixed;
    bottom: -1px;
    height: 50px;
    width: 100%;
    border-top: 1px solid #ddd;
    background-color: #fff;
    font-size: 0;
    display: none;
    .operation{
        display: inline-block;
        width: 50%;
        padding-top: 12px;
        text-align: center;
        height: 50px;
    }
    .comment{
        display: inline-block;
        width: 50%;
        background-color: #26a2ff;
        vertical-align: top;
        text-align: center;
        color: #fff;
        height: 50px;
        p{
            line-height: 50px;
            font-size: 18px;
        }
    }
}



</style>
