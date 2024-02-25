<template>
  <div>
    <div class="container-lg d-flex flex-wrap justify-content-start justifent-lg-start mt-4 pb-3">
    </div>  
  <div class="article-list table-common con" style="margin-bottom: 20px;">
    <!-- 테이블 높이를 너비 100%로 수정 -->
      <table style='width:100%;table-layout:fixed;'> 
          <thead>
              <tr>
                  <th scope="col">번호</th>
                  <th scope="col">제목</th>
                  <th scope="col">작성자</th>
                  <th scope="col">작성일</th>
                  <th scope="col">조회수</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,i) in contentlist" :key="i" @click="goToContent(item.NEWS_NUMBER)">
                <td>{{ pageNum * pageSize + i + 1 }}</td>
                <td @click="goToContent(item.NEWS_NUMBER)" style="cursor:pointer;">{{item.NEWS_TITLE}}</td>
                <td>{{item.NEWS_WRITER}}</td>
                <td>{{item.NEWS_DATE.split('T')[0]}}</td> 
                <td>{{item.read}}</td> 
              </tr>
             
          </tbody>
      </table>
  </div>
<br/>
      <!-- 페이징 -->
      <div class="text-center">
        <button @click="prevPage" class="page-btn">이전</button>
        <span class="page-count">{{$route.query.page}}/{{totalpage}} 페이지</span>
        <button @click="nextPage" class="page-btn">다음</button>
      </div>

</div>

</template>
<script>
import axios from 'axios'

export default{
  data() {
    return {
      contentlist: [], //현재 게시판과 페이지에 맞는 글 리스트들
      pageSize: 5, //한페이지에 보여지는 정보 갯수
      pageNum: 0,
      currentPage: 0, //현재 게시판의 총 글 개수
    }
  },
 
  computed: {
    // user() {
    //   return this.$store.state.member; //로그인 확인
    // },
    totalpage() {
      if(this.currentPage == 0) { // 현재 게시판 글 갯수가 0개일때 총 페이지가 0이 되는거 방지
        return 1; 
      }else {
        return Math.ceil(this.currentPage/10); // (글 갯수/10)한 후 올림 연산을 통해 총 페이지 계산
      }
    }
  },
  mounted() { // mounted는 페이지가 켜질때 실행됨, 페이지가 켜질때 글 리스트들을 db에서 불러옴
    // this.$parent.setPageTitle('공지사항');

    axios({ // 게시글 작성자, 제목, 작성일 가져오기
      url: "http://localhost:3000/admin/news_list",
      method:"GET",
      data: { 
        page: this.$route.query.page,
        pagesize: this.pageSize
      },
    }).then(res => {
      this.contentlist = res.data;
    }).catch(err => {
      alert('게시물을 불러오는 동안 에러 발생: ' + err);
    });
    // 현재 게시판 글 개수 가져오는 axios
    axios({
          url: "http://localhost:3000/admin/board_list_cnt",
          method: "POST",
          data: {
            page: this.$route.query.page,

          },
      }).then(res => {
          this.currentPage = res.data;
      }).catch(err => {
          alert(err);
      });

      
  },

  methods:{
    // noticeInsert(){
    //   this.$router.push({path:'/noticewrite'})
    // },
    confirmDeleteContent() {

    },
    goToContent(NEWS_NUMBER) {
      window.location.href = window.location.pathname + '/newscontent?NEWS_NUMBER=' + NEWS_NUMBER
      //window.location.pathname은 localhost:8080/adminmain 임
    },
    // 페이징 메소드 정의
    prevPage() {

    },
    nextPage() {

    }

  }
    
}
    


</script>



<style>
.notice {
  display: block;
  flex-direction: column;
  margin-top: 20px;
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

</style>
