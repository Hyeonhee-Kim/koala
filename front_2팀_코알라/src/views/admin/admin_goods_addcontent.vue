<template>
    <body>
    
      <div class="container-lg mt-3 p-5">
        <div v-for="(goods,i) in content" :key="i" class="post">
      <table width="1300" heigth="auto" >
        
      <tr>
         <td>상품명</td>
         <td><input class="form-control" type="text"  v-model="goods.GOODS_NAME" :disabled="editable===false"> </td>
      </tr>
      <tr>
         <td>가격</td>
         <td><div class="input-group d-flex justify-content-center">
          <input type="text" class="form-control"  v-model="goods.GOODS_PRICE" :disabled="editable===false">
          <span class="input-group-text" >원</span>
        </div> </td>
      </tr>
      <tr>
         <td>카테고리</td>
         <td>
          <div style="float: right; margin-right:4px"><select class="form-select" :disabled="editable===false" v-model="goods.GOODS_KIND" aria-label="Default select example" style="width:120px;">
                    <option disabled value="0">[주종]</option>
                    <option value="1">증류주</option>
                    <option value="2">발효주</option>
                    <option value="3">기타(혼성주)</option>
          
                  </select></div>
                  <div style="float: right; margin-right:4px"><select class="form-select" :disabled="editable===false" v-model="goods.GOODS_DEGREE" aria-label="Default select example" style="width:120px;">
                    <option disabled value="0">[도수]</option>
                    <option value="1">0~10도</option>
                    <option value="2">11~20도</option>
                    <option value="3">21~30도</option>
                    <option value="3">30도 초과</option>
                    
                  </select></div>
                  <div style="float: right; margin-right:4px">
                  <select class="form-select" :disabled="editable===false" v-model="goods.GOODS_SOUR" aria-label="Default select example" style="width:120px;">
                    <option disabled value="0">[산미]</option>
                    <option value="1">강</option>
                    <option value="2">중</option>
                    <option value="3">약</option>
                    
                  </select></div>
                  <div style="float: right; margin-right:4px">
                  <select class="form-select" :disabled="editable===false" v-model="goods.GOODS_SPARK" aria-label="Default select example" style="width:120px;">
                    <option disabled value="0">[탄산]</option>
                    <option value="1">유</option>
                    <option value="2">무</option>
                  
                    
                  </select></div>
                  <div style="float: right; margin-right:4px">
                  <select class="form-select" :disabled="editable===false" v-model="goods.GOODS_SWEET" aria-label="Default select example" style="width:120px;">
                    <option disabled value="0">[단맛]</option>
                    <option value="1">강</option>
                    <option value="2">중</option>
                    <option value="3">약</option>
                    
                  </select></div>
            <!-- <div class="btn-group"  style="float: right; margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" :disabled="editable===false">
            {{selectOption_kind_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(0)">주종</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(1)">증류주</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(2)">발효주</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_kind(3)">기타(혼성주)</a></li>
              </ul>
            </div> <div class="btn-group " style="float: right;margin-right:4px ">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" :disabled="editable===false">
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
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" :disabled="editable===false">
            {{selectOption_sour_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(0)">산미</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(1)">강</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(2)">중</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sour(3)">약</a></li>
           
              </ul>
            </div> 
        <div class="btn-group " style="float: right; margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" :disabled="editable===false">
            {{selectOption_spark_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_spark(0)">탄산</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_spark(1)">유</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_spark(2)">무</a></li>
            
           
              </ul>
            </div>
        <div class="btn-group " style="float: right; margin-right:4px">
          <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" :disabled="editable===false">
            {{selectOption_sweet_res}}</button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(0)">단맛</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(1)">강</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(2)">중</a></li>
                <li><a class="dropdown-item" href="#" @click="selectOption_sweet(3)">약</a></li>
           
              </ul>
            </div>  -->
    </td>
    
      </tr>
      <tr>
         <td>썸네일 이미지</td>
         <td >
            
          <input type="file"  class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 0)" style="float: right; margin-right:4px; background-color:#FF8A3D" :disabled="editable===false">
          
         </td>
      </tr>
      <tr>
         <td>상품 상세 이미지</td>
         <td>
          
          <input type="file" class="form-control" accept="image/png,image/jpeg"  @change="uploadFile($event.target.files, 1)" style="float: right; margin-right:4px; background-color:#FF8A3D" :disabled="editable===false">
         </td>
      </tr>
      <tr>
         <td>재고</td>
         <td><div class="input-group d-flex justify-content-center">
          <input type="number" min="0" class="form-control"  v-model="goods.GOODS_STOCK" :disabled="editable===false">
          <span class="input-group-text" >개</span>
        </div>  </td>
      </tr>
      
      </table>
      </div>
         </div>
         
         
         <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-secondary" @click="goodsupdate()" style="float: right; margin-right:4px " v-if="editable===false" >수정</button>
          <button class="btn btn-primary" type="button" @click="goodscomplete()" v-if="editable===true " style="margin-right:4px">수정완료</button>
          <button type="button" class="btn btn-primary" @click="cancel()" style="float: right; margin-right:4px" >취소</button>
          
         </div>
        
        </body>


</template>

<script>
import axios from 'axios';

export default{
  data(){
    return{
    content:[],
    editable: false,
    
    }
  },
  mounted(){
    
    axios({
                  url: "http://localhost:3000/goods/goodscontent",
                  method: "POST",
                  data: {
                      goods_id: this.$route.query.goods_id
            },
      }).then(res => {
        console.log(res)
        this.content = res.data;
      
       
      }).catch(err => {
        alert(err);
      });

  },
  methods:{
    async uploadFile(file, type){
      console.log(file)
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
          url: "http://localhost:3000/goods/update_img",
          method : 'POST',
          headers : {'Content-Type' : 'multipart/form-data'},
          data : formData
        }).then((res)=>{
          if(res.data.message == 'success'){
            if(type == 0) {
              this.content[0].GOODS_IMAGE = name;
            } else if (type == 1) {
              this.content[0].GOODS_IMAGE_DETAIL = name; 
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
    cancel(){
       window.location.href="http://localhost:8080/goods_manager"
    },
    goodsupdate(){
      this.editable=true;
    },
    goodscomplete(){
      axios.post("http://localhost:3000/goods/updategoods", {
          goods_name: this.content[0].GOODS_NAME,
          goods_price: this.content[0].GOODS_PRICE,
          goods_sweet: this.content[0].GOODS_SWEET,
          goods_spark: this.content[0].GOODS_SPARK,
          goods_sour: this.content[0].GOODS_SOUR,
          goods_degree: this.content[0].GOODS_DEGREE,
          goods_kind: this.content[0].GOODS_KIND,
          goods_id:this.content[0].GOODS_ID,
          goods_stock:this.content[0].GOODS_STOCK,

          goods_image:this.content[0].GOODS_IMAGE,
          goods_image_detail:this.content[0].GOODS_IMAGE_DETAIL
  
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
  
          });
        alert("수정완료");
        this.editable = false;
        window.location.href="http://localhost:8080/admin/admin_goods_manager"

    },

  }
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