<template>
    <div>
        
        <div class="container-lg mt-3 p-3" style="font-size: 30px; font-weight: bolder;">장바구니</div>
        <hr class="one" style="border:solid 1px black">
        <div class="article-list table-common con">
            <table style='table-layout:fixed;'>
                <thead>
                    <tr>

                        <th scope="col">
                            <!-- <input type="checkbox" v-model="selectAll" @click="toggleSelectAll"> -->
                            상품명
                        </th>
                        <th scope="col">상품 이미지</th>
                        <th scope="col">상품금액</th>
                        <!-- <th scope="col">수량</th> -->
                        <!-- <th scope="col">총 주문금액</th> -->
                        <th scope="col">삭제/수정</th>
                    </tr>
            </thead>
            <tbody  v-for="(k,i) in pageGoodsList" :key="i">
                <tr>
                    <td>
                        <div class="form-check">
                        <!-- <input class="form-check-input" type="checkbox" value="" id="defaultCheck1"> -->
                        <label class="form-check-label" for="defaultCheck1">{{ k.BASKET_GOODS_NAME }}</label>
                       
                    </div>
                </td>
                    <td> <img class="bd-placeholder-img card-img-top" width="100%" height="180" id="img" 
                             :src="k.BASKET_GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${k.BASKET_GOODS_IMAGE}`) :'/goodsempty.jpg'"  @click="goToDetail(k.GOODS_ID)"/></td>
                    <td>{{formatPrice(k.BASKET_GOODS_PRICE)}}</td>
                    
                    <!-- <td>
                        <div class="me-2">
                            <button @click="incrementQuantity(k)" class="btn btn-sm m-1 btn-warning">+</button>
                            {{ k.BASKET_GOODS_COUNT }}
                            <button b-button-group size="sm" @click="decrementQuantity(k)" class="btn btn-sm btn-warning">-</button>
                        </div>
                    </td> -->
                    <!-- <td>{{formatPrice(k.BASKET_GOODS_COUNT * k.BASKET_GOODS_PRICE)}}</td> -->
                    <td>
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-secondary" style="float: left;" @click="delete_basket(k.BASKET_NUMBER)">삭제</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- 페이징 -->
    
    <div class="container-lg mt-3">
        <div class=" d-flex justify-content-center ">
            <div class="card shadow-sm " style="width:40rem">
                <div class="card-body">
                    <!-- <h5 class="card-title pt-3 pb-3 border-top">총 상품 가격: {{ formatPrice(totalPrice()) }} </h5>
                    <h5 class="card-title pt-3 pb-3 border-top">배송비: 3000</h5> -->
                    
                    
                    <!-- <div class="row pt-3 pb-3 border-top">
                        <div class="col-6">
                                <h3>지불 금액</h3>
                        </div>
                        <div class="col-6" style="text-align:right;">
                            <h3>{{ formatPrice(totalPrice() + 3000) }}</h3>
                        </div>
                    </div> -->
                    <div class="align-items-center">
                        
                        <div class="d-flex justify-content-center">
                        <button type="button" class="btn btn-lg btn-dark " style="float:right" @click="order(this.member.member_number)">주문하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>


<script>
import axios from 'axios';
export default{ 
    data(){
        return{
            goods: [],
            pageGoodsList : [], //한페이지당 들어갈 상품 리스트
            pageNum: 0,
            pageCnt : 0,
            pageSize : 16, // 한페이지에 보여줄 상품 갯수
            // goods_id:'',
            // goods_stock:0,
        };
    },
    setup(){},
    created(){
        this.get_basket_goods_list();
    },
    // mounted(){
    //     try{
    //          const res= axios.post(`http://localhost:3000/goods/goods_list2`,{
    //            goods_name : this.goods.BASKET_GOODS_NAME
    //          });
    //          console.log('서버 응답', res);
    //           this.goods_id=res.data[0].goods_name;
    //           this.goods_stock=res.data[0].goods_stock;
             
              
    //         }catch(err){
    //         alert("가져오지못했습니다.")
    //         }
    //     },
            
    computed: {
    member() {
      return this.$store.state.member;
    }
  },
    unmounted(){},
    methods:{
        order(member_number){
            window.location.href=`http://localhost:8080/goods_order/0/${member_number}`;

        },
        goToDetail(goods_id) {
      window.location.href = `http://localhost:8080/goods_detail/${goods_id}`;
    },


        sliceList() {
            const start = 0 + this.pageNum * this.pageSize;
            this.pageGoodsList = this.goods.slice(start, start + this.pageSize);
        },
        setPage(page) {
            this.pageGoodsList = []
            this.pageNum = page - 1;
            this.sliceList()
        },
        async get_basket_goods_list(){
            
            let member_number = this.member.member_number;
            try{
            const res = await axios.get(`http://localhost:3000/goods/get_basket_goods_list/${member_number}`);
            console.log(res); 
            this.goods = res.data;
            this.pageCnt = Math.ceil(this.goods.length / this.pageSize)
            this.setPage(1)
            }catch(err){
            alert('get_basket_goods_list error')
            }
      },
      delete_basket(basket_number){
        axios.post(`http://localhost:3000/goods/delete_basket/${basket_number}`)
        .then(res => {
            if(res.data.message === 'complete'){
                alert('삭제되었습니다.')
                this.get_basket_goods_list();
                window.location.reload();
            }
        })
        .catch(error => {
            console.error(error);
            alert('오류발생');
        });
      },
        formatPrice(price) {
            if (price !== undefined) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return `${formattedPrice} 원`;
            }
            return '';
        },
        incrementQuantity(k) {
            k.BASKET_GOODS_COUNT++;
        },
        decrementQuantity(k) {
            if (k.BASKET_GOODS_COUNT > 1) {
                k.BASKET_GOODS_COUNT--;
            }
        },
        totalPrice() {
            const selected = this.pageGoodsList
            return selected.reduce((total, k) => {
                return total + k.BASKET_GOODS_COUNT * k.BASKET_GOODS_PRICE;
            }, 0);
        },
    }
}
</script>

<style>
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
.article-list > table th {
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