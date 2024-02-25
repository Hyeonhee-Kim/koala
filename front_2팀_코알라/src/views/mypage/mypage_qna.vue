<template>
  <div>
     <div class="form-control" id="background">
              
              <div class="inquiry-header">
                  <div class="title1">1:1 문의</div>
                    <div class="container">
              <div class="article-list table-common con">
                  <table style='table-layout:fixed;'>
                      <thead>
                          <tr>
                              <th scope="col">번호</th>
                              <th scope="col">문의날짜</th>
                              <th scope="col">카테고리</th>
                              <th scope="col">제목</th>
                              <th scope="col">문의상태</th>
                          </tr>
                      </thead>
                          <tbody>
                            <tr v-for="(inquiry,i) in inquirylist" :key="i">
                                  <td>{{ pageNum * pageSize + i + 1 }}</td>
                                  <td>{{ inquiry.INQUIRY_DATE.split('T')[0]}}</td>
                                  <td> {{ categoryType(inquiry.INQUIRY_CATEGORY) }}</td>
                                  <td  @click="gotoinquiryContent(inquiry.INQUIRY_NUMBER)" class="in_content">{{ inquiry.INQUIRY_TITLE}}</td>
                                  <td v-if="inquiry.INQUIRY_ANSWER !== null">
                                                 <button type="button" class="btn btn-primary" disabled>답변완료</button></td>
                                  <td v-else>미답변</td>
                              </tr>
                          </tbody>
                      </table>
                      <!--관리자 답변만 보여주는 모달창-->
                      <!-- <div class="modal-wrap" v-show="modalCheck"><div class="modal-container">
                        <div class="modal-title" style="padding: 5%; text-align: center; font-weight: bolder;" >답변내용:{{ inquiry.INQUIRY_ANSWER }}</div>
                        <div class="modal-btn d-flex justify-content-end">
                        <button class="btn btn-secondary " @click="modalClose()">닫기</button></div></div></div> -->
                  </div>
              </div>
              <div class="d-grid d-md-flex justify-content-center">
                      <button class="btn btn-write" type="submit" @click="goToQnaWrite()" style="width: 150px;">문의하기</button>
              </div>
          </div>
          </div>

          <div class="form-control" id="background">
          <div class="inquiry-header">
              <div class="title1">나의 상품 문의</div>
                    <div class="container">
              <div class="article-list table-common con">
                  <table style='table-layout:fixed;'>
                      <thead>
                          <tr>
                              <th scope="col">번호</th>
                              <th scope="col">문의날짜</th>
                              <th scope="col">카테고리</th>
                              <th scope="col">제목</th>
                              <th scope="col">문의상태</th>
                  
                          </tr>
                      </thead>
                          <tbody>
                            <tr v-for="(question,i) in questionlist" :key="i">
                                  <td>{{ pageNum * pageSize + i + 1 }}</td>
                                    <td>{{ question.QUESTION_DATE.split('T')[0]}}</td>
                                    <td>{{ categoryType(question.QUESTION_CATEGORY) }}</td>
                                    <td>{{ question.QUESTION_TITLE}}</td>
                                    <td v-if="question.QUESTION_ANSWER !== null">
                                        <button type="button" class="btn btn-primary"  @click="goTogoodsDetail(question.QUESTION_NUMBER)" >답변완료</button></td>
                                    <td v-else>미답변</td>
                              </tr >
                          </tbody>
                      </table>
                
                  </div>
              </div>
          </div>
       </div>
  </div>


</template>

<script>
  import axios from 'axios'

 export default {
  
      data() {
        return {
            questionlist: [], //1:1
            inquirylist: [],   //나의 상품문의
            pageNum:0,
            pageSize: 5, //한페이지에 보여지는 정보 갯수
            currentPage: 0,
            member_number:this.$store.state.member.member_number //현재 게시판의 총 글 개수
      }
    },
    computed: {
      member() {
            return this.$store.state.member; // 로그인 확인
          },
     
    },
    mounted() {            
          axios({ // 게시글 가져오기
                url: "http://localhost:3000/mypage/inquiry_list",
                method:"GET",
                data: { 
                  page: this.$route.query.page,
                  pagesize: this.pageSize,
                  
                },
              }).then(res => {
                this.inquirylist = res.data;
              }).catch(err => {
                console.log(err);
              });

            axios({
                url: "http://localhost:3000/mypage/inquiry_cnt",
                method: "POST",
                data: {
                  page: this.$route.query.page,

                    },
                      }).then(res => {
                          this.inquirycnt = res.data;
                      }).catch(err => {
                        console.log(err);
                      });
                     
                      
            axios({ 
                url: "http://localhost:3000/mypage/question_list",
                method:"GET",
                data: { 
                  page: this.$route.query.page,
                  pagesize: this.pageSize
                },
              }).then(res => {
                this.questionlist = res.data;
              }).catch(err => {
                console.log(err);
              });

            axios({
                url: "http://localhost:3000/mypage/question_cnt",
                method: "POST",
                data: {
                  page: this.$route.query.page,

                    },
                      }).then(res => {
                          this.questioncnt = res.data;
                      }).catch(err => {
                        console.log(err);
                      });
         }, 
                     
      methods: {
      
          goToQnaWrite() {
            this.$router.push({ path: '/mypage/mypage_qna_write' }); 
          },
          goTogoodsDetail(QUESTION_NUMBER) {
            window.location.href = window.location.pathname + '/goods_qna_content?QUESTION_NUMBER=' + QUESTION_NUMBER   
                    },
          gotoinquiryContent(INQUIRY_NUMBER) {
            window.location.href = window.location.pathname + '/qna_content?INQUIRY_NUMBER=' + INQUIRY_NUMBER
          },

          categoryType(socialType) {
            
            if (socialType == 1) {
                return '결제';
            } else if (socialType == 2) {
                return '교환/환불';
            } else if (socialType == 3) {
                return '배송';
            } else if (socialType == 4) {
                return '입고/기타';
            }
        },

        modalClose(){
            this.modalCheck=false;
        },
        
      }

};

