<template>
  <main>
      <div class="container-lg p-3" >
      <h1>배송지 입력</h1>
      <h2><div class="container-lg mt-3 p-3" style="border: solid gray; border-radius: 10px; font-size: 30px; font-weight: normal;">주문자 정보</div></h2>
      </div>
      <div class="container-lg" >이름<div class="col-4">
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="order_nickname">
        </div>
      </div>
      <br>
      <div class="container-lg" >핸드폰 번호<div class="col-4">
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control" id="exampleFormControlInput1" v-model="order_phone">
  
        </div>
      </div>
      <div class="container-lg p-3" >
      <h2><div class="container-lg mt-3 p-3" style="border: solid gray; border-radius: 10px; font-size: 30px; font-weight: normal;">배송 정보</div></h2>
      <div class="form-check"> <br>
          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1" @click="check()">
          <label class="form-check-label" for="defaultCheck1">주문자 정보와 동일</label>
        </div>
        <br>
  </div>
  <div class="container-lg" >
  <div class="row">
      <!-- 처음나오는페이지 -->
      <div class="col-6" style="border: solid gray; border-radius: 10px;"  v-if="!showQuestionForm">받으시는분<br>
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="order_taker">
           핸드폰 번호<br>
          <label for="exampleFormControlInput1" class="form-label "></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="order_taker_phone">
          우편번호
          <div class="row">
              <div class="col-10 mb-3">
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="order_taker_zipcode">
          주소<br>
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="order_taker_address1">
          상세주소<br>
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="order_taker_address2">
          <br>
          <div class="dropdown " >
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="height: 100%; width: 100%">
                {{selectOption_order_memo}}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="selectOption_order(0)">배송 메모</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_order(1)">부재시 맡겨주세요</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_order(2)">문앞</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_order(3)">도착전 전화주세요</a></li>
              </ul>
          </div>
          </div>
          <div class="col p-4">
              <button type="button" class="btn btn-secondary" @click="openPostcode">검색</button>
              
          </div>
          </div>
         
          </div>
          <!-- 체크시 나오는 것  -->
          <div class="col-6" style="border: solid gray; border-radius: 10px;"  v-if="showQuestionForm">받는분<br>
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="member.MEMBER_NICKNAME">
           핸드폰 번호<br>
          <label for="exampleFormControlInput1" class="form-label "></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="member.MEMBER_PHONE">
          우편번호
          <div class="row">
              <div class="col-10 mb-3">
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="member.MEMBER_ZIPCODE">
          주소<br>
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="member.MEMBER_ADDRESS1">
          상세주소<br>
          <label for="exampleFormControlInput1" class="form-label"></label>
          <input type="text" class="form-control mb-3" id="exampleFormControlInput1" v-model="member.MEMBER_ADDRESS2">
          <br>
          <div class="dropdown " >
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="height: 100%; width: 100%">
                {{selectOption_order_memo}}
              </button>
              <ul class="dropdown-menu" >
                <li><a class="dropdown-item" href="#" @click="selectOption_order(0)">배송 메모</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_order(1)">부재시 맡겨주세요</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_order(2)">문앞</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_order(3)">도착전 전화주세요</a></li>
              </ul>
          </div>
          </div>
          <div class="col p-4">
              <button type="button" class="btn btn-secondary" @click="openPostcode">검색</button>
              
          </div>
          </div>
         
          </div>
       <!-- 디테일에서 왔을때 보여지는것 -->
    <div class="col-6" v-if="this.$route.params.ordertp === '1'">
        <div class="card" style="border: solid gray; border-radius: 10px;">
            <div class="card-body">
                <h5><strong>주문정보</strong></h5>
                <hr>
                <div>
                    <div class="d-flex flex-column mb-3">
                        <div class="me-3">
                           
                            <img :width="80" :src="this.goods_image ? require(`../../../../node-back/uploads/uploadGoods/${this.goods_image}`) : '/goodsempty.jpg'" alt="상품 이미지">
                        </div>
                        <div class="me-3">
                            <strong>{{ this.goods_name }}</strong><br>
                            수량: {{this.goods_quantity }}개
                        </div>
                      
                    </div>

                </div>
            </div>

        </div>
    </div>
     <!-- 장바구니에서왔을때 보여지는것 -->
    <div class="col-6" v-if="this.$route.params.ordertp === '0'">
        <div class="card" style="border: solid gray; border-radius: 10px;">
            <h5 class="mt-3 mx-3"><strong>주문정보</strong></h5>
            <hr>
            <div class="card-body"  v-for="(k, i) in cart" :key="i">
                <div>
                    <div class="d-flex flex-column mb-3">
                        <div class="me-3">
                           
                            <img :width="80" :src="k.BASKET_GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${k.BASKET_GOODS_IMAGE}`) : '/goodsempty.jpg'" alt="상품 이미지">
                        </div>
                        <div class="me-3">
                            <strong>{{ k.BASKET_GOODS_NAME }}</strong><br>
                            <div class="me-2">
                                수량:
                                <button b-button-group size="sm" @click="decrementQuantity(k)" class="btn btn-sm btn-warning">-</button>
                             {{k.BASKET_GOODS_COUNT }}개
                             <button @click="incrementQuantity(k)" class="btn btn-sm m-1 btn-warning">+</button>
                            
                            <br>가격:{{format(k.BASKET_GOODS_COUNT * k.BASKET_GOODS_PRICE)}}
                        </div>
                        </div>
                      
                    </div>

                </div>
            </div>

        </div>
    </div>

      <!-- 처음왔을때 결제창 -->
      <div class="col-6" v-if="!showQuestionForm">
          <div>
              <br><br>
              <div class="card shadow-sm " style="width:40rem; border: solid gray; border-radius: 10px;">
              <div class="card-body" v-if="this.$route.params.ordertp === '1'">
                  <h5 class="card-title d-flex justify-content-center ">주문 예상 금액</h5>
                  <h5 class="card-title pt-3 pb-3 border-top" >총가격: {{ formatprice(goods_price*goods_quantity) }}</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총할인:</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총배송비: 3000원</h5>
                  
                  
                  <div class="row pt-3 pb-3 border-top">
                      <div class="col-6">
                          <h4>총 상품 금액</h4>
                      </div>
                      <div class="col-6" style="text-align:right;">
                          <h4>{{ formattedTotalPrices }}</h4>
                      </div>
                  </div>
                  <div class="align-items-center">
                      <div>
                      <button type="button" class="btn btn-lg btn-warning" style="float:right" @click="payment">결제하기</button>
                      </div>
                      </div>
      </div>
             <!-- 장바구니로왔을때 결제창 -->
            <div class="card-body" v-if="this.$route.params.ordertp === '0'" >
              
                  <h5 class="card-title d-flex justify-content-center ">주문 예상 금액</h5>
                  <h5 class="card-title pt-3 pb-3 border-top" >총가격:{{ format(totalPrice()) }} </h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총할인:</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총배송비: 3000원</h5>
                  
                  
                  <div class="row pt-3 pb-3 border-top">
                      <div class="col-6">
                          <h4>총 상품 금액</h4>
                      </div>
                      <div class="col-6" style="text-align:right;">
                          <h4>{{ formattedTotalPrice }} 원</h4>
                      </div>
                  </div>
                  <div class="align-items-center">
                      <div>
                      <button type="button" class="btn btn-lg btn-warning" style="float:right" @click="payment3">결제하기</button>
                      </div>
                      </div>
      </div>
  </div>
  </div>
  </div>
  <!-- 장바구니체크시보여지는 결제창 -->
  <div class="col-6" v-if="showQuestionForm">
          <div>
              <br><br>
              <div class="card shadow-sm " style="width:40rem; border: solid gray; border-radius: 10px;">
              <div class="card-body"  v-if="this.$route.params.ordertp === '0'" >
                <h5 class="card-title d-flex justify-content-center ">주문 예상 금액</h5>
                  <h5 class="card-title pt-3 pb-3 border-top" >총가격: {{ format(totalPrice()) }}</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총할인:</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총배송비: 3000원</h5>
                  
                  
                  <div class="row pt-3 pb-3 border-top">
                      <div class="col-6">
                          <h4>총 상품 금액</h4>
                      </div>
                      <div class="col-6" style="text-align:right;">
                          <h4>{{ formattedTotalPrice }}원</h4>
                      </div>
                  </div>
                  <div class="align-items-center">
                      <div>
                      <button type="button" class="btn btn-lg btn-warning" style="float:right" @click="payment4">결제하기</button>
                      </div>
                      </div>
      </div>
     <!-- 디테일로온사람이 체크시보여지는결제창 -->
      <div class="card-body"  v-if="this.$route.params.ordertp === '1'" >
                <h5 class="card-title d-flex justify-content-center ">주문 예상 금액</h5>
                  <h5 class="card-title pt-3 pb-3 border-top" >총가격: {{ formatprice(goods_price*goods_quantity) }}</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총할인:</h5>
                  <h5 class="card-title pt-3 pb-3 border-top">총배송비: 3000원</h5>
                  
                  
                  <div class="row pt-3 pb-3 border-top">
                      <div class="col-6">
                          <h4>총 상품 금액</h4>
                      </div>
                      <div class="col-6" style="text-align:right;">
                          <h4>{{ formattedTotalPrices }}</h4>
                      </div>
                  </div>
                  <div class="align-items-center">
                      <div>
                      <button type="button" class="btn btn-lg btn-warning" style="float:right" @click="payment2">결제하기</button>
                      </div>
                      </div>
      </div>
  </div>
  </div>
  </div>



  </div>
  </div>
  
  </main>
  
  </template>

