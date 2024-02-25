<template>
  <div>
      <div class="form-control" id="background">
      <form id="userForm" @submit.prevent="onSubmitForm" >
      <!-- 닉네임 / 이메일 / 전화번호 / 비밀번호 / 주소  -->
          <div class="user-details-header"> 
              <div>회원정보</div>
              <div class="style__UserEditLink-sc-1vzgze2-1 dfnyEj" @click="update2">수정</div>
          </div>
          <hr style="margin: 40px">
         <div class="myinfo">

            <div class="username mb-3 d-flex justify-content-between">
                <label for="username" class="col-sm-2 col-form-label">회원명</label>
                <div class="col-sm-5 username">
                        <h4>{{ loginUser.MEMBER_NICKNAME }}</h4>
                </div>
            </div>
      
          <div class="username mb-3 d-flex justify-content-between">
              <label for="username" class="col-sm-2 col-form-label">이메일</label>
              <div class="col-sm-5 username">
                <h4>{{ loginUser.MEMBER_EMAIL }}</h4>
              </div>
          </div>

          <div class="username mb-3 d-flex justify-content-between">
              <label for="username" class="col-sm-2 col-form-label">전화번호</label>
              <div class="col-sm-5 username" >
                <h4>{{ loginUser.MEMBER_PHONE }}</h4>
              </div>
          </div>

          <div class="username mb-3 d-flex justify-content-between">
              <label for="username" class="col-sm-2 col-form-label">비밀번호</label>
              <div class="col-sm-5 username " style="text-align:left;">
                <h4>{{ loginUser.MEMBER_PW }}</h4>
                </div>
          </div>

          <div class="username mb-3 d-flex justify-content-between">
              <label for="username" class="col-sm-2 col-form-label">주소</label>
              <div class="col-sm-5 username " style="text-align:left;">
                <h4>{{ loginUser.MEMBER_ADDRESS1 }}</h4>
                <h4>{{ loginUser.MEMBER_ADDRESS2 }}</h4> 
                </div><!--DATA 속성이여야함-->
              </div>
         </div>

      </form> 
      </div>
  
 
  </div>
  </template>

<script>
import axios from 'axios';


export default {
        data() {
            return {
                loginUser: {}
                };
        },
       created() {
                this.getloginUser();
            },
        computed: {
                member() {
                    return this.$store.state.member;
                }
            }, 
        methods: {
                update2() {
                this.$router.push({ path: '/mypage/mypage_update_2' });
                },

                async getloginUser() {
                    try {
                        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.member.member_number}`);
                        this.loginUser = response.data[0];
                        
                    } catch (error) {
                        console.error(error);
                    }
                    },
            },
}

 </script> 
      <style scoped>
  
      * {
          font-family: Spoqa Han Sans Neo,"sans-serif";
          color: inherit;
  
      }
  
  
      #background {
      /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
      height:700px;
      width: 100%;
      max-width: 900px;
      padding: 30px;
      margin: 10px auto;
      margin-bottom: 50px;
      border-style: solid ;
      border-width: 3px;
      /* border-color: gray; */
      /* border-radius: 30px; */
      /* box-shadow: 0px 1px 30px 2px rgb(138, 139, 136); */
      text-align: left;
      position: relative;
      box-shadow: 5px 5px 5px 5px gray;
      top: 30px;
      background-color: #ffffff;
      
      
      }
      
      
      form {
      
      /* align-items: center; */
      display: flex;
      padding: 20px;
      flex-direction: column;
      
      }

      .myinfo {
        margin-top: 30px;
        margin-bottom: 10px;
      
        }

      span{
          color: red;
      }
    .user-details-header {
        margin-bottom: 30px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        color: black;
        font-weight: 700;
        font-size: 35px;
        line-height: 100%;
    }
    
    .username{
        font-size: 20px;
    }
    .dfnyEj{
        color: rgb(19, 19, 21);
            }

    .dfnyEj:hover {
        color: blue;
        border-radius: 50%;  
        text-decoration: underline;
       
    }


</style>