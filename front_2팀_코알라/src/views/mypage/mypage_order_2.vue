<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="title" v-for="(k, i) in orderlist" :key="i" >
                <!-- <p class="fs-3">{{ k.ORDER_REFUND_DATE.split('T')[0] }}</p> -->
                <p class="fs-5">주문번호 : {{ k.ORDER_NUMBER }}</p>
            </div>
            <div class="status">
                <div class="card mb-3 card-body" v-for="(order, i) in orderlist" :key="i" >
                    <div class="img_frame">
                        <img :src="require(`../../../../node-back/uploads/uploadGoods/${order.ORDER_GOODS_IMAGE}`)" alt="상품 이미지">
                    </div>
                    <div class="txt_wrap">
                        <div class="card_row"><div class="card_tit">주문 번호 : </div><div class="card_txt">{{ order.ORDER_NUMBER }}</div></div>
                        <!-- <div class="card_row"><div class="card_tit">상품명 : </div><div class="card_txt">{{ order.ORDER_GOODS_NAME }}</div></div> -->
                        <div class="card_row"><div class="card_tit">상품 수량 : </div><div class="card_txt">{{ order.ORDER_COUNT }}</div></div>
                        <div class="card_row"><div class="card_tit">상품 금액 : </div><div class="card_txt">{{ order.ORDER_GOODS_PRICE }}</div></div>
                    </div>
                </div>
            </div>
            <div class="cancle-btn">
                <div class="cancle-btn-box warning">
                    <span @click="ordercancelForm()" class="ccbtn">확  인</span>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';


export default {

    data() {
      return {
          loginUser: {},
          order: {},
          orderlist: [],
          order_number:this.$route.params.order_number
             };
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
                const orderno = this.$route.params.order_number;
                const response = await axios.get(`http://localhost:3000/goods/order_Detail/${orderno}`);
                this.orderlist = response.data;
                console.log(response)
                
            } catch (error) {
                console.error(2);
            }
        },

       


        ordercancelForm() {
           
           
            try{
             const res=  axios.post(`http://localhost:3000/goods/delete_order`,{
                order_number : this.order_number
             });
             console.log('응답이다!', res);
              window.location.href="http://localhost:8080/mypage"
        
             
              
            }catch(err){
            alert("가져오지못했습니다.")
            }
            

        },
              
    },
    }

</script>

<style scoped>

* {
    font-family: Spoqa Han Sans Neo,"sans-serif";
}
.container{
  flex-direction: column;
  width: 900px;
  height: 1000px;
  margin-top: 0px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  /* border: 5px solid rgb(238, 238, 238);  */
}

.order-header{
    width: 375px;
    border-radius: 10px;
    padding: 0px 10px 0px;
    text-align: left;

}
.fs-3
{    
    width: 375px;
    border-radius: 20px;
    padding: 20px 20px 0px;
    text-align: left;
    font-size: 30px;
    color: black;
    font-weight: bold;
}
.fs-5
{
    width: 375px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0px 20px;
    text-align: left;
    color: rgb(112, 112, 112);
    font-weight: 400;
    font-size: 30px;
}
.fw-bold{
    width: 375px;
    margin-top: 0px;
    padding: 0px 20px;
    text-align: left;
    color: rgb(237, 167, 4);
    font-weight: 400;
    font-size: 20px;
}

.card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 40px;
}

.card-body .img_frame {
    width: 300px;
    max-height: 400px;
}

.img_frame img {
    width: 100%;
    object-fit: cover;
}

.card-body .txt_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
}

.card-body .card_row {
    margin-bottom: 10px;
    font-size: 25px;
    display: flex;
    justify-content: left;
    width: 90%;
}

.card-body .card_tit {
    width: 45%;
}

.card-body .card_txt {
    width: 53%;
    word-break: break-all;
}

.order-info-tool {
    margin-top: 10px;
}
.product-box
{
    height: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: flex-start;
    border-top: 0.5px solid rgb(224, 224, 224);
    padding: 30px 10px 10px 10px; 
}


.product-box-text-wrapper{
    display: flex;
    /* flex-direction: column; */
    align-items: flex-start;
    margin-left: 12px;
    font-size: 20px;
    text-align: left;
    font-weight: 200px;
    letter-spacing: 3px;
    color:green; font-size:100px; text-shadow:5px 5px gray
}

.fnRSrB
{
    width: 375px;
    margin: 16px 0px 0px;
    padding: 0px 20px;
    font-size: 13px;
}

.col-md-8
{    
    border-radius: 20px;
    font-size: 25px;
    color: rgb(0, 0, 0);
    font-weight: bold;
}

.ccbtn {
        width: 100%;
        height: 70px;
        margin-top: 20px;
        margin: 20px auto;
        justify-content: center;
        align-items: center;
        border: 5px solid rgb(238, 238, 238);
        background-color: yellow;
        display: flex;
        flex-direction: column;
        font-size: 25px;
       
    }

.ccbtn:hover {
    background-color: rgb(248, 209, 16); 
}
</style>
