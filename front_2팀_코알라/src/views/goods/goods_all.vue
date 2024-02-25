<template>
  <main>
      <div class="album py-5 bg-body-tertiary">
      <div class="container justify-content-center">
        <div id="title1" class="mt-5 mb-3">
          <h1>전체상품</h1>
          <div class="row">
          <hr>
          <div class="row">
           

            
            

            
            
         
            <p class="h6"> 총 상품 <strong>{{goods.length}}</strong> 개</p>
          

            <div class="col-11"></div>
            <div class="dropdown col-1">
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

          </div>
        </div>
      


        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div class="col" v-for="(k,i) in pageGoodsList" :key="i">
            <div class="card shadow-sm">
              <img class="bd-placeholder-img card-img-top" width="100%" height="225" id="img" 
              :src="k.GOODS_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${k.GOODS_IMAGE}`) :'/goodsempty.jpg'"  @click="goToDetail(k.GOODS_ID)"/>
              <div class="card-body">
                <p class="card-text"><strong>{{k.GOODS_NAME}}</strong></p>
                <p align="right">

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
      <!-- 페이징 -->
        <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center mt-5">
                      <ul v-for="i in pageCnt" :key="i" class="pagination justify-content-center">
                          <a style="text-decoration: none;">
                              <li v-if="i != pageNum + 1" class="page-item page-link" @click="setPage(i)">{{ i }}</li>
                              <li v-else class="page-item page-link active" @click="setPage(i)">{{ i }}</li>
                          </a>
                      </ul>
                  </ul>
                </nav>
      
         

          
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
            pageSize : 8, // 한페이지에 보여줄 상품 갯수
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
      categoryType(goods_kind){
      if(goods_kind == 1){
        return '증류주';
      }
      else if(goods_kind == 2){
        return '발효주';
      }
      else if (goods_kind ==3 ){
        return '기타';
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
      
      selectOption_kind(num) {
        if(num == 0){ 
          this.selectOption_kind_res = '주종';
        } else if (num == 1){
          this.selectOption_kind_res = '증류주';
        } else if (num == 2) {
          this.selectOption_kind_res = '발효주';
        } else if (num == 3) {
          this.selectOption_kind_res = '기타(혼성주)';
        } 
      },
      selectOption_degree(num) {
        if(num == 0){ 
          this.selectOption_degree_res = '도수';
        } else if (num == 1){
          this.selectOption_degree_res = '0~10도';
        }else if (num == 2){
      this.selectOption_degree_res = '10~20도'
    } else if (num == 3) {
      this.selectOption_degree_res = '20~30도'
    } else if (num == 4) {
      this.selectOption_degree_res = '30도이상'
    } 
  },selectOption_sour(num) {
    if(num == 0){ 
      this.selectOption_sour_res = '산미'
    }else if (num == 1){
      this.selectOption_sour_res = '강';
    } else if (num == 2){
      this.selectOption_sour_res = '중';
    } else if (num == 3) {
      this.selectOption_sour_res = '약';
    }
  },
  selectOption_sweet(num) {
    if(num == 0){ 
      this.selectOption_sweet_res = '단맛';
    } else if (num == 1){
      this.selectOption_sweet_res = '강';
    } else if (num == 2) {
      this.selectOption_sweet_res = '중';
    }else if (num == 3) {
      this.selectOption_sweet_res = '약';
    }
  },
  goToOrder(){
            this.$router.push({path : '/goods_order'});
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
