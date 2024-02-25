<template>
  <div>
      <div class="article-list table-common con">
          <table style=' width:1300px; table-layout:fixed;'>
              <thead>
                  <tr> 
                  <th scope="custom-style" style="text-align: center;">번호</th>
                  <th scope="col" style="text-align: center;">상품사진</th>
                  <th scope="col" style="text-align: center;">상품명</th>
                  <th scope="col" style="text-align: center;">가격</th>
                  <th scope="col" style="text-align: center;">삭제</th>
                  </tr>
              </thead>
              <tbody>
                <tr v-for="(h ,i) in pageGoodsList" :key="i" id="click" >
                         <td>{{ h.WISH_NUMBER }}</td>
                         <td> <img class="bd-placeholder-img card-img-top" width="100%" height="180" id="img" 
                             :src="h.GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${h.GOODS_IMAGE}`) :'/goodsempty.jpg'"  @click="goToDetail(k.GOODS_ID)"/></td>
                         <td>{{ h.WISH_GOODS_NAME }}</td>
                         <td>{{ h.GOODS_PRICE }}</td>
                         <td>
                          <button class="btn btn-sm btn-warning" @click="delete_wishlist(h.WISH_NUMBER)">삭제</button>
                         </td>
                      </tr>
              </tbody>
          </table>
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
            pageSize : 3, // 한페이지에 보여줄 상품 갯수
        };
    },
    setup(){},
    created(){
        this.get_wishlist();
    },
    mounted(){},
    computed: {
    member() {
      return this.$store.state.member;
    }
  },
    unmounted(){},
    methods:{
        sliceList() {
            const start = 0 + this.pageNum * this.pageSize;
            this.pageGoodsList = this.goods.slice(start, start + this.pageSize);
        },
        setPage(page) {
            this.pageGoodsList = []
            this.pageNum = page - 1;
            this.sliceList()
        },
        async get_wishlist(){
            let member_number = this.member.member_number;
            try{
            const res = await axios.get(`http://localhost:3000/mypage/get_wishlist/${member_number}`);
            console.log(res); 
            this.goods = res.data;
            this.pageCnt = Math.ceil(this.goods.length / this.pageSize)
            this.setPage(1)
            }catch(err){
            alert('get_wishlist error')
            }
      },
      delete_wishlist(wish_number){
        axios.post(`http://localhost:3000/mypage/delete_wishlist/${wish_number}`)
        .then(res => {
            if(res.data.message === 'complete'){
                alert('삭제되었습니다.')
                this.get_wishlist();
                window.location.reload();
            }
        })
        .catch(error => {
            console.error(error);
            alert('오류발생');
        });
      },
    }
}
</script>


<style scoped>
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
  color: yellow;
}

.table-common>table th, .table-common>table td {
  border: 1px solid black;
  padding: 15px;
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

.custom-style {
  width: 10px;
}


.tabletop {
text-align: center;
}

.th {
  padding: 100px;
  text-align: center;
}

.btn-delete {
  background-color: #ffcd39;
}

</style>

