<script>
    import Alert from '../components/nvAlert.vue'
    export default {
        data:function(){
            let _self=this;
            return {
                myTopics:null,
                totalTickets:0,
                token:'',
                /*弱提示*/
                alert: {
                    txt: '',
                    show: false,
                    hideFn:function(){
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            _self.alert.show = false;
                        }, 1000);
                    }
                }
            }
        },
        ready(){
            this.getTopics();
        },
        methods:{
            getTopics (){
                let _self=this;
                let avatar=this.$route.query.avatar;
                avatar=decodeURI(avatar);
                let start=avatar.indexOf('token');
                avatar=avatar.substr(start+6,32)
                this.token=avatar;
                let params={
                    token:this.token,
                    pageCurrent:1,
                    pageSize:20
                },address='JSON/program.json';
                this.$http.get(address).then(function(response) {
                    var rep=response.json();
                    if(rep.Message=='Success'){
                        this.myTopics=rep.Data;
                        this.totalTickets=rep.LikeCount;
                    }
                 }, function(response) {
                     _self.alert.txt='加载失败'
                      _self.alert.show=true;
                 });
            },
            //滚动加载数据
            getScrollData (){
                if(this.scroll){
                    let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
                    if ($(document).height() <= totalheight + 200) {
                        this.scroll = false;
                        this.searchKey.limit += 20;
                        this.getTopics();
                    }
                }
            },
            //评论
            doComment(id){
                this.$route.router.go({name:'comment',params:{id:id},query:{token:this.token}});
            },
            //点赞
            doAgree(id){
                let _self=this;
                _self.alert.txt='活动已结束!';
                _self.alert.show=true;
                _self.alert.hideFn();
                return;
                //判断是否点赞超过6次
                let num=parseInt(_self.totalTickets);
                if(num>5){
                    _self.alert.txt='每人仅有6票哟!';
                    _self.alert.show=true;
                    _self.alert.hideFn();
                    return;
                }
                let params={
                    id:id,
                    token:this.token
                },address='service/Like';
                this.$http.post(address, params).then(function(response) {
                    var rep=response.json();
                    if(rep.Message=='Success'){
                        this.myTopics=rep.Data;
                        this.totalTickets=rep.LikeCount;
                    }
                 }, function(response) {
                      // error callback
                 });
            },
            //获取激活类名
            getActiveCls(tab){
                let str='';
                if(tab){
                    str='active'
                }
                return str;
            }


        },
        components: {
            Alert
        }
    };
</script>
<template>
<div>
    <div id="list-page">
    <div class="header-banner">
        <img src="../assets/images/1.png" alt=""  v-link="{name:'intro'}"/>
    </div>
    <section id="page">
        <!-- 首页列表 -->
        <ul class="posts-list">
            <li v-for="item in myTopics" v-link="{name:'topic',params:{id:item.ID},query:{token:this.token}}" track-by="ID">
                <dl class="content">
                    <dt>
                        <!-- <a class="default-avater"> -->
                        <a class="default-avater">
                            <!-- <img src="../assets/images/default_trans.png" v-lazyload:opt.fadein="item.ImgPath" width="100%" height="100%"> -->
                            <img :src="item.ImgPath">
                            <!-- <img v-lazy="item.ImgPath"> -->
                        </a>
                    </dt>
                    <dd>
                        <p><span>节目名称:</span>{{item.Name}}</p>
                        <p><span>表演单位:</span> {{item.Performer}}</p>
                        <!-- <p class="description"></p> -->
                        <p class="description">
                            <!--点赞&评论 -->
                            <span @click.stop="doComment(item.ID)"><i></i><b  v-text="item.TotalCommentCount+''"></b></span>
                            <span :class="item.IsLike==true?'active':''" @click.stop="doAgree(item.ID)"><i></i><b  v-text="item.TotalLikeCount+''"></b></span>

                        </p>
                    </dd>
                </dl>
            </li>
        </ul>
    </section>
    <!-- <nv-top></nv-top> -->
    <!-- 模拟alert提示框 -->
    <Alert :show='alert.show' :txt='alert.txt'></Alert>
    </div>
</div>
</template>

<style lang="less">

    .header-banner{
        img{
            width: 100%;
        }
    }
    .posts-list {
        background-color: #fff;
        li {
            padding: 5px 15px;
        }
        .content {
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            padding: 15px 0 0;
            font-size: 12px;
            background: #fff;
            border-bottom: 1px solid #d4d4d4;
            dt{
                width: 90px;
                height: 90px;
                margin: 0 12px 0 0;
                .default-avater{
                    position: relative;
                    display: block;
                    width: 80px;
                    height: 80px;
                    // border-radius: 250px;
                    // background: url(http://pc.pic.uhouzz.com/webapp/images/be1964664ce5ced931ecf6698f2423aa.jpg) no-repeat center;
                    background-size:cover;
                    background-color:#fff;
                    margin: 0 auto;
                    img{
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        -webkit-transform: translate(-50%,-50%);
                          -ms-transform: translate(-50%,-50%);
                              transform: translate(-50%,-50%);
                        width: 80px;
                        height: auto;
                    }
                }
            }
            dd{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
                p{
                    // margin: 3px 0;
                    color: #626262;
                    font-size: 14px;
                    span{
                        color: #a0a0a0;
                    }
                }
                .description {
                    overflow: hidden;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    text-overflow: ellipsis;
                    -webkit-justify-content:space-between;
	                justify-content:space-between;
                    display: -webkit-box;
                    // -webkit-line-clamp: 2;
                    // -webkit-box-orient: vertical;
                    text-align: right;
                    span{
                        display: block;
                        -webkit-flex: 1;
                        -ms-flex: 1;
                        -webkit-box-flex: 1;
                        box-flex: 1;
                        flex: 1;
                        i,b{
                            display: block;
                            // -webkit-flex: 1;
                            // -ms-flex: 1;
                            // -webkit-box-flex: 1;
                            // box-flex: 1;
                            // flex: 1;
                        }
                    }
                    span:first-child{
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        text-align: left;
                        i{
                            width: 70%;
                            background: url(../assets/images/comment-bg.png) no-repeat right center;
                            -ms-background-size:auto 80%;
                            -webkit-background-size:auto 80%;
                            background-size:auto 80%;
                        }
                        b{
                            padding-left:5px;
                        }
                    }
                    span:last-child{
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        text-align: left;
                        i{
                            width: 70%;
                            background: url(../assets/images/ag-bg.png) no-repeat right center;
                            -ms-background-size:auto 80%;
                            -webkit-background-size:auto 80%;
                            background-size:auto 80%;
                        }
                        b{
                            padding-left:5px;
                        }
                    }
                    .active:last-child{
                        color:#2390d4;
                        i{

                            background: url(../assets/images/ag-bg-active.png) no-repeat right center;
                            -ms-background-size:auto 80%;
                            -webkit-background-size:auto 80%;
                            background-size:auto 80%;
                        }
                    }
                }
            }

        }
        .avatar {
             display: block;
             width: 60px;
             height: 60px;
            //  border-radius: 50%;
             margin-right: 10px;
             border: 1px solid #F3F3F3;
        }
        .info {
            display: block;
            width: 100%;
            -webkit-flex: 1;
            -ms-flex: 1;
            -webkit-box-flex: 1;
            box-flex: 1;
            flex: 1;
        }
        p:first-child {
            font-size: 14px;
        }
        p {
            padding: 3px 0;
            // @extend .display-flex;
            color: #34495e;
            font-size: 12px;
            .name, time:first-child {
               font-size: 14px;
            }
        }
    }
</style>
