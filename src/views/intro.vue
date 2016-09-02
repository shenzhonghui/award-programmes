<script>
    export default {
        data () {
            return {
                data: {
                        title:'活动规则',
                        lists:[
                            "评选方式：在纳通APP20周年庆版块中对各个节目进行点赞和评论。依据点赞的数量进行评选。若节目点赞数量相同，则依据评论数量进行评选。我们将为获奖的节目提供丰厚的团建费用。(每人最多可以给6个节目进行点赞和评论)",
                            "评选时间：截止至7月22日",
                            "活动参与路径：下载纳通APP——20周年庆版块——节目评选",
                            "奖项公布：本次评选结果将会在7月29日在OA上发布。"
                        ]
                    }
            }
        }
    };
</script>
<template>
<div>
    <div id="intro-page">
        <div class="detail-box">
            <h4 class="activity-detail-title">纳通集团20周年庆典晚会<br/>我最喜爱的优秀节目评选活动</h4>
            <div class="content">
                <div class="describe">
                    大道之始，步履维艰；纳川成海，厚德百年。在全体演职人员的通力协作下，纳通集团20周年庆典晚会圆满落幕。为了对全体演员的优秀表演给予肯定和鼓励，纳通集团20周年庆典晚会“我最喜爱的优秀节目评选”活动正在进行，期待各位纳通人的参与。
                </div>
            </div>
        </div>
        <div class="m-list" >
            <h4 class="activity-detail-title">评选规则</h4>
            <ul>
                <li  v-for="item in data.lists">
                    {{item}}
                </li>
            </ul>
            <h4 class="activity-detail-title">奖项设置</h4>
            <div class="pt">
                <ol>
                    <li><span>一等奖</span><span>1名</span></li>
                    <li><span>二等奖</span><span>2名</span></li>
                    <li><span>三等奖</span><span>3名</span></li>
                    <li><span>最佳风采奖</span><span>5名</span></li>
                </ol>
                <p>荣耀廿载</p>
                <p>辉煌百年</p>
                <p>愿此刻铭记</p>
                <p>不负每一份努力</p>
            </div>
        </div>
        <footer class="fix-bottom">
            <section class="contact">
                <p>&emsp;&emsp;</p>
                <p>纳通集团20周年庆典晚会组</p>
            </section>
        </footer>
    </div>
</div>
</template>
<style lang="less" scoped>
        .detail-box {
            padding: 0 15px 10px;
            margin: 10px 0;
            background: #ffffff;
        }
        .activity-detail-title {
            padding: 15px 0;
            font-family: STHeiti;
            font-size: 16px;
            color: #313131;
            line-height: 1.2;
            text-align: center;
            border-bottom: 1px solid #d4d4d4;
        }
        .detail-box .content {
            color: #626262;
            background: #fff;
            font-size: 15px;
        }
        .detail-box .describe {
            margin-top: 10px;
            font-size: 15px;
            color: #626262;
            color: #666;
            line-height: 1.5;
            font-weight: 200;
            overflow: hidden;
        }
        footer {
            position: relative;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            padding-top: 50px;
            font-size: 12px;
            color: #999;
            text-align: center;
            // background: #313131;
            background-size: 100%;
            line-height: 1;
        }
        footer.fix-bottom{
            padding: 40px 0;
        }
        footer .contact {
            padding:0 15px;
            text-align: right;
            font-size: 14px;
            line-height: 20px;
        }
        .m-list {
            // margin-top: 15px;
            padding: 0 15px;
            .m-list-title{
                font-size: 18px;
                color: #333;
                padding-left: 10px;
                border-left: 3px solid #26a2ff;
                line-height: 1;
            }
            ul{
                padding-left: 15px;
            }
            ul li:first-child {
                margin-top: 18px;
            }
            ul li{
                list-style: inherit;
                font-size: 14px;
                color: #626262;
                margin-top: 12px;
                line-height: 1.5;
            }
            .pt{
                ol{
                    margin-top: 10px;
                    background-color: #fff;
                    li{
                        display: -webkit-flex;
                        display: -moz-flex;
                        display: -ms-flex;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        -webkit-box-pack: justify;
                        -webkit-justify-content: space-between;
                        -ms-flex-pack: justify;
                        justify-content: space-between;
                        color: #626262;
                        font-size: 15px;
                        line-height: 1;
                        padding: 10px 0;
                        border-bottom: 1px solid #f0f0f0;
                        span{
                            display: block;
                            -webkit-flex: 1;
                            -moz-flex: 1;
                            -ms-flex: 1;
                            -webkit-box-flex: 1;
                            flex: 1;
                            text-align: center;
                            color: #626262;
                        }

                    }

                }
                p{
                    padding: 10px 0;
                    font-family: STHeiti;
                    font-size: 16px;
                    color: #313131;
                    line-height: 1.2;
                    text-align: center;
                    font-weight: 600;
                }
            }
        }
</style>
