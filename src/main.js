import Vue from 'vue';
import Router from 'vue-router';//get vue-router
import VueResource from 'vue-resource';//get vue-$http
import VueTap from 'vue-tap';
//导入界面
import App from './views/index.vue';
import List from './views/list.vue';
import Topic from './views/topic.vue';
import Intro from './views/intro.vue';
import Comment from './views/comment.vue';

Vue.use(Router);//can use vue-router
Vue.use(VueResource);//can use $http
Vue.use(VueTap);//can use vue-tap
Vue.config.devtools = true;
// Vue.http.options.emulateJSON = true;
//实例化VueRouter
let router = new Router({
    hashbang: true,
    history: true,
    saveScrollPosition: true,
    transitionOnLoad: true
});

router.map({
    '/': { //首页
        name: 'list',
        component: List
    },
    '/topic/:id': { //专题
        name: 'topic',
        component: Topic
    },
    '/comment/:id': { //评论页
        name: 'comment',
        component: Comment
    },
    '/intro': { //介绍页
        name: 'intro',
        component: Intro
    }
});


// save position for demo page
let demoScrollTop = 0;

// function saveDemoScrollTop() {
//     demoScrollTop = window.scrollY;
// }

// router.beforeEach(function(transition) {
//     if (transition.to.fullPath !== '/demo') {
//         window.removeEventListener('scroll', saveDemoScrollTop, false)
//     }
//     if (/\/http/.test(transition.to.path)) {
//         let url = transition.to.path.split('http')[1]
//         window.location.href = `http${url}`
//     } else {
//         if (/\/demo\/component\/\w+/.test(transition.to.path)) {
//             router.go({
//                 replace: true,
//                 path: transition.to.path.replace('/demo', ''),
//                 append: false
//             })
//         } else {
//             transition.next()
//         }
//     }
// })
//
// router.afterEach(function(transition) {
//     if (transition.to.path !== '/demo') {
//         window.scrollTo(0, 0)
//     } else {
//         window.removeEventListener('scroll', saveDemoScrollTop, false)
//             // if from component page
//         if (demoScrollTop && /component/.test(transition.from.path)) {
//             setTimeout(function() {
//                 window.scrollTo(0, demoScrollTop)
//             }, 100)
//         }
//         setTimeout(function() {
//             window.addEventListener('scroll', saveDemoScrollTop,
//                 false)
//         }, 1000)
//     }
// })
router.start(App, '#app')
