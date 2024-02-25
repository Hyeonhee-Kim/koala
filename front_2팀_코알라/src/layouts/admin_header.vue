<template>
    <div>
      <div class="container mt-3 p-5" style="border: solid black; border-radius: 20px; font-size: 30px; font-weight: bolder;">
        <span>관리자님</span>
        <div style="margin-bottom: -20px; margin-top: -30px;">
          <div class="button-container">
            
            <div class="button-wrapper">
              <i class="fa-solid fa-circle-user fa-xl"></i>
              <router-link to="/admin/admin_member_info" class="btn btn-secondary"
                @click="setPageTitle('회원관리')">회원관리</router-link>
            </div>
  
            <div class="button-wrapper">
                <i class="fa-solid fa-box-archive fa-xl"></i>              
                <router-link to="/admin/admin_goods_manager" class="btn btn-secondary"
                @click="setPageTitle('재고 관리')">재고관리</router-link>
            </div>
  
            <div class="button-wrapper">
                <i class="fa-solid fa-circle-question fa-xl"></i>              
                <router-link to="/admin/admin_goods_qna" class="btn btn-secondary"
                @click="setPageTitle('상품QnA')">상품QnA</router-link>
            </div>
  
            <div class="button-wrapper">
                <i class="fa-solid fa-person-circle-question fa-xl"></i>              
                <router-link to="/admin/admin_inquiry_qna" class="btn btn-secondary"
                @click="setPageTitle('1:1문의')">1:1문의</router-link>
            </div>
  
            <div class="button-wrapper">
                <i class="fa-solid fa-receipt fa-xl"></i>              
                <router-link to="/admin/admin_order" class="btn btn-secondary"
                @click="setPageTitle('주문관리')">주문관리</router-link>
            </div>
  
            <div class="button-wrapper">
                <i class="fa-solid fa-newspaper fa-xl"></i>              
                <router-link to="/admin/admin_news" class="btn btn-secondary"
                @click="setPageTitle('공지사항')">공지사항</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container-lg p-3 mt-3" style="font-size:20px; font-weight: bolder">{{ pageTitle }}
        <router-link to="/admin/news_write" v-if="currentPage === '/admin/admin_news'" class="btn btn-primary "
          style="float: right;" @click="setPageTitle('공지사항 등록')">공지사항 등록 </router-link>
      </div>
      <hr class="one" style="border:solid 1px black">
    </div>
  </template>
<script>
  export default {
      data () {
          return {
              pageTitle: '', //초기 페이지명 설정
            
          };
      },
      computed: {
          currentPage() {
              return this.$route.path;
          }
      },
      created() {
       window.addEventListener('popstate', this.onBackButtonEvent);
      },
      beforeUnmount() {
       window.removeEventListener('popstate', this.onBackButtonEvent);
      },
      methods: {
      onBackButtonEvent() {
       // 뒤로가기 버튼을 눌렀을 때의 동작
       this.setPageTitleBasedOnRoute();
      },
       setPageTitle(newTitle) {
       this.pageTitle = newTitle; //페이지명을 변경하는 메소드
       },
       setPageTitleBasedOnRoute() {
          const path = this.$route.path;
          switch(path) {
              case '/qna/news_content':
                  this.setPageTitle('공지사항 상세');
                  break;
              case '/qna/news_write':
                  this.setPageTitle('공지사항 등록');
                  break;
              case '/admin/admin_member_info':
                  this.setPageTitle('회원관리');
                  break;
              case '/admin/admin_goods_manager':
                  this.setPageTitle('재고관리');
                  break;
              case '/admin/goods_add':
                  this.setPageTitle('재고관리 등록');
                  break;
              case '/admin/admin_order':
                  this.setPageTitle('주문관리');
                  break;
              case '/admin/admin_inquiry_qna':
                  this.setPageTitle('1:1문의');
                  break;
              case '/admin/admin_goods_qna':
                  this.setPageTitle('상품QnA');
                  break;
              default:
                  this.setPageTitle('공지사항');
                  break;

          }
       }
      },
  };
</script>

<!-- 이 코드는 Vue 컴포넌트의 라이프사이클 훅을 사용하여 뒤로가기 버튼(`popstate` 이벤트)을 감지하고 그에 따른 동작을 설정하는 부분입니다.

1. `created()` 메소드:
 - Vue 컴포넌트가 생성되면(`created` 라이프사이클 훅) 호출되는 메소드입니다.
 - `window.addEventListener('popstate', this.onBackButtonEvent);` 코드는 브라우저의 `popstate` 이벤트를 감지하고, 그 때 `this.onBackButtonEvent` 메소드를 실행하도록 등록합니다.
 - 이벤트 감지를 통해 뒤로가기 버튼이 눌렸을 때, `onBackButtonEvent` 메소드를 실행합니다.

2. `beforeUnmount()` 메소드:
 - Vue 컴포넌트가 파괴되기 전(`beforeUnmount` 라이프사이클 훅) 호출되는 메소드입니다.
 - `window.removeEventListener('popstate', this.onBackButtonEvent);` 코드는 `popstate` 이벤트의 이벤트 리스너를 제거합니다. 컴포넌트가 파괴되기 전에 이벤트 리스너를 제거하여 메모리 누수를 방지합니다.

즉, 위의 코드는 해당 Vue 컴포넌트가 생성될 때 `popstate` 이벤트를 감지하고, 컴포넌트가 파괴되기 전에 이벤트 감지를 해제하는 역할을 합니다. 이를 통해 뒤로가기 버튼을 눌렀을 때 `onBackButtonEvent` 메소드가 실행되어 원하는 동작을 수행할 수 있습니다. -->

<style>
    .button-container {
      display: flex;
      flex-direction:row;
      justify-content: flex-end;
      
    }
  
    .button-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 30px;
      
    }
  
    i {
      
      margin-bottom: 50px;
    }
  </style>
