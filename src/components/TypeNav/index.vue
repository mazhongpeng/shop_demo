<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <div class="sort" v-show="show">
                    <div class="all-sort-list2"  @click="goSearch">
                        <div class="item" v-for="(c1,index) in  categoryList" :key="c1.categoryId" :class="{cur:currenIndex==index}">
                            <h3 @mouseenter="changeIndex(index)" >
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <!-- <div class="item-list clearfix" v-show="currenIndex==index"> -->
                            <div class="item-list clearfix" :style="{display:currenIndex==index?'block':'none'}">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId" >
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
// 引入方式:是把lodash全部功能函数引入
// 最好的引入方式:按需加载
import throttle from 'lodash/throttle'
export default {
name:'TypeNav',
data(){
  return{
     currenIndex:-1,
     show:true
  }
},
 mounted(){
    // 当组件挂载完毕,让show属性变为false
    // 如果不是Home路由组件,将typeNav进行隐藏
    if(this.$route.path!='/home'){
       this.show=false
    }
   
 },
 computed:{
    ...mapState({
        // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
        // 注入一个参数state,其实即为大仓库中的数据
        categoryList:state=>state.home.categoryList
    })
 },
 methods:{
  //   鼠标进入修改响应式数据currentIndex属性
  //   throttle回调函数别用箭头函数,否则会出现this指定上下文的问题
  changeIndex:throttle(function (index){
 // 正常情况(用户慢慢的操作):鼠标进入,每一个一级分类h3,都会触发鼠标进入事件
 // 非正常情况(用户操作很快):本身全部的一级分类都应该触发鼠标进入事件,但是经过测试,只有部分h3触发了事件
 // 就是由于用户行为过快,导致浏览器反应不过来.如果当前回调函数中有一些大量业务,有可能出现卡顿现象
    this.currenIndex=index
   },50),
//    当鼠标移入的时候,让商品分类列表进行展示
   enterShow(){
      this.show=true;
   },
   //    当鼠标移入的时候,让商品分类列表进行展示
   leaveShow(){
 this.currenIndex=-1
 if(this.$route.path!='/home'){
     this.show=false
 }
},
//    进行路由的跳转
   goSearch(){
// 最好的解决方案:编程式导航+事件委派
// 利用事件委派存在一些问题:1:点击一定是a标签2.如何获取参数[1,2,3级分类的产品的名字,id]
// 点击a标签的时候,才会进行路由跳转[怎么能确定点击的一定是a标签]
// 存在另外一个问题:即使你能确定点击的是a标签,如何区分是一级,二级,三级分类的标签
// 第一个问题:把子节点当中a标签,我加上自定义属性data-categoryName,其余的子节点是没有的
  let element=event.target;
//  获取到当前出发的事件的节点[h3,a,dt,dl],需要带有data-categoryname这样节点[一定是a标签]
// 节点有一个属性dataset属性,可以获取节点的自定义属性与属性值
   let{categoryname,category1id,category2id,category3id}=element.dataset;
//    如果标签身上拥有categoryname一定是a标签
   if(categoryname){
      let location={name:'search'};
      let query={categoryName:categoryname};
      if(category1id){
       query.category1Id=category1id
      }else if(category2id){
        query.category2Id=category2id    
      }else{
        query.category3Id=category3id
      }
    //   如果有prams参数,把params参数带上
    if(this.$route.params){
        location.query=query;
        location.params=this.$route.params
        this.$router.push(location)
    }
   }
   }
 }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;
    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;
        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }
        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }
        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;
            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;
                        a {
                            color: #333;
                        }
                    }
                    .item-list {
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;
                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;
                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;
                                &.fore {
                                    border-top: 0;
                                }
                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }
                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;
                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
                .cur{
                    background: skyblue;
                }
            }
        }
    }
}
</style>