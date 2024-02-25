<template>
    <div>
    <div class="row justify-content-center box_wrap">
        <div class="container">
            <div class="order_info"><!--select 다시 쓰기 기본값 달아주기-->
                <div class="title">취소하실 상품을 선택해주세요. </div>
                <div class="title_info">주문상품 중 취소가능한 상품만 보입니다.</div><br>
            </div>
            <div class="card mb-3" style="max-width: 900px;">
            <div v-for="(order, i) in orderlist" :key="i" class="row g-0">
                <div class="col-md-4">
                    <!-- <img :height="300"  :src="require(`../../../../node-back/uploads/uploadGoods/${order.ORDER_GOODS_IMAGE}`)" alt="상품 이미지"> -->
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">주문 번호 :&nbsp;{{ order.ORDER_NUMBER }}</h5>
                    <!-- <h5 class="card-title">상품명    :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ order.ORDER_GOODS_NAME }}</h5> -->
                    <h5 class="card-title">상품 수량 :&nbsp;{{ order.ORDER_COUNT }}</h5>
                    <h5 class="card-title">상품 금액 :&nbsp;{{ formatPrice(order.ORDER_GOODS_PRICE )}}</h5>
                    <h5 class="card-total"><span class="star">*</span>총 주문 금액 : {{formatPrice( order.ORDER_GOODS_PRICE * order.ORDER_COUNT)}}</h5>
                </div>
                </div>
            </div>
            </div>
  
        </div>






        <div class="container">
            <div class="order_info">
                <div class="title">어떤 사유로 취소하시나요? <span class="star">(필수*)</span></div>
                <div class="title_info">취소하시는 이유를 선택해주세요.</div>
                <ul class="list-group">
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="" id="firstRadio"
                            checked>
                        <label class="form-check-label" for="firstRadio">상품이 마음에 들지 않아요 (단순변심)</label>
                    </li>
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""
                            id="secondRadio">
                        <label class="form-check-label" for="secondRadio">옵션을 변경하고 싶어요</label>
                    </li>
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""
                            id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">배송지를 변경하고 싶어요</label>
                    </li>
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""
                            id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">다른 상품도 같이 주문하고 싶어요</label>
                    </li>
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""
                            id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">주문을 취소하고 싶어요</label>
                    </li>
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""
                            id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">더 저렴한 상품을 발견했어요</label>
                    </li>
                    <li class="list-group-item">
                        <input class="form-check-input me-1" type="radio" name="listGroupRadio" value=""
                            id="thirdRadio">
                        <label class="form-check-label" for="thirdRadio">상품이 설명과 달라요</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container">
            <div   v-for="(p, i) in orderlist" :key="i" class="order_info">
                <div class="title">예상 환불 금액 </div>
                <div class="box_inner">
                    <h2>상세 정보</h2>
                    <dl>
                        <dt>
                            <span class="tit">환불 상품 금액</span>
                        </dt>
                        <dd>
                            <span class="pay">{{formatPrice( p.ORDER_GOODS_PRICE )}}</span>
                        </dd>
                        <dt>
                            <span class="tit">환불 배송비</span>
                        </dt>
                        <dd>
                            <span class="pay">3,000원</span>
                        </dd>
                        <dt>
                            <span class="tit">포인트 사용액</span>
                        </dt>
                        <dd>
                            <span class="pay">0원</span>
                        </dd>
                    </dl>
                </div>
                <div class="box_inner">
                    <h2>총 환불액</h2>
                    <dl>
                        <dt>
                            <span class="tit">총 환불액</span>
                        </dt>
                        <dd>
                            <span class="payment">{{ formatPrice(totalPrice() + 3000 )}}</span>
                        </dd>
                        <dt>
                            <span class="tit">반품비용 배송비 차감</span>
                        </dt>
                        <dd>
                            <span class="pay">3,000원</span>
                        </dd>
                        <dt>
                            <span class="tit">환불 수단</span>
                        </dt>
                        <dd>
                            <span class="pay">카드</span>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="order_info">
                <div class="title">주문 취소 안내</div>

                <div class="contents">
                    <ul class="list">
                        <li style="line-height:200%;"> 상품 취소로 인해 반품 배송비가 부과될 수 있습니다.</li>
                        <li style="line-height:200%;"> 카드 취소의 경우 카드사로 결제 취소 요청이 전달된 후 환불까지 목록영업일 기준 4~10일 정도 소요될 수 있습니다.</li>
                        <li style="line-height:200%;"> 무통장입금의 경우 입금했던 계좌로 익일에 환불 처리가 진행됩니다.</li>
                        <li style="line-height:200%;"> 주문제작이 시작된 시점부터 교환, 반품 및 환불은 불가능 하며 반드시 취소 및 변경기간 내에 고객센터로 전화해 주시기 바랍니다.</li>
                    </ul>


                </div>
            </div>
        </div>
    </div>

    <button class="cancle-btn" @click="orderCancle">
        <span>주문 취소 완료하기</span>
    </button>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
      return {
          loginUser: {},
          orderlist: [], //주문 리스트
          order: {},
          pageSize: 5, //한페이지에 보여지는 정보 갯수
          pageNum:0,
          currentPage: 0, //현재 게시판의 총 글 개수
          contentlist: [], //현재 게시판과 페이지에 맞는 글 리스트들
        order_number: this.$route.params.order_number
    }
  },

    computed: {
    
      member() {
          return this.$store.state.member;
      },

    },

    created() {
        this.getMember();
        this.getOrder();
    },


    methods: {
            orderCancle() {
                const userConfirmed = confirm("정말로 주문을 취소하시겠습니까?");
                
                if (userConfirmed) {
                    alert("주문이 취소 되었습니다.")
                   window.location.href=`http://localhost:8080/mypage/mypage_order_2/${this.order_number}`
                } else {
                    this.$router.push({ path: '/mypage' });
                }
            },


        async getMember() {
        try {
            console.log(this.member.member_number);
            const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.member.member_number}`);
            this.loginUser = response.data[0];
            
        } catch (error) {
            console.log(1);
        }
        },
        async getOrder() {
            try {
                const order_number = this.$route.params.order_number;
                const response = await axios.get(`http://localhost:3000/goods/order_Detail/${order_number}`);
               
                this.orderlist = response.data;
                console.log(response)
                
            } catch (error) {
                console.error(2);
            }
        },
        formatPrice(price) {
            if (price !== undefined) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return `${formattedPrice} 원`;
            }
            return '';
        },
        totalPrice() {
            const selected = this.orderlist
            return selected.reduce((total, p) => {
                return total + p.ORDER_GOODS_PRICE * p.ORDER_COUNT;
            }, 0);
        },

  
    }
}
</script>

