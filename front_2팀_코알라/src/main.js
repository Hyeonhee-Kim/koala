import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { createRouter,createWebHistory } from 'vue-router'

//layout
import layout_form from './layouts/layout_form.vue'
import admin_layout from './layouts/admin_layout.vue'
import mypage_layout from './layouts/mypage_layout.vue'

//goods
import goods_all from './views/goods/goods_all.vue'
import goods_popular from './views/goods/goods_popular.vue'
import goods_new from './views/goods/goods_new.vue'
import goods_main from './views/goods/goods_main.vue'
import goods_detail from './views/goods/goods_detail.vue'
import goods_basket from './views/goods/goods_basket.vue'
import goods_add from './views/goods/goods_add.vue'
import goods_order from './views/goods/goods_order.vue'
import goods_search from './views/goods/goods_search.vue'
import goods_payment from './views/goods/goods_payment.vue'

//auth
import join from './views/auth/join.vue'
import login from './views/auth/login.vue'
import find from './views/auth/find.vue'
import join_taste from './views/auth/join_taste.vue'
import join_select from './views/auth/join_select.vue'

// mypage
import mypage from './views/mypage/mypage.vue'
import mypage_like from './views/mypage/mypage_wish.vue'
import mypage_qna from './views/mypage/mypage_qna.vue'
import mypage_qna_write from './views/mypage/mypage_qna_write.vue'
import mypage_review from './views/mypage/mypage_review.vue'
import mypage_update from './views/mypage/mypage_update.vue'
import mypage_update_2 from './views/mypage/mypage_update_2.vue'
import mypage_review_write from './views/mypage/mypage_review_write.vue'
import mypage_order from './views/mypage/mypage_order.vue'
import mypage_order_2 from './views/mypage/mypage_order_2.vue'
import mypage_refund from './views/mypage/mypage_refund.vue'
import mypage_qna_content from './views/mypage/mypage_qna_content.vue'
import inquiry_content from './views/mypage/inquiry_content.vue'
//admin
import admin_goods_manager from './views/admin/admin_goods_manager.vue'
import admin_news from './views/admin/admin_news.vue'
import admin_news_content from './views/admin/admin_news_content.vue'
import admin_news_write from './views/admin/admin_news_write.vue'
import admin_member_info from './views/admin/admin_member_info.vue' 
import admin_goods_qna from './views/admin/admin_goods_qna.vue'
import admin_inquiry_qna from './views/admin/admin_inquiry_qna.vue'
import admin_inquiry_answer from './views/admin/admin_inquiry_answer.vue'
import admin_inquiry_content from './views/admin/admin_inquiry_content.vue'
import admin_order from './views/admin/admin_order.vue'
import admin_goods_addcontent from './views/admin/admin_goods_addcontent.vue'
import qna_write from './views/qna/qna_write.vue'
import news from './views/qna/news.vue'
import news_content from './views/qna/news_content.vue'
import admin_goods_qna_content from './views/admin/admin_goods_qna_content.vue'
import admin_goods_qna_answer from './views/admin/admin_goods_qna_answer.vue'

