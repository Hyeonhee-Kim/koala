<template>
  <header class="p-6">
   <div class="container">
     <div class="d-flex flex-wrap justifent-lg">

       <a href="#" class="d-flex align-items-center text-white text-decoration-none mt-2">
         <img src="../assets/koala_logo.jpg" class="bi" width="200" height="90" role="img" aria-label="Bootstrap" @click="goToMain()">
       </a>



       <div class="d-flex col-2"></div>

       <div class="col-4">
         <form class="mt-5">
          <input class="form-control-sm me-2" placeholder="제품 명 검색" @keyup.enter="goToSearch(keyword)" v-model="keyword" >
          <button class="btn btn-outline-*" style="cursor:pointer;" @click="goToSearch(keyword)"><i class="fa-solid fa-magnifying-glass fa-lg fa-test "></i></button>
        </form>
        </div>

            <div v-if="member.member_email == ''" class="text-end pull-right mt-5 mx-auto">
              <button type="button" @click="goToLogin()" class="btn btn-outline-*" style="cursor:pointer; padding-right: 4px;">로그인</button>
              <span>/</span>
              <button type="button" @click="JoinSelect()" class="btn btn-outline-*" style="cursor:pointer; padding-left: 4px;">회원가입</button>
            </div>
            <!--  -->

            <div v-else-if="admin_check == 1" class="text-end pull-right mt-5 mx-auto">
                <button type="button" @click="logout()" class="btn btn-outline-* mb-5" style="cursor:pointer; padding-right: 4px; ">로그아웃</button>
                <button type="button" @click="goToAdmin()" class="btn btn-outline-*" style="cursor:pointer; padding-left: 4px;"><i class="fa-solid fa-user-shield"></i>관리자</button>
            </div>

            <div v-else-if="admin_check == 0" class="text-end pull-right mt-5 mx-auto">
              <button type="button" @click="logout()" class="btn btn-outline-* mb-4" style="cursor:pointer;">로그아웃</button>
              <button type="button" @click="goToBasket()" class="btn btn-outline-*" style="cursor:pointer; padding-right: 2px;"><i class="fa-solid fa-bag-shopping fa-xl"></i></button>
              <button type="button" @click="goToMypage()" class="btn btn-outline-*" ><i class="fa-solid fa-user-large fa-xl"></i></button>
            </div>
      </div>

   <nav class="nav nav-underline nav-justified mt-4" style="font-size: large;">
    <a class="nav-link active" aria-current="page" href="" @click="goToAll()" >전체상품</a>
    <a class="nav-link active" aria-current="page" href="" @click="goToPopular()">인기상품</a>
    <a class="nav-link active" aria-current="page" href="" @click="goToNew()">신상품</a>
    <a class="nav-link active" aria-current="page" href="" @click="goToNews()">공지사항</a>

    </nav>

   </div>
   <!-- <div class="d-flex flex-wrap mt-4 pb-3 text-center">

    <ul class="nav col-4 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"> 
      <li><a class="nav-link px-2 text-black" href="" @click="goToAll()">전체상품</a></li>
    </ul>

    <ul class="nav col-4 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a class="nav-link px-2 text-black" href="" @click="goToPopular()">인기상품</a></li>
    </ul>

    <ul class="nav col-4 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a class="nav-link px-2 text-black" href="" @click="goToNew()">신상품</a></li>
    </ul>
  </div> -->

 </header>
</template>

<script>
import axios from 'axios';
export default ({
  data() {
    return {
      admin_check:0,
      keyword : ''
    }
  },
  computed: {
    member() {
      return this.$store.state.member;
    }
  },
  created(){
    this.adminCheck()
  },
  methods: {
    goToSearch(keyword){
              if (keyword ==''){
                alert('검색어를 입력하세요');
                window.location.reload();
              }
              this.$router.push({path : `/goods_search/${keyword}`});
            },
            goToLogin() {
              this.$router.push({path: '/login'});
            },
            goToMain() {
              this.$router.push({path: '/'});
            },
            goToAll() {
              this.$router.push({path: '/goods_all'});
            },
            goToPopular() {
              this.$router.push({path: '/goods_popular'});
            },
            goToNew() {
              this.$router.push({path: '/goods_new'});
            },
            JoinSelect() {
              this.$router.push({path: '/join_select'});
            },
            goToBasket() {
              this.$router.push({path: `/goods_basket/${this.member.member_number}`});
            },
            goToMypage() {
              this.$router.push({path: '/mypage'});
            },
            goToNews() {
              this.$router.push({path: '/news'});

            },

            async logout() {
              this.$store.commit("member", {});
              alert('로그아웃되셨습니다.');

              // 1초 후에 페이지를 리로드
              setTimeout(() => {
                window.location.href = "http://localhost:8080";
              });
            },
            goToAdmin() {
              this.$router.push({ path: '/admin/admin_news' });
              

            },

            adminCheck(){
              if(this.member.member_email == '') {
                console.log('이메일 체크완료');
                console.log(this.member);
              }else {
                axios({
                  url: "http://localhost:3000/auth/admin_check",
                  method: "POST",
                  data: {
                    member_number: this.member.member_number,
                  },
                })
                .then(res => {
                  if (res.data.message == 'admin') {
                    console.log(this.member);
                    console.log(res.data)
                    console.log(this.admin_check);
                      this.admin_check = 1;
                    } else {
                      console.log('일반유저입니다.');
                      this.admin_check = 0;
                    }
                  })
                  .catch(() => {
                    alert("접속 오류");
                  })
              }
            }
          }
  })

 
</script>

<style>
  header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background-color:white ;
  }

  .nav-underline .nav-link.active {
    color: black; /* 활성 상태의 텍스트 색상 */
    background-color:white; /* 활성 상태의 배경 색상 */
    border-bottom-color: gray; /* 활성 상태의 밑줄 색상 */
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);; */
  }

  .nav-underline .nav-link {
    color: gray; /* 텍스트 색상 */
    border-bottom: 2px solid #007bff; /* 밑줄 색상 및 스타일 */
  }

  .nav-underline .nav-link:hover {
    color: #FFC107; /* 호버 시 텍스트 색상 */
    border-bottom-color: #FFC107; /* 호버 시 밑줄 색상 */
  }
  
  .mb-4{
    margin-bottom: 2.5rem;
  }

  .mb-5{
    margin-bottom: 2.9rem;
  }
  .fa-test{
    vertical-align:-1.375em !important;
}
</style>