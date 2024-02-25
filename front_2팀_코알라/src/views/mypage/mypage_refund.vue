<template>
  <div class="container-lg d-flex flex-wrap justify-content-start justifent-lg-start mt-4 pb-3">
      <div>
         </div>
          <div class="article-list table-common con" style="margin-bottom: 20px;">
            <!-- 테이블 높이를 너비 100%로 수정 -->
              <table style='width:100%;table-layout:fixed;'> 
            <thead>
              <tr>
                <th scope="col" style="text-align: center;">번호</th>
                <th scope="col" style="text-align: center;">상품이미지</th>
                <th scope="col" style="text-align: center;">상품명</th>
                <th scope="col" style="text-align: center;">주문 번호</th>
                <th scope="col" style="text-align: center;">주문금액 (수량)</th>
                <th scope="col" style="text-align: center;">환불/취소 상태</th>
              </tr>
            </thead>
            <tbody>              
              <tr v-for="(item,i) in refundlist" :key="i">
                    <td>{{ pageNum * pageSize + i + 1 }}</td>
                    <td ><img :height="50" :src="require(`../../../../node-back/uploads/uploadGoods/${item.ORDER_GOODS_IMAGE}`)" alt="상품 이미지"> </td>
                    <td>{{item.ORDER_GOODS_NAME}}</td>
                    <td>{{item.ORDER_NUMBER}}</td>
                    <td>{{formatPrice(item.ORDER_GOODS_PRICE)}} ( {{ item.ORDER_COUNT }} 개)</td>
                    <td v-if="item.ORDER_REFUND === 1">
                        <button type="button" class="btn btn-warning" @click="goToOrderDetail(item.ORDER_NUMBER)" style="cursor:pointer;">취소/환불 완료</button>
                    </td> 
                  </tr>
              </tbody>
              </table>
            </div>
      </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
        loginUser: {},
        refundlist: [], //주문 리스트
        pageSize: 5, //한페이지에 보여지는 정보 갯수
        pageNum:0,
        currentPage: 0, //현재 게시판의 총 글 개수
        contentlist: [], //현재 게시판과 페이지에 맞는 글 리스트들

  }
},
computed: {
    
    member() {
        return this.$store.state.member;
    },

  },
  mounted() {            
        axios({ // 게시글 작성자, 제목, 작성일 가져오기
              url: "http://localhost:3000/mypage/refund_list",
              method:"GET",
              data: { 
                page: this.$route.query.page,
                pagesize: this.pageSize
              },
            }).then(res => {
              this.refundlist = res.data;
              
            }).catch(err => {
              alert('게시물을 불러오는 동안 에러 발생: ' + err);
              console.log(err);
            });

          axios({
              url: "http://localhost:3000/mypage/refund_list_cnt",
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
                    
    methods: {
        goToOrderDetail(order_number) {
            this.$router.push({ path: `/mypage/mypage_order_2/${order_number}`}); 
          },
          formatPrice(price) {
          if (price !== undefined) {
              const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              return `${formattedPrice} 원`;
          }
          return '';
      },
     
      }

  }
</script>

  



<style scoped>
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

.rebtn {
  width: 130px;
  padding: 4px;
  border-radius: 6px;
  color: #f48d0f;
  border: 1px solid #ffed2b;
  background-color: #fff2c9;
  font-family: GmarketSansMedium;
  cursor: pointer;
}
</style>