const routes = [
  {
    path : '/',
    name : layout_form,
    component : layout_form,
    children : [
      {
        path : '/',
        name : goods_main,
        component : goods_main,
      },
      {
        path : '/goods_new',
        name : goods_new,
        component : goods_new,
      },
      {
        path : '/goods_popular',
        name : goods_popular,
        component : goods_popular,
      },
      {
        path : '/goods_all',
        name : goods_all,
        component : goods_all,
      },
      {
        path : '/goods_basket/:member_number',
        name : goods_basket,
        component : goods_basket,
      },
      {
        path : '/goods_detail/:goods_id',
        name : goods_detail,
        component : goods_detail,
      },
      {
        path : '/goods_order/:ordertp/:goods_id',
        name : goods_order,
        component : goods_order,
      },
      {
        path : '/goods_order/:ordertp/:member_number',
        name : goods_order,
        component : goods_order,
      },
      {
        path : '/goods_search/:keyword',
        name : goods_search,
        component : goods_search,
      },
      {
        path : '/goods_payment',
        name : goods_payment,
        component : goods_payment,
      },
      {
        path : '/login',
        name : login,
        component : login,
      },
      {
        path : '/join',
        name : join,
        component : join,
      },
      {
        path : '/join_taste',
        name : join_taste,
        component : join_taste,
      },
      {
        path : '/join_select',
        name : join_select,
        component : join_select,
      },
      {
        path : '/find',
        name : find,
        component : find,
      },
      {
        path : '/news',
        name : news,
        component : news,
      },
      {
        path : 'news/newscontent',
        name : news_content,
        component : news_content,
      },
         //mypage
         {
          path:'/mypage_layout',
          name: mypage_layout,
          component: mypage_layout,
          children: [
        
        {
          path: '/mypage',
          component: mypage
        },
        {
          path: '/mypage/mypage_like',
          component: mypage_like
        },
        {
          path: '/mypage/mypage_qna',
          component: mypage_qna
        },
        {
          path: '/mypage/mypage_qna_write',
          component: mypage_qna_write
        },
        {
          path: '/mypage/mypage_qna/qna_content',
          component: mypage_qna_content
        },
        {
          path: '/mypage/mypage_qna/goods_qna_content',
          component: inquiry_content
        },
        {
          path: '/mypage/mypage_review',
          component: mypage_review
        },
        {
          path: '/mypage/mypage_review_write',
          component: mypage_review_write
        },
        {
          path: '/mypage/mypage_update',
          component: mypage_update
        },
        {
          path: '/mypage/mypage_update_2',
          component: mypage_update_2
        },
        {
          path: '/mypage/mypage_order/:order_number',
          component: mypage_order
        },
        {
          path: '/mypage/mypage_order_2/:order_number',
          component: mypage_order_2
        },
        {
          path: '/mypage/mypage_refund',
          component: mypage_refund
        },
      ]
    },

      
      {
        path:'/admin_layout',
        name: admin_layout,
        component: admin_layout,
        children: [
          //admin
          {
            path:'/admin/admin_news',
            component: admin_news,
           
          },
          {
            path:'/admin/news_write',
            component: admin_news_write,
           
          },
          {
            path: '/admin/admin_news/newscontent',
            component: admin_news_content,
            
          },
          {
            path: '/admin/admin_member_info',
            component: admin_member_info,
           
          },
          {
            path : '/admin/admin_goods_manager',
            name : admin_goods_manager,
            component : admin_goods_manager, 
          },
          {
            path: '/admin/admin_goods_qna',
            component: admin_goods_qna
           
          },
          {
            path: '/admin/admin_goods_qna/qnacontent',
            component: admin_goods_qna_content

          },
          {//상품 문의 답변 작성
            path: '/admin/admin_goods_qna/qnacontent/answer',
            component: admin_goods_qna_answer
          },

          
          {
            path: '/admin/admin_inquiry_qna',
            component: admin_inquiry_qna
           
          },
          { //1:1문의 내용
            path: '/admin/admin_inquiry_qna/qnacontent',
            component: admin_inquiry_content
           
          },
          {//1:1문의 답변 작성
            path: '/admin/admin_inquiry_qna/qnacontent/answer',
            component: admin_inquiry_answer
           
          },
          {
            path: '/admin/admin_order',
            component: admin_order
          },
          {
            path: '/admin/qna_write',
            component: qna_write
          },
          {
            path : '/admin/goods_add',
            name : goods_add,
            component : goods_add,
          },
          {
            path : '/admin/admin_goods_manager/goods_add',
            
            component : admin_goods_addcontent,
          },
        
        ]      
      },
     
    
    ]
  }
]

const router = createRouter({
  history : createWebHistory(),
  routes,
  scrollBehavior(){
    return { top: 0 }
  },
});




const app = createApp(App)
app.use(router);
app.use(store);
app.mount('#app')

// 카카오 디벨로퍼 api키
window.Kakao.init('0f643df2cc9248d96524e56af8ffd4c0');