<script>
import axios from 'axios';

export default{ 
    data(){
        return{
            sampleData:'',
            order_nickname:'',
            order_phone:'',
            order_taker:'',
            order_taker_phone:'',
            order_taker_zipcode:'',
            order_taker_address1:'',
            order_taker_address2:'',
                order_taker_memo:0,
                order_status:0,
                 member:[],
                 cart:[],
                 basket_goods_price : 0,
                 
                
        
            member_email:this.$store.state.member.member_email,
            selectOption_order_memo:'배송메모',
            showQuestionForm:false,
            goods_id : this.$route.params.goods_id,
            goods_image:'',
            goods_name:'',
            goods_price:0,
            goods_quantity:0,
            member_number:this.$store.state.member.member_number
 
        };
    },
    setup(){},
    created(){
        this.get_member_list()
        this.get_goods_detail()
        this.get_goods_basket()
        this.get_goods_price()
    },
    computed: {
    // totalPrice() + 3000 값을 포맷팅한 값을 계산된 속성으로 정의
    formattedTotalPrice() {
      return (this.totalPrice() + 3000);
    },
    formattedTotalPrices(){
       return (this.goods_price*this.goods_quantity+3000);

    },
  },
    methods:{
        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    console.log(data);
                    this.order_taker_zipcode = data.zonecode; //주소api에서 넘어오는 명칭이랑 내가 준 변수랑 매칭해야함.
                    this.orer_taker_address1 = data.roadAddress;
                },
            }).open();
        },
        format(price){
             if (price === undefined) {
      // price가 undefined인 경우 처리
        return '가격 정보 없음';
   }
     const formatted= price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       return `${formatted} 원`;
 
          },
        totalPrice() {
            const selected = this.cart
            return selected.reduce((total, k) => {
                return total + k.BASKET_GOODS_COUNT * k.BASKET_GOODS_PRICE;
            }, 0);
        },
        incrementQuantity(k){
            k.BASKET_GOODS_COUNT++;

        },
        decrementQuantity(k){
            if (k.BASKET_GOODS_COUNT > 1) {
                k.BASKET_GOODS_COUNT--;
            }

        },
        async get_goods_price(){
            try{
            const res= await axios.post(`http://localhost:3000/goods/order_basket_price`,{
             member_number : this.member_number
            });
            console.log('서버 응답', res);
            this.basket_goods_price =res.data[0].basket_goods_price
            
           
            
        }catch(err){
            console.log(err)
        }


        },

       async get_goods_basket(){
            try{
            const res= await axios.post(`http://localhost:3000/goods/order_basket_image`,{
             member_number : this.member_number
            });
            
            this.cart=res.data
            
           
            
        }catch(err){
            console.log(err)
        }


        },
        formatprice(price){
            const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       return `${formattedPrice} 원`;

        },
        check(){
            this.showQuestionForm=!this.showQuestionForm;
        },
        selectOption_order(num){
            if(num==0){
                this.selectOption_order_memo='배송 메모';
                this.order_taker_memo=0;
           }else if(num==1){
                this.selectOption_order_memo='부재시 맡겨주세요';
                this.order_taker_memo=1;
            }else if(num==2){
                this.selectOption_order_memo='문앞'
                this.order_taker_memo=2;
            }else if(num==3){
                this.selectOption_order_memo='도착전 전화주세요'
                this.order_taker_memo=3;
            }
            

        },
        async get_goods_detail(){
            try{
            const res= await axios.post(`http://localhost:3000/goods/order_image`,{
                goods_id:this.goods_id
            });
            
            
            this.goods_image=res.data[0].goods_image;
            this.goods_name=res.data[0].goods_name;
            this.goods_price=res.data[0].goods_price;
            this.goods_quantity=res.data[0].goods_quantity;
            
        }catch(err){
            console.log(err)
        }
            
        },
        async get_member_list(){
           try{
            const res = await axios.post(`http://localhost:3000/goods/order_member_list`,{
                     member_email:this.member_email

            });
            this.member=res.data[0];
            

           }catch(err){
            alert("가져오지못했습니다.")
            }
        },
        async get_goods_member(){

        },
        payment(){
            if (!this.validationCheck()) {
                return;
            }
            else {
                axios({
                    url: "http://localhost:3000/goods/goods_order",
                    method: "POST", 
                    data : {
                        order_nickname:this.order_nickname,
                        order_phone:this.order_phone,
                        order_taker:this.order_taker,
                        order_taker_phone:this.order_taker_phone,
                        order_taker_zipcode:this.order_taker_zipcode,
                        order_taker_address1:this.order_taker_address1,
                        order_taker_address2:this.order_taker_address2,
                        order_taker_memo:this.order_taker_memo,
                       
                        order_goods_price:this.formattedTotalPrices,
                        order_count:this.goods_quantity,
                        order_member_number:this.member_number


                    },
                })
                    .then((res) => {
                       if(res.data.message=='add_complete')
                       this.showQuestionForm=false

                        window.location.href="http://localhost:8080/goods_payment"
                        })
                    .catch(() => {
                      
                        alert("오류 발생")
                    })
            }
        },
        payment2(){
            
                axios({
                    url: "http://localhost:3000/goods/goods_order2",
                    method: "POST", 
                    data : {
                        order_nickname:this.order_nickname,
                        order_phone:this.order_phone,
                        order_taker:this.member.MEMBER_NICKNAME,
                        order_taker_phone:this.member.MEMBER_PHONE,
                        order_taker_zipcode:this.member.MEMBER_ZIPCODE,
                        order_taker_address1:this.member.MEMBER_ADDRESS1,
                        order_taker_address2:this.member.MEMBER_ADDRESS2,
                        order_taker_memo:this.order_taker_memo,
                        order_goods_price:this.formattedTotalPrices,
                        order_count:this.goods_quantity,
                        order_member_number:this.member_number
                    },
                }).then((res) => {
                       if(res.data.message=='add_complete')
                       this.showQuestionForm=false
                       window.location.href="http://localhost:8080/goods_payment"
                        })
                    .catch(() => {
                      
                        alert("오류 발생")
                    })
            
            
        },
        payment3(){
            if (!this.validationCheck()) {
                return;
            }else{
            axios({
                    url: "http://localhost:3000/goods/goods_order3",
                    method: "POST", 
                    data : {
                        order_nickname:this.order_nickname,
                        order_phone:this.order_phone,
                        order_taker:this.order_taker,
                        order_taker_phone:this.order_taker_phone,
                        order_taker_zipcode:this.order_taker_zipcode,
                        order_taker_address1:this.order_taker_address1,
                        order_taker_address2:this.order_taker_address2,
                        order_taker_memo:this.order_taker_memo,
                        order_goods_price:this.formattedTotalPrice,
                        order_member_number:this.member_number
                        
                    },
                }).then((res) => {
                       if(res.data.message=='add_complete')
                       this.showQuestionForm=false
                       window.location.href="http://localhost:8080/goods_payment"
                        })
                    .catch(() => {
                      
                        alert("오류 발생")
                    })
                }

        },
        payment4(){
            axios({
                    url: "http://localhost:3000/goods/goods_order4",
                    method: "POST", 
                    data : {
                        order_nickname:this.order_nickname,
                        order_phone:this.order_phone,
                        order_taker:this.member.MEMBER_NICKNAME,
                        order_taker_phone:this.member.MEMBER_PHONE,
                        order_taker_zipcode:this.member.MEMBER_ZIPCODE,
                        order_taker_address1:this.member.MEMBER_ADDRESS1,
                        order_taker_address2:this.member.MEMBER_ADDRESS2,
                        order_taker_memo:this.order_taker_memo,
                        order_goods_price:this.formattedTotalPrice,
                        order_member_number:this.member_number
                    },
                }).then((res) => {
                       if(res.data.message=='add_complete')
                       this.showQuestionForm=false
                       window.location.href="http://localhost:8080/goods_payment"
                        })
                    .catch(() => {
                      
                        alert("오류 발생")
                    })

        },
        validationCheck(){
            if (this.order_nickname == ""){
               alert("이름을 입력해주세요");
                return false;
            }
            
            if (this.order_phone == ""){
                alert("핸드폰 번호를 입력해주세요");
                return false;
            }
            if (this.order_taker == ""){
                alert("받으시는분을 입력해주세요");
                return false;
            }
            if (this.order_taker_phone == ""){
                alert("받으시는분 핸드폰 번호를 입력해주세요");
                return false;
            }
            if (this.order_taker_zipcode == ""){
                alert("우편번호를 입력해주세요");
                return false;
            }
            if (this.order_taker_address1 == ""){
                alert("주소를 입력해주세요");
                return false;
            }
            if (this.order_taker_address2 == ""){
                alert("상세 주소를 입력해주세요");
                return false;
            }
            return true;

        },
    },
   
}
</script>