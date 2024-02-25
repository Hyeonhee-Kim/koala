<template>
      <div class="album py-5 bg-body-tertiary">
        <div class="container justify-content-center">
          <div id="title1" class="mt-5 mb-3"><h1>검색결과</h1> <hr class="mb-5"></div>

          
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
      pageSize : 8, // 한페이지에 보여줄 상품 갯수   
    };
  },

  setup(){},
  created(){
    this.get_goods_list(this.$route.params.keyword)
  },
  mounted(){},
  unmounted(){},

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

    async get_goods_list(keyword){
       let sortNum = 0;
       console.log(sortNum);
       console.log(keyword);
     try{
        if(keyword == ''){
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
    
      formatPrice(price) {
            if (price !== undefined) {
                const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                return `${formattedPrice} 원`;
            }
            return '';
        },

  }
}
</script>