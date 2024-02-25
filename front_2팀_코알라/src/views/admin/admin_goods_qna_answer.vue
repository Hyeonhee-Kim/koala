<template>
  <div class="form-control" id="background">
      <form id="sendForm" @submit.prevent="onSubmitForm" >

      <div class="mb-3">
      <label for="answer" class="form-label" @click="answer()">답변</label>
      <textarea class="form-control" id="answer" v-model="answer_content" rows="6" placeholder="내용을 작성하세요."></textarea>
    </div>
  
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-warning" type="submit">등록</button>
      <button class="btn btn-secondary" type="button">취소</button>
    </div>        
  </form> 
  </div>
  
  
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
  data() {
      return {
          answer_content: '',
          status:2,

      }
  },  
  computed: {
        // user() {
        //     return this.$store.state.member; // 로그인 확인
        // }
    },
    mounted() {
        // if (this.user.member_email == '') {
        //     // 일단은 로그인 상태 체크 
        //     alert("관리자 외 접근제한 페이지입니다.");
        //     this.$router.push({ path: '/login' });
        // }
    },
  methods: {
    answer(){

    },
    onSubmitForm() {

      axios({
        url: "http://localhost:3000/qna/goods_qna_answer",
        method: "POST",
        data: {
          answer_content: this.answer_content,
          question_status:this.status,
          inquiry_no: this.$route.query.QUESTION_NUMBER
        
        }
      }).then(res => {
        console.log(res.data);
        alert("작성완료");
      }).catch(err => {
        console.log(err);
      });
      // 작성이 완료된 후에 해당 컨텐츠로 이동하는 코드
      window.location.href = "http://localhost:8080/admin/admin_goods_qna"
      },
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