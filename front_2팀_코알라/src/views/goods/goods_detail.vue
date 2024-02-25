<template>
    <main>
      <div class="container p-3">
        <div class="row">
          <div class="col-md-5">
            <img
              :width="520"
              :src="
                goods.GOODS_IMAGE
                  ? require(`../../../../node-back/uploads/uploadGoods/${goods.GOODS_IMAGE}`)
                  : '/goodsempty.jpg'
              "
              alt="상품 이미지"
            />
          </div>
          <div class="col-md-7">
            <div class="card shadow-sm">
              <div class="card-body">
                <h5 class="card-title"> {{ goods.GOODS_NAME}}<i
                    class="fa-regular fa-heart"
                    id="mandarin-title"
                    @click="addWish()"
                  ></i>
                </h5>
  
                <h5 class="card-title pt-3 pb-3 border-top">
                  판매가격: {{ format(goods.GOODS_PRICE) }}
                </h5>
                <p class="card-text border-top pt-3">
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SWEET == 1"
                    >단맛 : 강</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SWEET == 2"
                    >단맛 : 중</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SWEET == 3"
                    >단맛 : 약</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SPARK == 1"
                    >탄산 : 유</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SPARK == 2"
                    >탄산 : 무</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SOUR == 1"
                    >산미 : 강</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SOUR == 2"
                    >산미 : 중</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_SOUR == 3"
                    >산미 : 약</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_DEGREE == 1"
                    >0~10도</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_DEGREE == 2"
                    >10~20도</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_DEGREE == 3"
                    >20~30도</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_DEGREE == 4"
                    >30도이상</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_KIND == 1"
                    >증류주</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_KIND == 2"
                    >발효주</span
                  >
                  <span
                    class="badge bg-warning text-black mx-1"
                    v-if="goods.GOODS_KIND == 3"
                    >기타(혼성주)</span
                  >
                  <span class="text-black mx-1">배송기간 2일이내</span>
                </p>
  
                <div class="card-text border-top pb-3">
                  <div class="row pt-3">
                    <div class="col-auto">
                      <label class="col-form-label">구매수량</label>
                    </div>
                    <div class="col-auto">
                      <div class="input-group">
                        <span class="input-group-text" id="click" @click="minus"
                          >-</span
                        >
                        <input
                          type="text"
                          class="form-control"
                          style="width: 40px"
                          v-model="value"
                        />
                        <span class="input-group-text" id="click" @click="plus"
                          >+</span
                        >
                        <span class="mx-3 mt-2"
                          >남은 재고 : {{ goods.GOODS_STOCK }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row pt-3 pb-3 border-top">
                  <div class="col-6">
                    <h3>총 상품 금액</h3>
                  </div>
                  <div class="col-6" style="text-align: right">
                    <h3>{{ formatprice(goods.GOODS_PRICE * this.value) }}</h3>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="col-6 d-grid p-1">
                    <button
                      type="button"
                      class="btn btn-lg btn-secondary"
                      @click="addBasket()"
                    >
                      장바구니 담기
                    </button>
                  </div>
                  <div class="col-6 d-grid p-1">
                    <button
                      type="button"
                      class="btn btn-lg btn-dark"
                      @click="order(goods_id)"
                    >
                      주문하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container p-3">
        <div class="row">
          <div class="tabmenu">
            <input type="radio" name="tab" id="tab1" />
            <input type="radio" name="tab" id="tab2" />
            <input type="radio" name="tab" id="tab3" />
            <input type="radio" name="tab" id="tab4" />
            <input type="radio" name="tab" id="tab5" />
            <label for="tab1">상품상세정보</label>
            <label for="tab2">배송 안내</label>
            <label for="tab3">교환 및 반품안내</label>
            <label for="tab4">상품후기</label>
            <label for="tab5">상품 문의</label>
            <div class="tab1_content">
              <div class="col-12 d-flex justify-content-center">
                <img
                  :src="
                    goods.GOODS_IMAGE_DETAIL
                      ? require(`../../../../node-back/uploads/uploadGoods/${goods.GOODS_IMAGE_DETAIL}`)
                      : '/goodsempty.jpg'
                  "
                  alt="상품 이미지"
                />
              </div>
            </div>
            <div class="tab2_content">
              <p class="d-flex justify-content-center">
                <img
                  src="../../assets/4.jpg"
                  class="img-fluid"
                />
              </p>
            </div>
            <div class="tab3_content">
              <img
                src="../../assets/5.jpg"
                class="img-fluid"
              />
            </div>
            <div class="tab4_content">
              <div
                class="container-lg p-3 mb-3"
                style="
                  border: solid 1px gray;
                  border-radius: 5px;
                  font-size: 30px;
                  font-weight: bolder;
                "
              >
                <div class="row">
                  <div
                    class="col-md-2"
                    style="width: 170px; height: 260px; overflow: hidden"
                  >
                    <p class="d-flex justify-content-center">상품</p>
                    <img
                      src="../../../../node-back/uploads/uploadGoods/32-0.jpg"
                      class="d-block w-100 h-100"
                      alt="..."
                      style="object-fit: cover"
                    />
                  </div>
                  <div class="col-md-5">
                    <p class="d-flex justify-content-center">별점</p>
                  </div>
                  <div class="col-md-5">
                    <p class="d-flex justify-content-center">포토이미지</p>
                    <div>
                      <div class="image-box">
                        <!-- 이미지를 표시할 박스 -->
                        <img
                          v-for="(img, index) in img"
                          :key="index"
                          :src="img"
                          alt="이미지"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-lg">
                <div class="article-list table-common con p-3">
                  <table style=" table-layout: fixed">
                    <thead>
                      <tr>
                        <th scope="col">번호</th>
                        <th scope="col">제목</th>
                        <th scope="col">이미지</th>
                        <th scope="col">별점</th>
                        <th scope="col">작성자</th>
                        <th scope="col">작성일</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(h, i) in reviewList" :key="i">
                          <td>{{ pageNum * pageSize + i + 1 }}</td>
                          <td>{{ h.REVIEW_TITLE }}</td>
                          <td >
                            <img v-if="!h.REVIEW_IMAGE" src="../../assets/imgEmptyInput.png" alt="..." style="max-width: 50%;">
                            <img v-else :height="50" :src="require(`../../../../node-back/uploads/uploadGoods/${h.REVIEW_IMAGE}`)" alt="상품 이미지"> 
                          </td>
                          <td class="star-rating" >
                            <div class="star" v-for="index in 5" :key="index" style="display: inline;">
                              <span v-if="index < h.REVIEW_SCORE + 1"><i class="fa-solid fa-star"></i></span>
                              <span v-else= "index >= h.REVIEW_SCORE + 1"><i class="fa-regular fa-star" ></i></span>
                          </div> </td>
                          <td>{{ h.REVIEW_MEMBER_EMAIL }}</td>
                          <td>{{ h.REVIEW_DATE.split('T')[0] }}</td>    
                        </tr>
  
                    </tbody>
                  </table>
                </div>
              </div>
              <!-- <div class="container-lg p-3 mb-3" style="border: solid 1px gray; border-radius: 5px; font-size: 30px; font-weight: bolder;">
           <div class="row ">
               <div class="col-md-4">
                   <div class="dropdown">
                       <a class="btn btn-secondary dropdown-toggle mb-3 mt-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="height: 40px; width: 100%">
                         별점 선택
                       </a>
                     
                       <ul class="dropdown-menu">
                         <li><a class="dropdown-item" href="#">1</a></li>
                         <li><a class="dropdown-item" href="#">2</a></li>
                         <li><a class="dropdown-item" href="#">3</a></li>
                         <li><a class="dropdown-item" href="#">4</a></li>
                         <li><a class="dropdown-item" href="#">5</a></li>
                       </ul>
                     </div>
               </div>
               
               </div>
               <div class="input-group " style="height:400px">
                   <span class="input-group-text">상품 후기</span>
                   <textarea class="form-control" aria-label="With textarea"></textarea>
                 </div>
                
                 <div class="input-group">
                   <span class="input-group-text mb-3" style="height: 40px;" >사진 등록</span>
                   <input type="file"  class="form-control" accept="image/png,image/jpeg" style="height:40px">
                   <button type="button" class="btn btn-secondary" style="background-color:#FF8A3D; height:100%; float:right">리뷰 작성</button>
                 </div>
                  
                 
                 
           </div> -->
            </div>
            <div class="tab5_content">
              <button
                type="button"
                class="btn btn-primary"
                style="float: right; background-color: #ff8a3d"
                @click="goodsinquiry"
                v-if="!showQuestionForm"
              >
                문의 등록
              </button>
              <div
                class="container-lg p-3 mb-3"
                style="font-size: 20px; font-weight: bolder"
              >
                <!-- <div class="row">
                   <div class="col">상품Q&A</div>
                   <div class="col">
                       <div class="dropdown">
                           <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="float:right; background-color:#FF8A3D;">
                            정렬
                           </button>
                           <ul class="dropdown-menu">
                             <li><a class="dropdown-item" href="#">가장 오래된</a></li>
                             <li><a class="dropdown-item" href="#">가장 최근</a></li>
                           </ul>
                           <button class="btn btn-secondary  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="float:right; background-color:#FF8A3D; margin-right: 5px;">
                               답변
                             </button>
                             <ul class="dropdown-menu">
                               <li><a class="dropdown-item" href="#">답변완료</a></li>
                               <li><a class="dropdown-item" href="#">답변미응답</a></li>
                           </ul>
                           
                         </div>
                         
                       </div>
               
              
           </div> -->
              </div>
  
              <div class="article-list table-common con" v-if="!showQuestionForm">
                <table style=" table-layout: fixed">
                  <thead>
                    <tr>
                      <th class="col-md-1" scope="col">번호</th>
                      <th class="col-md-5" scope="col">제목</th>
                      <th class="col-md-2" scope="col">이메일</th>
                      <th class="col-md-2" scope="col">날짜</th>
                      <th class="col-md=2" scope="col">문의상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(h, i) in GOODSQUESTION"
                      :key="i"
                      id="click"
                      @click="modalopen(h.QUESTION_TITLE)"
                    >
                      <td>{{ pageNum * pageSize + i + 1 }}</td>
                      <td>{{ h.QUESTION_TITLE }}</td>
                      <td>{{ h.QUESTION_MEMBER_EMAIL }}</td>
                      <td>{{ h.QUESTION_DATE.split("T")[0] }}</td>
                      <td v-if="h.QUESTION_STATUS == 2">답변완료</td>
                      <td v-if="h.QUESTION_STATUS == 1">답변중</td>
                    </tr>
                  </tbody>
                </table>
                <div class="modal-wrap" v-show="modalCheck">
                  <div class="modal-container">
                    <div
                      class="modal-title"
                      style="padding: 5%; text-align: center; font-weight: bolder"
                    >
                      답변내용:{{ test }}
                    </div>
                    <div class="modal-btn d-flex justify-content-end">
                      <button class="btn btn-secondary" @click="modalClose()">
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-lg" v-if="showQuestionForm">
                <button
                  type="button"
                  class="btn btn-secondary mb-3"
                  style="background-color: #ff8a3d; height: 100%; float: right"
                  @click="goodsinquiry"
                >
                  이전
                </button>
                <div class="input-group" style="height: 40px">
                  <span class="input-group-text" style="width: 95.06px"
                    >작성자</span
                  >
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    style="height: 40px"
                    disabled
                    v-model="question.question_member_email"
                  ></textarea>
                </div>
                <div class="input-group" style="height: 40px">
                  <span class="input-group-text">문의 제목</span>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    style="height: 40px"
                    v-model="question.question_title"
                  ></textarea>
                </div>
                <div class="input-group" style="height: 400px">
                  <span class="input-group-text">문의 내용</span>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    v-model="question.question_content"
                  ></textarea>
                </div>
  
                <div class="input-group">
                  <span class="input-group-text mb-3" style="height: 40px"
                    >사진 등록</span
                  >
                  <input
                    type="file"
                    class="form-control"
                    accept="image/png,image/jpeg"
                    style="height: 40px"
                    @change="uploadFile($event.target.files, 0)"
                  />
                  <button
                    type="button"
                    class="btn btn-secondary"
                    style="background-color: #ff8a3d; height: 100%; float: right"
                    @click="questioncomplete()"
                  >
                    문의 작성
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    created() {
      this.getGoods();
      this.orderquestion();
      this.getReviewList(this.goods_id);
  
    },
  
    data() {
      return {
        value: 1,
        goods: [],
        GOODSQUESTION: [],
        goods_id: this.$route.params.goods_id,
        showQuestionForm: false,
        reviewList: [],
  
  
        pageNum: 0,
        pageSize: 10,
        question: {
          question_title: "",
          question_content: "",
          question_image: "",
          question_status: 1,
          question_member_email: this.$store.state.member.member_email,
        },
        modalCheck: false,
        question_title: "",
        test: "",
      };
    },
    computed: {
      member() {
        return this.$store.state.member;
      },
    },
  
    methods: {
      addWish(){
      if (this.member.member_number === "") {
        alert("로그인하셈");
        this.$router.push({ path: "/login" });
      } else {
        axios({
          url: "http://localhost:3000/mypage/wishlist_insert",
          method: "POST",
          data: {
            wish_member_number: this.member.member_number,
            wish_goods_name: this.goods.GOODS_NAME,
          },
        })
          .then((res) => {
            if (res.data.message == "check error") {
              alert("이미 담겨있어요!");
            } else {
              alert("찜 완료");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
      async getReviewList(goods_id) {
            try {
              const res = await axios.get(`http://localhost:3000/goods/reviewlist/${goods_id}`);
              this.reviewList = res.data;
              console.log(this.reviewList);
            }catch(err) {
              console.error(err);
            }
          },
  
      async modalopen(test) {
        this.modalCheck = true;
        this.question_title = test;
  
        try {
          const res = await axios.post(
            `http://localhost:3000/qna/get_question_answer`,
            {
              question_title: this.question_title,
            }
          );
          console.log("서버 응답", res);
          this.test = res.data[0].question_answer;
          console.log(this.test);
        } catch (err) {
          alert("가져오지못했습니다.");
        }
      },
      modalClose() {
        this.modalCheck = false;
      },
  
      async addBasket() {
        if (this.member.member_number === "") {
          alert("로그인하셈");
          this.$router.push({ path: "/login" });
        } else {
          axios({
            url: "http://localhost:3000/goods/basket_insert",
            method: "POST",
            data: {
              member_number: this.member.member_number,
              basket_goods_price: this.goods.GOODS_PRICE,
              basket_goods_name: this.goods.GOODS_NAME,
              basket_goods_count: this.value,
              basket_goods_image: this.goods.GOODS_IMAGE,
            },
          })
            .then((res) => {
              if (res.data.message == "check error") {
                alert("이미 담겨있어요!");
              } else {
                alert("장바구니 추가 완료");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
  
      async uploadFile(file, type) {
        let name = "";
        if (file) {
          name = file[0].name;
          console.log(name);
        } else {
          return; // 파일 업로드 안할시 반환
        }
        const formData = new FormData();
  
        formData.append("img", file[0]);
  
        for (let key of formData.keys()) {
          console.log(key, ":", formData.get(key));
        }
        try {
          axios({
            url: "http://localhost:3000/admin/upload_img",
            method: "POST",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          })
            .then((res) => {
              if (res.data.message == "success") {
                if (type == 0) {
                  this.question.question_image = name;
                }
              } else {
                alert("db error");
              }
            })
            .catch((e) => {
              console.log(e);
            });
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      },
      questioncomplete() {
        if (!this.validationCheck()) {
          return;
        } else {
          axios({
            url: "http://localhost:3000/qna/question",
            method: "POST",
            data: {
              question_title: this.question.question_title,
              question_content: this.question.question_content,
              question_image: this.question.question_image,
              question_status: this.question.question_status,
              question_member_email: this.$store.state.member.member_email,
              goods_question_id: this.goods_id,
            },
          })
            .then((res) => {
              if (res.data.message == "add_complete") {
                alert("문의 등록 성공!");
                this.question.question_title = "";
                this.question.question_content = "";
                window.location.reload();
                this.showQuestionForm = false;
              }
            })
            .catch((err) => {
              alert("오류 발생");
            });
        }
      },
      validationCheck() {
        if (this.question.question_title == "") {
          alert("제목을 등록해주세요");
          return false;
        }
  
        if (this.question.question_content == "") {
          alert("글을 입력해주세요.");
          return false;
        }
        return true;
      },
      goodsinquiry() {
        if (this.$store.state.member.member_email == "") {
          alert("로그인 후 이용가능합니다.");
          window.location.href = "http://localhost:8080/login";
        } else {
          this.showQuestionForm = !this.showQuestionForm;
        }
      },
      format(price) {
        if (price === undefined) {
          // price가 undefined인 경우 처리
          return "가격 정보 없음";
        }
        const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formatted} 원`;
      },

      minus() {
        this.value = Math.max(1, this.value - 1);
      },
      plus() {
        this.value += 1;
        if (this.goods.GOODS_STOCK < this.value) {
          alert("재고가 없습니다");
          this.value = this.goods.GOODS_STOCK;
        }
      },
      click() {},
  
      async orderquestion() {
        try {
          const goods_question_id = this.goods_id;
  
          const response = await axios.get(
            `http://localhost:3000/qna/goodsinquiry/${goods_question_id}`
          );
  
          this.GOODSQUESTION = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      formatprice(price) {
        const formattedPrice = price
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formattedPrice} 원`;
      },
  
      async getGoods() {
        try {
          const goods_id = this.goods_id;
  
          const response = await axios.get(
            `http://localhost:3000/goods/goods_detail/${goods_id}`
          );
          this.goods = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      order(goods_id) {
        axios({
          url: "http://localhost:3000/goods/goods_quantity",
          method: "POST",
          data: {
            goods_quantity: this.value,
            goods_id: this.goods_id,
          },
        })
          .then((res) => {
            if (res.data.message == "add_complete") {
              window.location.href =`http://localhost:8080/goods_order/1/${goods_id}`;
               
            }
          })
          .catch(() => {
            alert("오류 발생");
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .image-box {
    display: flex;
    flex-wrap: wrap;
  }
  
  .image-box img {
    width: 150px; /* 이미지의 크기를 조절할 수 있습니다. */
    height: 150px;
    margin: 5px; /* 이미지 간의 간격을 조절할 수 있습니다. */
  }
  .hidden-content {
    display: none;
    /* 추가적인 스타일을 필요에 따라 지정할 수 있음 */
  }
  #mandarin-title:hover {
    color: red;
    cursor: pointer;
  }
  #click:hover {
    cursor: pointer;
  }
  .tabmenu label {
    display: inline-block;
    font-size: 14px;
    padding: 10px;
    text-align: center;
    width: 20%;
    line-height: 25px;
    font-weight: bold;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 3px 3px 0 0;
    color: #777;
    border-width: 1px 1px 0 1px;
    cursor: pointer;
  }
  .tabmenu input:nth-of-type(1):checked ~ label:nth-of-type(1) {
    background-color: cornsilk;
    color: #669999;
  }
  .tabmenu input:nth-of-type(2):checked ~ label:nth-of-type(2) {
    background-color: cornsilk;
    color: #669999;
  }
  .tabmenu input:nth-of-type(3):checked ~ label:nth-of-type(3) {
    background-color: cornsilk;
    color: #669999;
  }
  .tabmenu input:nth-of-type(4):checked ~ label:nth-of-type(4) {
    background-color: cornsilk;
    color: #669999;
  }
  .tabmenu input:nth-of-type(5):checked ~ label:nth-of-type(5) {
    background-color: cornsilk;
    color: #669999;
  }
  
  .tabmenu > * {
    display: none;
  }
  .tabmenu input:nth-child(1):checked ~ .tab1_content,
  .tabmenu input:nth-child(2):checked ~ .tab2_content,
  .tabmenu input:nth-child(3):checked ~ .tab3_content,
  .tabmenu input:nth-child(4):checked ~ .tab4_content,
  .tabmenu input:nth-child(5):checked ~ .tab5_content {
    display: block;
  }
  .tabmenu .tab1_content,
  .tabmenu .tab2_content,
  .tabmenu .tab3_content,
  .tabmenu .tab4_content,
  .tabmenu .tab5_content {
    padding: 32px;
    border: 1px solid #ddd;
    width: 100%;
    height: 100%;
  }
  .tabmenu label:nth-of-type(1):hover {
    background-color: cornsilk;
  }
  .tabmenu label:nth-of-type(2):hover {
    background-color: cornsilk;
  }
  .tabmenu label:nth-of-type(3):hover {
    background-color: cornsilk;
  }
  .tabmenu label:nth-of-type(4):hover {
    background-color: cornsilk;
  }
  .tabmenu label:nth-of-type(5):hover {
    background-color: cornsilk;
  }
  
  html {
    font-family: "Noto Sans KR", sans-serif;
  }
  
  /* 노말라이즈 */
  body,
  ul,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
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
  
  .img-box > img {
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
  
  .line-height-0-ch-only > * {
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
  
  html,
  body {
    overflow-x: hidden;
  }
  
  .table-common > table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table-common .btn-box {
    text-align: center;
  }
  
  .table-common > table th,
  .table-common > table td {
    border: 1px solid black;
    padding: 10px;
  }
  
  .article-list table {
    border: none;
    border-top: 2px solid lightgray;
    border-bottom: 2px solid lightgray;
  }
  
  .article-list > table th,
  .article-list > table td {
    border: none;
  }
  
  .article-list > table td {
    border-bottom: 1px solid lightgray;
  }
  
  .article-list > table thead {
    border-bottom: 2px solid lightgray;
    background-color: #f5f5f5;
  }
  
  .article-detail {
    border: 2px solid lightgray;
  }
  
  .article-detail > table {
    border: none;
    width: calc(100% - 100px);
  }
  
  .article-detail > table th,
  .article-detail > table td {
    border: none;
  }
  
  .article-detail > table tr:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
  
  .article-detail > table tr:not(.article-body),
  .article-detail > table tr:not(.article-body) > td {
    height: 20px;
    font-size: 0.8rem;
  }
  
  .article-detail > table tr.article-title > td {
    height: 40px;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .article-detail > table td:last-child {
    padding-right: 100px;
  }
  
  .article-detail > .article-writer {
    width: 100px;
    height: 102px;
    background-color: lightgray;
    border-bottom: 1px solid lightgray;
    text-align: center;
  }
  
  .article-detail > .article-writer .writer-icon {
    margin: 0 auto;
    background-color: white;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  
  .reply {
    margin-top: 20px;
    border: 2px solid lightgray;
    padding: 15px;
    box-sizing: border-box;
  }
  
  .reply-form {
    padding: 10px;
  }
  
  .reply-form > form input[type="text"] {
    width: 200px;
  }
  
  .reply-form > form textarea {
    width: calc(100% - 100px);
    min-height: 40px;
  }
  
  .reply-form > form input[type="submit"] {
    width: 80px;
    height: 40px;
    transform: translatey(-40%);
  }
  
  .reply-form > form > div:not(:last-child) {
    margin-bottom: 5px;
  }
  
  .reply-list > table {
    border: none;
  }
  
  .reply-list > table th {
    display: none;
  }
  
  .reply-list > table td {
    border: none;
  }
  
  .reply-list > table tr:nth-child(2n + 1) {
    background-color: rgba(0, 0, 0, 0.06);
  }
  
  .reply-list > table td:first-child {
    font-weight: bold;
  }
  
  .reply-list > table td:first-child::after {
    content: " : ";
    font-weight: bold;
  }
  .dropdown-menu {
    width: 100%; /* 또는 다른 너비 값 설정 가능 */
  }
  
  .dropdown-item {
    width: 100%; /* 또는 다른 너비 값 설정 가능 */
  }
  
  .star {
    color: #ffcd39;
  }
  </style>
  