<template> 
  <div>

<div class="container-lg d-flex flex-wrap justify-content-start justifent-lg-start mt-4 pb-3">
</div>
<div class="article-list table-common con" style="margin-bottom: 20px;">
  <table style='width:100%;table-layout:fixed;'> 
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">주문 날짜</th>
                    <th scope="col">주문 번호</th>
                    <th scope="col">운송장 번호</th>
                    <!-- <th scope="col">수량</th> -->
                    <th scope="col">가격</th>
                    <th scope="col">주문 상태</th> <!--주문 상태에 따른 리뷰작성 / 주문상세보기 페이지이동-->

                </tr>
            </thead>
                <tbody>
                  <tr v-for="(order,i) in orderlist" :key="i">
                        <td>{{ pageNum * pageSize + i + 1 }}</td>
                        <td>{{ order.ORDER_DATE.split('T')[0] }}</td>
                        <td>{{ order.ORDER_NUMBER }}</td>
                        <td @click="goToDelivery" class="delivery">{{ order.ORDER_DELIVERY_NUMBER }}</td>
                        <!-- <td>{{order.ORDER_COUNT }} 개</td> -->
                        <td>{{ format(order.ORDER_GOODS_PRICE) }}</td>
                        <td>{{ status(order.ORDER_STATUS) }} <br/>
                        </td> <!--후기가 미작성1 이고 주문이 완료3 일 때  -->
                        <td v-if= "order.ORDER_STATUS === 3">   
                                  <button @click="reviewWriteForm()" class="rebtn">리뷰 작성</button>
                                </td> 
                                <td v-else-if="order.ORDER_STATUS===2">
                        <button type="button-" class="rebtn3" style="float: left;">가는중♬</button></td>
                       <td v-else >
                        <button type="button" class="rebtn2  " @click="goToOrderDetail(order.ORDER_NUMBER)" style="float: left;">주문취소</button></td>
                       

                    </tr>
                </tbody> 
            </table>
            </div>
            <br/>
            <!-- 페이징
            <div class="text-center">
              <button @click="prevPage" class="page-btn">이전</button>
              <span class="page-count">{{$route.query.page}}/{{totalpage}} 페이지</span>
              <button @click="nextPage" class="page-btn">다음</button>
            </div> -->
        </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
      data() {
        return {
            loginUser: {},
            orderlist: [], //주문 리스트
            pageSize: 5, //한페이지에 보여지는 정보 갯수
            pageNum:0,
            currentPage: 0, //현재 게시판의 총 글 개수
            contentlist: [], //현재 게시판과 페이지에 맞는 글 리스트들

      }
    },

    created() {
    this.getMember();
    },

    computed: {
      
          member() {
              return this.$store.state.member;
          },

          totalpage() {
            if(this.currentPage == 0) { // 현재 게시판 글 갯수가 0개일때 총 페이지가 0이 되는거 방지
              return 1; 
            }else {
              return Math.ceil(this.currentPage/10); // (글 갯수/10)한 후 올림 연산을 통해 총 페이지 계산
            }
          }

      },

      mounted() {            
          axios({ // 게시글 작성자, 제목, 작성일 가져오기
                url: "http://localhost:3000/mypage/order_list",
                method:"GET",
                data: { 
                  page: this.$route.query.page,
                  pagesize: this.pageSize
                },
              }).then(res => {
                this.orderlist = res.data;
                
              }).catch(err => {
                alert('게시물을 불러오는 동안 에러 발생: ' + err);
                console.log(err);
              });

            axios({
                url: "http://localhost:3000/mypage/order_list_cnt",
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
        

          status(order_status) {
            if(order_status == 1) {
              return ("결제완료");
            }else if(order_status == 2) {
              return("배송중");
            }else if(order_status == 3) {
              return("배송완료");
            }else {
              return("취소완료");
            };
          },
        format(price){
             if (price === undefined) {
      // price가 undefined인 경우 처리
        return '가격 정보 없음';
   }
     const formatted= price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       return `${formatted} 원`;
 
          },
          goToOrderDetail(order_number) {
              window.location.href=`http://localhost:8080/mypage/mypage_order/${order_number}` 
            },
          getOrderStatusText(status) {
            if (status === 1) {
                return '결제완료';
            } else if (status === 2) {
                return '배송중';
            } else if (status === 3) {
                return '배송완료';
            }
            return '';
          },
          handleReview(order) {
            if (!order.ORDER_STATUS === 3) {
                alert("배송완료 후에 리뷰를 작성할 수 있습니다.");
            } 
        },
        
          reviewWriteForm() {
            this.$router.push({ path: '/mypage/mypage_review_write' });
          },

          async getMember() {
          try {
            const response = await axios.get(`http://localhost:3000/mypage/mypage/:member_number/${this.member.member_number}`);
            this.loginUser = response.data[0];
          } catch (error) {
            console.error(error);
          }
        },
        goToDelivery(delivery_address) {
          // 운송장 번호 클릭 시, 배송조회가 가능한 웹페이지 새창으로 열기
            window.open(
            "http://nplus.doortodoor.co.kr/web/detail.jsp?slipno=" + delivery_address
         );

    
          },
        }
      }
</script>
  
  
  <style scoped>
  html {
    font-family: "Noto Sans KR", sans-serif;
  }
  
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

  .mypage-iconbox {
    position: relative;
    padding: 30px 0;
    background: none;
    border: 1px solid #615f5f;
    box-sizing: border-box;
    margin: 0 20px;
    margin-bottom: 30px;
    width: 900px;
    height: 130px;
    display: flex;

  }

  button {
    border: none;
    outline: none;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    align-items: center;
    margin: 0px 50px;
    padding: 0px;
    font-weight: bold;
    cursor: pointer;

    background-color: white;
  }


  .selected {
    color: rgb(0, 150, 243) !important;
    background-color: white;
  }

  .number {
  margin-bottom: 20px;
  font-size: 25px;
  background-color: white;
}

  /* 라이브러리 */
  .con {
    margin: 0 auto;
  }
  
  .img-box>img {
    width: 100%;
    display: block;
  }
  

a.imgSpace {
    color: inherit;
    text-decoration: none;
}

.imgSpace:hover {
    color: #FFAF7D;
    cursor: pointer;
}

.rebtn {
    width: 110px;
    padding: 4px;
    border-radius: 6px;
    color: #111110;
    border: 1px solid #ffed2b;
    background-color: #f5be0a;
    font-family: GmarketSansMedium;
    cursor: pointer;
}

.rebtn2 {
    width: 110px;
    padding: 4px;
    border-radius: 6px;
    color: #2d2c2c;
    border: 1px solid #fbaeb2;
    background-color: #f697c6;
    font-family: GmarketSansMedium;
    size: 2px;
    cursor: pointer;
}
.rebtn3{
  width: 110px;
    padding: 4px;
    border-radius: 6px;
    color: #2d2c2c;
    border: 1px solid #97b5f6;
    background-color: #97b5f6;
    font-family: GmarketSansMedium;
    size: 2px;
    cursor: pointer;
}
.delivery:hover{
  color: blue;
  transform: scale(1.2);
  transition-duration: 0.5s;
}

  </style>