</script>

<style scoped>

  #background {
  height: auto;
  width: 100%;
  max-width: 1100px;
  padding: 30px;
  margin: 10px auto;
  border-style: solid ;
  border-width: 3px;
  text-align: left;
  position: relative;
  top: 30px;
  
  }

 .container {
      display: flex;
      align-items: stretch; /* 큰 사각형이 테이블의 높이에 맞게 늘어나도록 설정 */
      border: 2px;
  }

  html {
    font-family: "Noto Sans KR", sans-serif;
  }
  
  /* 노말라이즈 */
  body, ul, li, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  a:link {
    color: lightblue;
  }
  
  /* 라이브러리 */
  .con {
    margin: 0 auto;
  }
  
  .img-box>img {
    width: 100%;
    display: block;
  }
  
  .row::after {
    content: "";
    display: block;
    clear: both;
  }
  
  .cell {
    float: left;
    box-sizing: border-box;
  }
  
  .cell-right {
    float: right;
    box-sizing: border-box;
  }
  
  .margin-0-auto {
    margin: 0 auto;
  }
  
  .block {
    display: block;
  }
  
  .inline-block {
    display: inline-block;
  }
  
  .text-align-center {
    text-align: center;
  }
  
  .line-height-0-ch-only {
    line-height: 10;
  }
  
  .line-height-0-ch-only>* {
    line-height: normal;
  }
  
  .relative {
    position: relative;
  }
  
  .absolute-left {
    position: absolute;
    left: 0;
  }
  
  .absolute-right {
    position: absolute;
    right: 0;
  }
  
  .absolute-middle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
  /* 커스텀 */
  /* 반응형 레이아웃 */
  .con {
    max-width: 1300px;
  }
  
  .con-min-width {
    min-width: 320px;
  }
  
  .top-menu a {
    text-decoration: none;
    color: gray;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  html, body { 
    overflow-x: hidden;
  }
  
  .table-common>table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table-common .btn-box {
    text-align:center;
    
  }
  
  .table-common>table th, .table-common>table td {
    border: 1px solid black;
    padding: 10px;
  }
  
  .article-list table {
      border:none;   
      border-top:2px solid lightgray;
      border-bottom:2px solid lightgray;
      margin-top: 30px;
  }
  
  .article-list > table th, .article-list > table td {
      border:none;
  }
  
  .article-list > table td {
      border-bottom:1px solid lightgray;
  }
  
  .article-list > table thead {
      border-bottom:2px solid lightgray;
      background-color:#F5F5F5;
  }
  
  .article-detail {
      border:2px solid lightgray;
  }
  
  .article-detail > table {
      border:none;
      width:calc(100% - 100px);
  }
  
  .article-detail > table th, .article-detail > table td {
      border:none;
  }
  
  .article-detail > table tr:not(:last-child) {
      border-bottom:1px solid lightgray;
  }
  
  .article-detail > table tr:not(.article-body), .article-detail > table tr:not(.article-body) > td{
      height:20px;
      font-size:0.8rem;
  }
  
  .article-detail > table tr.article-title > td {
      height:40px;
      font-weight:bold;
      font-size:1.2rem;
  }
  
  .article-detail > table td:last-child {
      padding-right:100px;
  }
  
  .article-detail > .article-writer {
      width:100px;
      height:102px;
      background-color:lightgray;
      border-bottom:1px solid lightgray;
      text-align:center;
  }
  
  .article-detail > .article-writer .writer-icon {
      margin:0 auto;
      background-color:white;
      width:80px;
      height:80px;
      border-radius:50%;
  }
  
  .reply {
      margin-top:20px;
      border:2px solid lightgray;
      padding:15px;
      box-sizing:border-box;
  }
  
  .reply-form {
      padding:10px;
  }
  
  .reply-form > form input[type="text"] {
      width:200px;
  }
  
  .reply-form > form textarea {
      width:calc(100% - 100px);
      min-height:40px;
  }
  
  .reply-form > form input[type="submit"] {
      width:80px;
      height:40px;
      transform:translatey(-40%);
  }
  
  .reply-form > form > div:not(:last-child) {
      margin-bottom:5px;
  }
  
  .reply-list > table {
      border:none;
  }
  
  .reply-list > table th {
      display:none;
  }
  
  .reply-list > table td {
      border:none;
  }
  
  .reply-list > table tr:nth-child(2n+1) {
      background-color:rgba(0,0,0,0.06);
  }
  
  .reply-list > table td:first-child {
      font-weight:bold;
  }
  
  .reply-list > table td:first-child::after {
      content:" : ";
      font-weight:bold;
  }

  .title1 {
  font-weight: bold;
  color: black;
  margin-right: auto;
  font-size: 20px;
  }

  .inquiry-header{
      margin-bottom: 40px;
  }
  
  .btn-write {
      margin-top: 30px;
      background-color: rgb(34, 176, 241);
      font-size: 20px;
  }
  .in_content:hover {
    color: blue;
    font-size: 20px;
  }
</style>