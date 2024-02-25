<template>
  <main>
      <div class="album py-5 bg-body-tertiary">
      <div class="container justify-content-center">
        <div id="title1" class="mt-5 mb-3">
          <div class="row">

          </div>
        </div>
        
        <section>
          <div class="container-fluid">
            <div class="row justify-content-center align-items-center">
              <img src="../../assets/banner.jpg" alt="" style="height: 50vh;">
            </div>
          </div>
        </section>
        <hr>
        
        <div id="title1" class="mt-5 mb-3">
          <h2>뒷맛이 깔끔한 증류주</h2>
          <div class="row">
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div class="col" v-for="(k,i) in filteredGoodsList(1).slice(0,4)" :key="i">
            <div class="card shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="100%" height="225" id="img" 
              :src="k.GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${k.GOODS_IMAGE}`) :'/goodsempty.jpg'"  @click="goToDetail(k.GOODS_ID)"/>
              <div class="card-body">
                <p class="card-text"><strong>{{k.GOODS_NAME}}</strong></p>
                <p align="right">
                  <!-- 취향태그 자리 -->
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group align-left">
                    
                  </div>
                  
            <small class="text-body-secondary" >{{ formatPrice(k.GOODS_PRICE) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div id="title1" class="mt-5 mb-3">
          <hr>
          <h2>연말 파티에 어울리는 술</h2>
          <div class="row">
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div class="col" v-for="(k,i) in filteredGoodsList(2)" :key="i">
            <div class="card shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="100%" height="225" id="img" 
              :src="k.GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${k.GOODS_IMAGE}`) :'/goodsempty.jpg'"  @click="goToDetail(k.GOODS_ID)"/>
              <div class="card-body">
                <p class="card-text"><strong>{{k.GOODS_NAME}}</strong></p>
                <p align="right">
                  <!-- 취향태그 자리 -->
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group align-left">
                    
                  </div>
                  <small class="text-body-secondary">{{ formatPrice(k.GOODS_PRICE) }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="title1" class="mt-5 mb-3">
          <hr>
          <h2>달콤하고 맛있는 전통주</h2>
          <div class="row">
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div class="col" v-for="(k,i) in filteredGoodsList(3)" :key="i">
            <div class="card shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="100%" height="225" id="img" 
              :src="k.GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${k.GOODS_IMAGE}`) :'/goodsempty.jpg'"  @click="goToDetail(k.GOODS_ID)"/>
              <div class="card-body">
                <p class="card-text"><strong>{{k.GOODS_NAME}}</strong></p>
                <p align="right">
                  <!-- 취향태그 자리 -->
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group align-left">
                   
                  </div>
                  <small class="text-body-secondary">{{ formatPrice(k.GOODS_PRICE) }}</small>
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
    data() {
        return {
            goods: [],
            pageGoodsList : [], //한페이지당 들어갈 상품 리스트
            pageNum: 0,
            pageCnt : 0,
            pageSize : 4, // 한페이지에 보여줄 상품 갯수
            goods_sort : '오래된 순',
            keyword : '',
            selectOption_kind_res:'주종',
            selectOption_degree_res:'도수',
            selectOption_sour_res:'산미',
            selectOption_spark_res:'탄산',
            selectOption_sweet_res:'단맛',
            selectOption_sort_res:'최근 순',

        };
    },
    created() {
        this.get_goods_list(0);
    },
    methods:{
     
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
                    this.$router.push({ path : '/goods_all' });
                })
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
              //  console.log(res); 
               this.goods = res.data;
               this.pageCnt = Math.ceil(this.goods.length / this.pageSize)
               this.setPage(1)
             }catch(err){
             alert('get_goods_list error')
           }
          },
          filteredGoodsList(kind) {
            return this.goods.filter((t) => t.GOODS_KIND === kind);
        },

    },
      
    
    
  mounted() {	
   
  }
}








</script>

<style>
#banner-img {
  display: block;
}

#img{
  border: 1px solid #aaaaaa;
}
</style>
