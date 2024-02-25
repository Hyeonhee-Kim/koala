<template>
    <body>
      
   
      <div class="container-lg mt-3 p-5">
      <table width="1300" heigth="auto" >
      
      <tr>
         <td>상품명</td>
         <td><input class="form-control" type="text" v-model="goods.goods_name" > </td>
      </tr>
      <tr>
         <td>가격</td>
         <td><div class="input-group d-flex justify-content-center">
          <input type="text" class="form-control"  v-model="goods.goods_price">
          <span class="input-group-text" >원</span>
        </div> </td>
      </tr>
      <tr>
         <td>카테고리</td>
         <td>
            <div class="btn-group"  style="float: right; margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            {{selectOption_kind_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(0)">주종</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(1)">증류주</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(2)">발효주</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(3)">기타(혼성주)</a></li>
              </ul>
            </div> <div class="btn-group " style="float: right;margin-right:4px ">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            {{selectOption_degree_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_degree(0)">도수</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_degree(1)">0~10도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_degree(2)">10~20도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_degree(3)">20~30도</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_degree(4)">30도이상</a></li>
              </ul>
            </div> 
        <div class="btn-group " style="float: right;margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            {{selectOption_sour_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(0)">산미</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(1)">강</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(2)">중</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(3)">약</a></li>
           
              </ul>
            </div> 
        <div class="btn-group " style="float: right; margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            {{selectOption_spark_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_spark(0)">탄산</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_spark(1)">유</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_spark(2)">무</a></li>
            
           
              </ul>
            </div>
        <div class="btn-group " style="float: right; margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
            {{selectOption_sweet_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(0)">단맛</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(1)">강</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(2)">중</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(3)">약</a></li>
           
              </ul>
            </div> 
    </td>
      </tr>
      <tr>
         <td>썸네일 이미지</td>
         <td >
            
          <input type="file"  class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)" style="float: right; margin-right:4px; background-color:#FF8A3D" >
          
         </td>
      </tr>
      <tr>
         <td>상품 상세 이미지</td>
         <td>
          
          <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1)" style="float: right; margin-right:4px; background-color:#FF8A3D"   >
         </td>
      </tr>
      <tr>
         <td>재고</td>
         <td><div class="input-group d-flex justify-content-center">
          <input type="number" min="0" class="form-control"  v-model="goods.goods_stock">
          <span class="input-group-text" >개</span>
        </div>  </td>
      </tr>
      </table>
         </div>
         <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" @click="back()" style="float: right; margin-right:4px ">이전</button>
          <button type="button" class="btn btn-primary" @click="goodsInsert()" style="float: right; margin-right:4px">저장</button>
         </div>
        </body>
</template>

<script>

import axios from 'axios';


export default {
  data() {
    return{
      goods: {
        goods_name:"",
        goods_image:"",
        goods_price:0,
        goods_stock:0,
        goods_sell:0,
        goods_degree:0,
        goods_kind:0,
        goods_spark:0,
        goods_sour:0,
        goods_sweet:0,
        goods_image_detail:""
        
        
      },
      selectOption_kind_res:'주종',
      selectOption_degree_res:'도수',
      selectOption_sour_res:'산미',
      selectOption_spark_res:'탄산',
      selectOption_sweet_res:'단맛'

    }
    },
    methods: {
      back(){
        window.location.href="http://localhost:8080/goodsmanager";
      },
      
      async uploadFile(file, type){
      
    let name ="";
    if(file){
      name = file[0].name;
    }
    else {
      return; // 파일 업로드 안할시 반환
    }
    const formData = new FormData();
    formData.append('img',file[0]);

    for(let key of formData.keys()) {
      console.log(key,":",formData.get(key));
    }
    try{
      axios({
        url: "http://localhost:3000/goods/upload_img",
        method : 'POST',
        headers : {'Content-Type' : 'multipart/form-data'},
        data : formData
      }).then((res)=>{
        if(res.data.message == 'success'){
          if(type == 0) {
            this.goods.goods_image = name;
          } else if (type == 1) {
            this.goods.goods_image_detail = name; 
          }
        }else {
          alert("db error");
        }
      }).catch(e =>{
        console.log(e);
      })
      return true;
    }catch(err){
      console.log(err);
      return false;
    }
  },
      selectOption_kind(num) {
    if(num == 0){ 
      this.selectOption_kind_res = '주종';
    } else if (num == 1){
      this.selectOption_kind_res = '증류주';
      this.goods.goods_kind = 1;
    } else if (num == 2) {
      this.selectOption_kind_res = '발효주';
      this.goods.goods_kind = 2;
    } else if (num == 3) {
      this.selectOption_kind_res = '기타(혼성주)';
      this.goods.goods_kind = 3;
    } 
  },selectOption_degree(num) {
    if(num == 0){ 
      this.selectOption_degree_res = '도수';
    } else if (num == 1){
      this.selectOption_degree_res = '0~10도';
      this.goods.goods_degree = 1;
    }else if (num == 2){
      this.selectOption_degree_res = '10~20도'
      this.goods.goods_degree = 2;
    } else if (num == 3) {
      this.selectOption_degree_res = '20~30도'
      this.goods.goods_degree = 3;
    } else if (num == 4) {
      this.selectOption_degree_res = '30도이상'
      this.goods.goods_degree = 4;
    } 
  },selectOption_sour(num) {
    if(num == 0){ 
      this.selectOption_sour_res = '산미'
    }else if (num == 1){
      this.selectOption_sour_res = '강';
      this.goods.goods_sour = 1;
    } else if (num == 2){
      this.selectOption_sour_res = '중';
      this.goods.goods_sour = 2;
    } else if (num == 3) {
      this.selectOption_sour_res = '약';
      this.goods.goods_sour = 3;
    }
  },selectOption_spark(num) {
    if(num == 0){ 
      this.selectOption_spark_res = '탄산'
    } else if (num == 1){
      this.selectOption_spark_res = '유';
      this.goods.goods_spark = 1;
    } else if (num == 2) {
      this.selectOption_spark_res = '무';
      this.goods.goods_spark = 2;
     }
    }, selectOption_sweet(num) {
    if(num == 0){ 
      this.selectOption_sweet_res = '단맛';
    } else if (num == 1){
      this.selectOption_sweet_res = '강';
      this.goods.goods_sweet = 1;
    } else if (num == 2) {
      this.selectOption_sweet_res = '중';
      this.goods.goods_sweet = 2;
     }else if (num == 3) {
      this.selectOption_sweet_res = '약';
      this.goods.goods_sweet = 3;
     }},
     
          goodsInsert(){
            if (!this.validationCheck()) {
                return;
            }
            else {
                axios({
                    url: "http://localhost:3000/goods/add_goods",
                    method: "POST", 
                    data : {
                          goods_name : this.goods.goods_name,
                          goods_price : this.goods.goods_price,
                          goods_sweet : this.goods.goods_sweet,
                          goods_spark : this.goods.goods_spark,
                          goods_sour : this.goods.goods_sour,
                          goods_degree : this.goods.goods_degree,
                          goods_kind : this.goods.goods_kind,
                          goods_stock : this.goods.goods_stock,
          
         
                          //이미지
                           goods_image : this.goods.goods_image,
                           goods_image_detail : this.goods.goods_image_detail
        },
                })
                    .then((res) => {
                        if(res.data.message=='add_complete'){
                            alert('제품 등록 성공!');
                            
            
                            window.location.href = "http://localhost:8080/admin/admin_goods_manager";
                           
                            
                        } else if (res.data.message == 'already_exist_goods'){
                            alert("이미 등록된 제품입니다.");
                        }
                        else if (res.data.message == '파일 변경 실패'){
                            alert("파일 변경 실패");
                        }
                        else {
                            alert("제품 등록 실패");
                        }
                })
                    .catch(() => {
                      
                        alert("오류 발생")
                    })
            }
        },validationCheck() {
            if (this.goods.goods_name == ""){
               alert("제품명은 필수 입력값입니다.");
                return false;
            }
            
            if (this.goods.goods_price == "" || this.goods.goods_price == 0){
                alert("제품 가격을 입력하세요.");
                return false;
            }
            if (this.goods.goods_sweet == "" || this.goods.goods_sweet == 0){
                alert("제품 단맛을 설정하세요.");
                return false;
            }
            if (this.goods.goods_spark == "" || this.goods.goods_spark == 0){
                alert("제품 탄산을 설정하세요.");
                return false;
            }
            if (this.goods.goods_sour == "" || this.goods.goods_sour == 0){
                alert("제품 산미을 설정하세요.");
                return false;
            }
            if (this.goods.goods_degree == "" || this.goods.goods_degree == 0){
                alert("제품 도수를 설정하세요.");
                return false;
            }
            if (this.goods.goods_kind == "" || this.goods.goods_kind == 0){
                alert("제품 주종을 설정하세요.");
                return false;
            }
            
            if (this.goods.goods_image == ""){
                alert("썸네일 이미지를 등록해주세요.");
                return false;
            }
            if (this.goods.goods_image_detail == ""){
                alert("제품 상세 이미지를 등록해주세요.");
                return false;
            }
            if (this.goods.goods_stock == "" || this.goods.goods_stock == 0){
                alert("제품 재고를 설정하세요.");
                return false;
            }
            
            return true;
        },

    },
}
</script>


<style>


table {
  width: 100%;
  min-width: 500px;
  border: 2px solid #444444; 
  border-collapse: collapse;
  text-align: center;
}
th, td {
  border: 2px solid #444444;
  padding: 10px;
}
td:nth-child(1) {
background-color: #F5F5F5;
}


</style>
