<template>
  <div>
  
  <div class="container-lg d-flex flex-wrap justify-content-start justifent-lg-start mt-4 pb-3">

    <div class="col-3" style="font-size: 20px;  font-weight: bolder;">재고관리</div>
    <div class="col-6"></div>
    <div class="col-2">
      <div class="dropdown ms-5">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false" style="border: none;"> {{ goods_sort }}</button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a class="dropdown-item" href="#" @click="sortList(0)">오래된 순</a></li>
              <li><a class="dropdown-item" href="#" @click="sortList(1)">최근 순</a></li>
              <li><a class="dropdown-item" href="#" @click="sortList(2)">가격낮은 순</a></li>
              <li><a class="dropdown-item" href="#" @click="sortList(3)">가격높은 순</a></li>
              <li><a class="dropdown-item" href="#" @click="sortList(4)">이름 순</a></li>
          </ul>
      </div>
    </div>
         <div class="col-1">
            <button type="button" class="btn btn-primary  " style="float: right;" @click="goodsInsert()">상품 등록</button>
          </div>  
  </div>



  <div class="article-list table-common con">
      <table style=' height:500px;table-layout:fixed;'>
          <thead>
              <tr>
                  <th scope="col">번호</th>
                  <th scope="col">썸네일</th>
                  <th scope="col">상품명</th>
                  <th scope="col">카테고리</th>
                  <th scope="col">가격</th>
                  <th scope="col">재고</th>
                  <th scope="col">관리</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(goods, i) in pageGoodsList" :key="i">
                <th scope="row">{{ pageNum * pageSize + i + 1 }}</th>
                <td ><img :height="50" :src="require(`../../../../node-back/uploads/uploadGoods/${goods.GOODS_IMAGE}`)" alt="상품 이미지"> </td>
                <td>{{ goods.GOODS_NAME }}</td>
                <td>{{ categoryType(goods.GOODS_KIND) }}</td>
                <td>{{ formatPrice(goods.GOODS_PRICE) }}</td>
                <td>{{ goods.GOODS_STOCK }}</td>
                <td><div class="d-flex justify-content-start" style="display:flex;"><button type="button" class="btn btn-secondary" style="float: left;" @click="modalOpen(goods.GOODS_ID)">삭제</button> 
                  <div class="modal-wrap" v-show="modalCheck">
                          <div class="modal-container">
                            <div class="modal-title" style="padding: 5%; text-align: center; font-weight: bolder;">삭제하시겠습니까?</div>
                            <div class="modal-btn d-flex justify-content-end">
                              <button class="btn btn-warning me-2" @click="delete_goods(test)">삭제</button>
                                  <button class="btn btn-secondary " @click="modalClose()" >닫기</button>
                              </div>
                          </div>

                      </div>
                  
                  <button type="button" class="btn btn-secondary" style="float:left; margin-left:5px" @click="updategoods(goods.GOODS_ID)">수정</button></div></td>
              </tr>
             
              
            </tbody>
          </table>
          <!-- 페이징 버튼 -->
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center mt-4">
                <ul v-for="i in pageCnt" :key="i" class="pagination justify-content-center">
                    <a href="#top" style="text-decoration: none;">
                        <li v-if="i != pageNum + 1" class="page-item page-link" @click="setPage(i)">{{ i }}</li>
                        <li v-else class="page-item page-link active" @click="setPage(i)">{{ i }}</li>
                    </a>
                </ul>
            </ul>
          </nav>

      
  </div>
</div>

</template>
<script>
import axios from 'axios';
export default{
  data() {
      return {
          goods: [],
          pageGoodsList : [], //한페이지당 들어갈 상품 리스트
          pageNum: 0,
          pageCnt : 0,
          pageSize : 16, // 한페이지에 보여줄 상품 갯수
          goods_sort : '오래된 순',
          keyword : '',
          modalCheck:false,
          test : 0,
         
      };
  },
  created() {
      this.get_goods_list(0);
  },
  methods:{
    updategoods(goods_id){
      window.location.href = window.location.pathname + '/goods_add?goods_id=' + goods_id
    },
    delete_goods(goods_id){
      axios.post(`http://localhost:3000/goods/delete_goods/${goods_id}`)
      .then(res => {
          if(res.data.message === 'complete'){
              alert('삭제되었습니다.')
              this.get_goods_list();
              window.location.reload();
          }
      })
  },
    modalClose(){
        this.modalCheck=false;
     },
    modalOpen(test){
      
      this.test = test
      this.modalCheck=true;
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
    goodsInsert(){
      window.location.href="http://localhost:8080/admin/goods_add";
    },
    sortList(sortNum) {
          if (sortNum == 0) {
              this.goods_sort = "오래된 순"
          } else if (sortNum == 1) {
              this.goods_sort = "최근 순"
          }
          else if (sortNum == 2) {
              this.goods_sort = "가격 낮은 순"
          }
          else if (sortNum == 3) {
              this.goods_sort = "가격 높은 순"
          }
          else {
              this.goods_sort = "이름 순"
          }
          this.get_goods_list(sortNum)
              .then(() => {
                  this.$router.push({ path : '/admin/goods_manager' });
              })
      },
    categoryType(goods_kind){
    if(goods_kind == 1){
      return '증류주';
    }
    else if(goods_kind == 2){
      return '발효주';
    }
    else if (goods_kind ==3 ){
      return '기타(혼성주)';
    } else {
      return '킵';
    }
  },
  formatPrice(goods_price){
    const formattedPrice = goods_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return `${formattedPrice} 원`;
  },
 async get_goods_list(sortNum){
  let keyword = this.keyword;
   try{
      if(this.keyword == ''){
        keyword = 'none'
      }
         const res = await axios.get(`http://localhost:3000/goods/get_goods_list/${sortNum}/${keyword}`);
         console.log(res); 
         this.goods = res.data;
         this.pageCnt = Math.ceil(this.goods.length / this.pageSize)
         this.setPage(1)
       }catch(err){
       alert('get_goods_list error')
     }
    },
  },
  
mounted() {	
 
}
}
</script>



<style>
.modal-wrap {
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
/* background: white; /
}
/ modal or popup */
}.modal-container {
position: relative;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 550px;
background: #fff;
border-style: solid;
border-radius: 10px;
padding: 20px;
box-sizing: border-box;
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

