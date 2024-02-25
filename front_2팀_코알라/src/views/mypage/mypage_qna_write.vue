<template>
  <!-- 글쓰기 부분 -->
  <div class="form-control" id="background">
  <form id="sendForm" @submit.prevent="onSubmitForm" >
  
      <div class="mb-3">
          <label for="writer" class="col-sm-2 col-form-label">문의 유형<span>*</span></label>
          <select class="form-select" v-model="inquiry_category" aria-label="Default select example" style="width:120px;">
              <option disabled value="0">[선택]</option>
              <option value="1">결제</option>
              <option value="2">교환/환불</option>
              <option value="3">배송</option>
              <option value="4">입고/기타</option>
            </select>
      </div>
  
      <div class="mb-3">
          <label for="writer" class="col-sm-2 col-form-label">작성자</label>

          <div class="col-sm-3">
            <h5>{{ loginUser.MEMBER_NICKNAME }}</h5>
          </div>
      </div>
      
      <div class="mb-3">
          <label for="title" class="form-label" >제목<span>*</span></label>
          <input type="text" class="form-control" id="title" v-model="inquiry_title" placeholder="제목을 작성하세요.">
      </div>
      <div class="mb-3">
      <label for="content" class="form-label" >내용<span>*</span></label>
      <textarea class="form-control" id="content" v-model="inquiry_content" rows="6" placeholder="내용을 작성하세요."></textarea>
    </div>
  
    <div class="mb-3">
      <label for="formFile" class="form-label">사진 첨부</label>
      <input class="form-control" type="file" id="formFile">
    </div>
  
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button class="btn btn-warning" type="submit">등록</button>
      <button class="btn btn-secondary" type="button" @click="cancelbt">취소</button>
    </div>        
  </form> 
  </div>
  
  
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        inquiry_title: '',
        inquiry_content: '',
        inquiry_category: 0,
        inquiry_image: "",
        qnawrite_content: '',
        loginUser: {}
      };
           },
    created() {
            this.getloginUser();
            },

    computed: {
      member() {
            return this.$store.state.member; // 로그인 확인
          },
      inquiry_categoryText() {
        switch (this.inquiry_category) {
          case 1:
            return '결제';
          case 2:
            return '교환/환불';
          case 3:
            return '배송';
          case 4:
            return '입고/기타';
          default:
            return '';
        }
      },
    },
    methods: {
      onSubmitForm() {
        if (!this.validationCheck()) {
          return;
        }
  
        axios({
          url: 'http://localhost:3000/mypage/mypage_qnawrite',
          method: 'POST',
          data: {
            inquiry_type: this.inquiry_type,
            inquiry_title: this.inquiry_title,
            inquiry_content: this.inquiry_content,
            inquiry_category: this.inquiry_category,
            inquiry_image: this.inquiry_image,
            inquiry_member_number: this.inquiry_member_number,
          },
        })
          .then(() => {
            //console.log(res.data);
            alert('문의가 작성되었습니다.');
            this.$router.push({ path: '/mypage/mypage_qna' }); // 문의 화면으로 이동
          })
          .catch((err) => {
            console.error(err);
          });
      },
      validationCheck() {
            if (this.inquiry_category === 0) {
              alert('문의유형을 선택하세요.');
              return false;
            }
            if (this.inquiry_title === '') {
              alert('문의 제목을 입력하세요');
              return false;
            }
            if (this.inquiry_content === '') {
              alert('문의하실 내용을 입력하세요.');
              return false;
            }
            return true;
          },
      async getloginUser() {
            try {
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.member.member_number}`);
                this.loginUser = response.data[0];
                
            } catch (error) {
                console.error(error);
            }
            },
      cancelbt() { //취소버튼
        this.$router.push({ path: '/mypage/mypage_qna' });  
      }
      },
  };
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
  span{
      color: red;
  }
  h5 {
    font-size: 20px;
    margin: 10px 30px;
  }
  </style>