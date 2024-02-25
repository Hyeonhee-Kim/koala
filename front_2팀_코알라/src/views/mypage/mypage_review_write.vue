<template>
    <!-- 글쓰기 부분 -->
    <div class="form-control" id="background">
    <form id="sendForm" @submit.prevent="onSubmitForm" >
    
        <div class="mb-5">
            <label for="writer" class="col-sm-2 col-form-label" style="font-size: large; font-weight: 500;">상품명</label>
        </div>
    
        <div class="mb-5">
            <label for="writer" class="col-sm-2 col-form-label" style="font-size: large; font-weight: 500;">작성자</label>
            <div class="col-sm-3" style="font-size: large; font-weight: 500; color: rgb(88, 87, 87); margin-left: 60px;">
              <p class="nickname">{{ loginUser.MEMBER_NICKNAME }}</p>
            </div>
        </div>
        <div class="mb-5"> <!--별점-->
          <label for="title" class="form-label">별점을 매겨주세요</label> 
            <div class="star-rating">
                
                <span style="padding-left: 5px;"></span>
              </div>
            </div>
        
        
        <div class="mb-3">
            <label for="title" class="form-label" >제목<span>*</span></label>
            <input type="text" class="form-control" id="title" v-model="notice_title" placeholder="제목을 작성하세요.">
        </div>
        <div class="mb-3">
        <label for="content" class="form-label" >내용<span>*</span></label>
        <textarea class="form-control" id="content" v-model="notice_content" rows="6" placeholder="내용을 작성하세요."></textarea>
      </div>
    
      <div class="mb-3">
        <label for="formFile" class="form-label">사진 첨부</label>
        <input class="form-control" type="file" id="formFile">
      </div>
    
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button class="btn btn-warning" type="submit">등록</button>
        <button class="btn btn-secondary" type="button">취소</button>
      </div>        
    </form> 
  
    </div>
    
    
    </template>
    
    <script>
    import axios from 'axios';

    
    export default {
    data() {
        return {
            loginUser: {},
        }
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
     

        async getloginUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.member.member_number}`);
                    this.loginUser = response.data[0];
                    
                } catch (error) {
                    console.error(error);
                }
            }
          }
    }
    </script>
    
    <style scoped>
    #background {
    /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
    height: auto;
    width: 100%;
    max-width: 1000px;
    padding: 30px;
    margin: 10px auto;
    border-style: solid ;
    border-width: 3px;
    /* border-color: gray; */
    /* border-radius: 30px; */
    /* box-shadow: 0px 1px 30px 2px rgb(138, 139, 136); */
    text-align: left;
    position: relative;
    top: 30px;
    
    }
    
    form {
    
    /* align-items: center; */
    display: flex;
    padding: 20px;
    flex-direction: column;
    
    }

    body {
        font-family: 'Raleway', sans-serif;
      }

      .custom-text {
        font-weight: bold;
        font-size: 1.9em;
        border: 1px solid #cfcfcf;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 5px;
        color: #999;
        background: #fff;
      }

    </style>