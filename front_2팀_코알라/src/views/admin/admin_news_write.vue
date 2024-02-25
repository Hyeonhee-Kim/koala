<template>

  <!-- 글쓰기 부분 -->
  <div class="form-control" id="background">
      <form id="sendForm" @submit.prevent="onSubmitForm" >
          <div class="mb-3">
              <label for="writer" class="col-sm-2 col-form-label">작성자</label>
              <div class="col-sm-2">
                <input type="text" readonly class="form-control" id="writer" v-model="manager" value="관리자">
              </div>
          </div>
          <div class="mb-3">
              <label for="title" class="form-label" >제목</label>
              <input type="text" class="form-control" id="title" v-model="notice_title" placeholder="제목을 작성하세요.">
          </div>
          <div class="mb-3">
          <label for="content" class="form-label" >내용</label>
          <textarea class="form-control" id="content" v-model="notice_content" rows="10"></textarea>
        </div>
  
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button class="btn btn-warning" type="submit">등록</button>
          <button class="btn btn-secondary" type="button" @click="goToMain">취소</button>
        </div>        
      </form> 
  </div>
  
     
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
      data() {
          return {
              manager: '관리자',
              notice_title: '',
              notice_content: ''
          }
      },
      computed: {
          member() {
              return this.$store.state.member; //로그인 확인
          }
      },
      // mounted: {
      //     if(member.member_id == ''){
      //         alert("관리자 외 접근제한 페이지입니다.");
      //         this.$router.push({path: '/'})
      //     }
  
      // }
      methods: {
          onSubmitForm() {
              axios.post("http://localhost:3000/admin/news_write", {
                  news_writer: this.manager, //관리자로(기본값) 계속 넣기
                  news_title: this.notice_title,
                  news_content: this.notice_content
  
              }).then(res => {
                  console.log(res.data);
                  alert("작성완료");
                  this.$router.push({path: '/admin/admin_news'}); 
              }).catch(err => {
                  console.log(err);
              });
             
          },
          goToMain() {
              this.$router.push({path:'/admin/admin_news'}) 
          }
          
      }
      }
     
  </script>
  
  <style scoped>
  #background {
      /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
      height: auto;
      width: 100%;
      max-width: 1000px;
      padding: 30px;
      margin: 10px auto;
      border-style: solid ;
      border-width: 3px;
      /* border-color: gray; */
      /* border-radius: 30px; */
      /* box-shadow: 0px 1px 30px 2px rgb(138, 139, 136); */
      text-align: left;
      position: relative;
      top: 30px;
  
  }
  
  
  form {
      
      /* align-items: center; */
      display: flex;
      padding: 20px;
      flex-direction: column;
     
  }
  </style>