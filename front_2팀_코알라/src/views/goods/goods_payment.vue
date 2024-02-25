<template>
  <div class="container-lg">
    <div class="row">
      <div class="col-3"></div>

      <div class="col-6 mt-5" style="border: solid gray; border-radius: 10px;">
        <h3 class="mt-3">결제유형 선택</h3>
        <hr>
      <br>

        <div class="justify-content-center p-3 m-3">
          <div class="col-12" align="center">
            <h3><strong> 총 주문 금액 : {{ format(price) }} </strong></h3>
           
            <br>
            <button @click="PaymentBtn('카드')" class="btn btn-lg btn-primary mt-4 mb-2">카드결제</button>
            <br>
            <button @click="PaymentBtn('가상계좌')" class="btn btn-lg btn-primary m-2">가상계좌</button>
            <br>
            <button @click="PaymentBtn('계좌이체')" class="btn btn-lg btn-primary m-2">계좌이체</button>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>

      
      
</template>

<script>

import axios from 'axios';

const clientKey = 'test_ck_vZnjEJeQVxR11jxo2lqY8PmOoBN0'
// eslint-disable-next-line no-unused-vars,no-undef
const tossPayments = TossPayments(clientKey)

export default {
  name: "test",
  data(){
    return{
      price:0,
    }
  },
  created(){
    this.get_count()

  },
  computed: {
    member() {
      return this.$store.state.member;
    }
  },
  methods: {
    format(price){
             if (price === undefined) {
      // price가 undefined인 경우 처리
        return '가격 정보 없음';
   }
     const formatted= price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       return `${formatted} 원`;
 
          },
       async get_count(){
      try{
            const res= await axios.post("http://localhost:3000/goods/order_price_get")

            console.log('서버 응답', res);
            this.price=res.data[0].order_goods_price
            
           
            
        }catch(err){
            console.log(err)
        }



    },
    PaymentBtn:function(method){

      tossPayments.requestPayment(method, {
        amount: this.price,
        orderId: 'xnDIqpt7Dlfdtd99WwXgu',
        orderName: 'YOYOSTUDY',
        customerName: '뇌손실',
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
      })

    }
  }
}
</script>



