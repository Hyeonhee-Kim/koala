<template>
  
  <main class="mt-3">
    <div class="container">

      <div class="empty" v-if="reviewList == null" >
       <span>
        아직 작성한 리뷰가 없습니다. 
        주문 내역에서 리뷰를 작성해주세요.
       </span>
    </div>
    
        <div v-else class="article-list table-common con">
            <table style=' height:400px;table-layout:fixed;'>
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">상품명</th>
                        <th scope="col">썸네일</th>
                        <th scope="col">별점</th>
                        <th scope="col">내용</th>
                        <th scope="col">작성일</th>
                    </tr>
                </thead>
                    <tbody>
                      <tr v-for="(review,i) in reviewList" :key="i">
                            <td>{{ pageNum * pageSize + i + 1}}</td>
                            <td>{{ review.REVIEW_GOODS_ID }}</td>
                            <td >
                              <img v-if="!review.REVIEW_IMAGE" src="../../assets/imgEmptyInput.png" alt="..." style="max-width: 50%;">
                              <img v-else :height="50" :src="require(`../../../../node-back/uploads/uploadGoods/${review.REVIEW_IMAGE}`)" alt="상품 이미지"> 
                            </td>
                            <td class="star-rating">
                                <div class="star" v-for="index in 5" :key="index" style="display: inline;">
                                  <span v-if="index < review.REVIEW_SCORE + 1"><i class="fa-solid fa-star"></i></span>
                                  <span v-else="index >= review.REVIEW_SCORE + 1"><i class="fa-regular fa-star" ></i></span>
                              </div>
                            </td>
                            <td>{{ review.REVIEW_CONTENT }}</td>
                            <td>{{ review.REVIEW_DATE.split('T')[0] }}</td>
                        </tr>
                    </tbody>
            </table>
        </div>
    </div>
 
</main>

    </template>
    
  <script>
    import axios from 'axios';

    export default {
      data() {
        return {
          reviewList: [],
          pageNum:0,
          pageSize: 10,
          loginUser: {},

        }
      },
      computed: {
        member() {
          return this.$store.state.member;
        }
      },
      created() {
        this.getReviewList();
      },
      methods: {
        async getReviewList() {
          try {
            const res = await axios.get(`http://localhost:3000/mypage/review_List/${this.member.member_number}`);
            this.reviewList = res.data;
            // console.log( this.reviewList);
          }catch(err) {
            console.error(err);
          }
        }
      }
  }
  </script>
    
    
    
    <style scoped>

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
    
    .Topbar {
    display: flex;
    align-items: center;
    height: 150px;
    width: 1300px;
    padding: 0;
    position: relative;
    background-color: #f6f6f6;
    border-radius: 10px;
    box-shadow: 0px 1px 10px 2px rgb(138, 139, 136);
    border: 3px solid rgb(221, 221, 221);
    overflow: hidden;
    margin:auto;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-top: 40px
  }
  
  
  th {
    text-align: center;
  }
  
  td {
    text-align: center;
  }
  
  
  .btn-review {
    background-color:#ffcd39;
  }

  i {
    color: #ffcd39;
    
  }



    </style>
  
  