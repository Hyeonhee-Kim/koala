<template>
    <div>
            <div class="container mt-3 p-5" style="border: solid black; border-radius: 20px; font-size: 30px; 
                font-weight: bolder;">
                {{ loginUser.MEMBER_NICKNAME }}님
                <div style="margin-bottom: -20px; margin-top: -30px;">
                    <div class="button-container">

                        <div class="button-wrapper">
                            <i class="fa-regular fa-circle-question fa-xl"></i>                            
                            <router-link to="/mypage/mypage_qna" class="btn btn-warning" 
                        @click="setPageTitle('문의하기')">문의하기</router-link>
                        </div>
                    
                        <div class="button-wrapper">
                            <i class="fa-solid fa-heart fa-xl"></i>
                            <router-link to="/mypage/mypage_like" class="btn btn-warning " 
                        @click="setPageTitle('찜리스트')">찜리스트</router-link>
                        </div>
                    
                        <div class="button-wrapper">
                            <i class="fa-solid fa-pen-to-square fa-xl"></i>                            
                            <router-link to="/mypage/mypage_review" class="btn btn-warning " 
                        @click="setPageTitle('리뷰')">리뷰</router-link>
                        </div>

                        <div class="button-wrapper">
                            <i class="fa-solid fa-rotate-left fa-xl"></i>                            
                            <router-link to="/mypage/mypage_refund" class="btn btn-warning " 
                        @click="setPageTitle('취소/환불')">취소/환불</router-link>
                        </div>
                    
                        <div class="button-wrapper">
                            <i class="fa-solid fa-circle-user fa-xl"></i>
                            <router-link to="/mypage/mypage_update" class="btn btn-warning" 
                        @click="setPageTitle('회원정보')">회원정보</router-link>
                        </div>

                        <div class="button-wrapper">
                            <i class="fa-solid fa-credit-card fa-xl"></i>                            
                            <router-link to="/mypage/" class="btn btn-warning " 
                        @click="setPageTitle('주문내역')">주문내역</router-link>
                        </div>
                    </div>
                </div>
                </div>
           
       



        <div class="container-lg p-3" style="font-size: 25px;  font-weight: bolder; text-align: left;">{{pageTitle}}

        </div>
        <hr class="one" style="border:solid 1px black">

    </div>

  </template>

  
<script>
import axios from 'axios';

    export default {
        data () {
            return {
                loginUser: {},
                pageTitle: '주문내역', //초기 페이지명 설정
            };
        },
        created() {
            this.getMember();
            window.addEventListener('popstate', this.onBackButtonEvent);

            },
        beforeUnmount() {
            window.removeEventListener('popstate', this.onBackButtonEvent);
        },

        computed: {
                member() {
                    return this.$store.state.member;
                }
            },
        methods: {
            async getMember() {
                    try {
                        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.member.member_number}`);
                        this.loginUser = response.data[0];
                        
                    } catch (error) {
                        console.error(error);
                    }
                },
                onBackButtonEvent() {
                    // 뒤로가기 버튼을 눌렀을 때의 동작
                    this.setPageTitleBasedOnRoute();
                    },

                setPageTitle(newTitle) {
                    this.pageTitle = newTitle; //페이지명을 변경하는 메소드
                    },       
                setPageTitleBasedOnRoute() {
                    const path = this.$route.path;
                    switch(path) {
                    case '/mypage':
                        this.setPageTitle('주문내역');
                        break;
                    case '/mypage/mypage_wish':
                        this.setPageTitle('찜리스트');
                        break;
                    case '/mypage/mypage_qna':
                        this.setPageTitle('문의하기');
                        break;
                    case '/mypage/mypage_review':
                        this.setPageTitle('리뷰');
                        break;
                    case '/mypage/mypage_review_write':
                        this.setPageTitle('리뷰 작성');
                        break;
                    case '/mypage/mypage_update':
                        this.setPageTitle('회원정보');
                        break;
                    case '/mypage/mypage_update_2':
                        this.setPageTitle('회원정보 수정');
                        break;
                    default:
                        this.setPageTitle('');
                        break;

                }
            }

        
      },
    }

</script>

  
<style>
 
 /* .loginnick {
    white-space: nowrap;
    font-size: 30px;
 } */

 .button-container {
      display: flex;
      flex-direction:row;
      justify-content: flex-end;
      
    }
  
    .button-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 30px;
      
    }
  
    i {
      
      margin-bottom: 50px;
    }

    .btn-warning {
        --bs-btn-color: #fff;
    }


</style>