<template>
  <div>      
  <div class="article-list table-common con" style="margin-bottom: 20px;">
    <!-- 테이블 높이를 너비 100%로 수정 -->
      <table style='width:100%;table-layout:fixed;'> 
          <thead>
              <tr>
                  <th scope="col">NO</th>
                  <th scope="col">주문번호</th>
                  <!-- <th scope="col">상품가격</th> -->
                  <!-- <th scope="col">수량</th> -->
                  <th scope="col">주문금액</th>
                  <th scope="col">주문자</th>
                  <th scope="col">주문일</th>
                  <th scope="col">주문상태</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(order,i) in orderlist" :key="i">
                <td>{{ pageNum * pageSize + i + 1 }}</td>
                 <!--주문번호는 ORDER_NUMBER + 1000 => 10001번부터 시작 / 클릭 메소드  -->
                <td>{{ pageNum * pageSize + i + 1000 + order.ORDER_NUMBER}}</td>
                <!-- <td>{{formatPrice(order.ORDER_GOODS_PRICE)}}</td> -->
                <!-- <td>{{order.ORDER_COUNT}}</td> -->
                <td>{{format(order.ORDER_GOODS_PRICE)}}</td>
                <td>{{order.ORDER_NICKNAME}}</td>
                <td>{{order.ORDER_DATE.split('T')[0]}}</td> 
                <!-- 주문상세페이지에서 받아올 때 조건문줘서 한글로 바인딩? -->
                <td>{{order.ORDER_STATUS = 0 ? '결제완료' : '배송중'}}</td> 
              </tr>
             
          </tbody>
      </table>
  </div>
<br/>
      <!-- 페이징 -->
      <!-- <div class="text-center">
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
        orderlist: [],
        pageSize: 10,
        pageNum: 0,

      }
    },
  mounted() {
    axios({
      url: "http://localhost:3000/admin/admin_order_list",
      method: "GET",
      data: {
        page: this.$route.query.page,
        pageSize: this.pageSize
      }
    }).then(res => {
      console.log(res);
      this.orderlist = res.data;
      
    }).catch(err => {
      alert("게시물을 불러오는 동안 에러 발생: " + err);
    });
  },
  methods: {
    formatPrice(goods_price){
    const formattedPrice = goods_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return `${formattedPrice} 원`;
  },
  format(price){
             if (price === undefined) {
      // price가 undefined인 경우 처리
        return '가격 정보 없음';
   }
     const formatted= price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       return `${formatted} 원`;
 
          },
  }
    }
  
</script>
