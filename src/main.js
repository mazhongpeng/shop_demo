import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图组件---全局组件
import Carousel from '@/components/Carousel'
// 分页器组件---全局组件
import Pagination from '@/components/Pagination'
Vue.config.productionTip = false
import { Button, MessageBox } from 'element-ui';
// 第一个参数：全局组件的名字 第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination)
    // 注册全局组件
Vue.component(Button.name, Button);
// ElementUI组成组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store';
// 引入MockServer.js----mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"
// 统一接口api文件夹里面全部请求函数
// 统一引入
import * as API from '@/api'
import atm from '@/assets/images/l.gif'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload, {
        // 懒加载默认图
        loading: atm,
    })
    // 引入表单校验插件
import '@/plugins/validate'
new Vue({
    render: h => h(App),
    // 全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this,
            Vue.prototype.$API = API
    },
    // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
    router,
    // 注册仓库
    store
}).$mount('#app')