<style scoped>
    * {
        font-family: Spoqa Han Sans Neo, "sans-serif";
    }

    .container {
        flex-direction: column;
        width: 900px;
        height: 550px;
        margin-top: 0px;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border: 5px solid rgb(238, 238, 238);
    }
    .card-title{
        font-size: 20px;
        line-height:30px;
        font-weight: 300;
    }
    .card-total{
        font-size: 27px;
        line-height:60px;
        font-weight: 400;

    }

    .box_wrap {
        flex-direction: column;
        align-items: center;
    }

    .box_wrap div+div {
        margin-top: 20px;
    }

    .order-header {
        width: 375px;
        border-radius: 10px;
        padding: 0px 10px 0px;
        text-align: left;

    }
    .date {
        width: 375px;
        border-radius: 10px;
        padding: 20px 20px 0px;
        text-align: left;
        font-size: 20px;
        color: black;
        font-weight: bold;
    }

    .product-box {
        height: 100%;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        justify-content: flex-start;
        border-top: 0.5px solid rgb(224, 224, 224);
        padding: 30px 10px 10px 10px;
    }

    .product-box-text-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 12px;
        font-size: 13px;
        text-align: left;
    }

    .fnRSrB {
        width: 375px;
        margin: 16px 0px 0px;
        padding: 0px 20px;
        font-size: 13px;
    }
    .list {
        font-size: 25px;
        margin-top: 50px;
      
    }
    

    .star {
        color: red;
        font-size: 30px;
    }



    .order_info .box_inner dl {
        border-top: 1px solid #000;
        overflow: hidden;
        margin: 10px;

    }

    .order_info .box_inner dl dt {
        float: left;
        clear: both;
        color: #c8aa85;
        margin: 2px 15px 15px 0;
        font-size: 20px;
    }

    .order_info .box_inner dl dd {
        float: right;
        font-size: 20px;
        
    }
    .payment{
        color:red;
        font-size: 25px;
    }
    * {
        font-family: Spoqa Han Sans Neo, "sans-serif";
    }

    .order_wrap {
        flex-direction: column;
        width: 700px;
        height: 300px;
        margin-top: 0px;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border: 5px solid rgb(238, 238, 238);
    }

    .title {
        width: 700px;
        border-radius: 12px;
        padding: 20px 20px 0px;
        margin-bottom: 20px;
        text-align: left;
        font-size: 30px;
        color: black;
        font-weight: bold;
    }

    .title_info {
        width: 700px;
        border-radius: 12px;
        padding: 20px 20px 0px;
        margin-bottom: 10px;
        text-align: left;
        font-size: 20px;
        color: rgb(105, 99, 99);
        font-weight: bold;
    }
    .cancle-btn {
    width: 900px;
    height: 50px;
    margin-top: 30px;
    margin: 20px auto;
    justify-content: center;
    align-items: center;
    border: 5px solid rgb(238, 238, 238);
    background-color: yellow;
    display: flex;
    flex-direction: column;
    font-size: 25px;
    }
    .cancle-btn:hover {
        background-color: rgb(248, 209, 16); 
    }
</style>