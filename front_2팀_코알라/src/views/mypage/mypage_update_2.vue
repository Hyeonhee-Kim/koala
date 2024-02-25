<template>

    <div class="form-control" id="background">
    <form id="infoForm" @submit.prevent="onSubmitForm" >
    
        <div class="form" > <!--닉네임과 이메일은 변경불가 (기존 정보 보여주기)-->
            <label for="name" class="form-label">닉네임</label>
             <div class="col-sm-2">
                <h4 class="userinfo">{{ loginUser.MEMBER_NICKNAME }}</h4>
            </div>
                <label for="email" class="form-label">이메일</label>
                <div class="col-sm-2" >
                <h4 class="userinfo">{{ loginUser.MEMBER_EMAIL }}</h4>
                </div>
        </div>
        <div class="form" >   <!--v-model=new를 이용-->
            <div class="form1">
                <label for="writer" class="form-label">전화번호</label>
                <div class="col-sm-3">
                <input type="text" class="form-control in" v-model="newPhone" placeholder="'-'자리 없이 숫자로만 입력해주세요 01012345678."/>
                </div>
            </div>
        
        <div class="form2">
            <label for="title" class="form-label">비밀번호</label>
            <input type="password" class="form-control in" id="pw1" v-model="newPw" placeholder="숫자 8자리 이상.">
        </div>

        <div class="form2">
            <label for="title" class="form-label">비밀번호 확인</label>
            <input type="password" class="form-control in" id="pw2" placeholder="비밀번호를 한 번 더 입력해주세요.">
        </div>

        <div class="form3">
            <label for="title" class="form-label">주소</label>
            
            <div class="row">

                <div class="col mb-1"  >
                    <input type="text" placeholder="우편번호" v-model="new_zipcode" class="form-control col-1 mt-3" readonly />
                </div>
                <div class="col mb-1">
                    <button id="postcode" class="btn btn-warning btn-sm" @click="openPostcode">검색</button>
                </div>
            </div>
        </div>
                <div class="col-auto mb-1">
                     <input type="text" v-model="new_address1" class="form-control" placeholder="주소" readonly />
                </div>
                <div class="col-auto mb-1">
                    <input type="text" v-model="new_address2" class="form-control" placeholder="상세주소" />
               </div>

               <!--회원탈퇴 : 탈퇴는 안되고 로그아웃만 실현 후 메인페이지 이동-->
        <div class="withdraw">
            <span class="withdraw-link" @click="confirmWithdrawal">회원탈퇴</span>
        </div>


        
        </div>
        <div class="d-grid d-md-flex justify-content-center">
            <button class="btn btn-warning btn-lg" type="submit" style="width: 150px; margin-right: 20px;" @click="updateForm">수정하기</button>
            <button class="btn btn-secondary btn-lg" type="button" style="width: 150px;" @click="returnUpdate" >취소</button>
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
      inquiry_type: 0,
      newPhone: '',
      newPw: '',
      new_zipcode: '',
      new_address1: '',
      new_address2: '',
      member_zipcode: '',
      member_address1: '',
      member_address2: '',
    };
  },
  created() {
    this.getloginUser();
  },
 
computed: {
    member() {
      return this.$store.state.member;
    },
  },
 methods: {

     getloginUser() {
         try {
             axios
             .get(`http://localhost:3000/mypage/mypage/${this.member.member_number}`)
             .then((response) => {
                 this.loginUser = response.data[0];
                })
                .catch((error) => {
                    console.error(error);
                });
            } catch (error) {
                console.error(error);
            }
        },
        
        
        /*주소찾기*/
        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    console.log(data);
                    this.new_zipcode = data.zonecode;
                    this.new_address1 = data.roadAddress;
                },
            }).open();
        },
      
        async confirmWithdrawal() {
                try {
                    const userConfirmed = window.confirm('정말로 탈퇴하시겠습니까?');

                    if (userConfirmed) {
                    const response = await axios.post(`http://localhost:3000/mypage/mypage_withdrawal/${this.member.member_number}`);
                    console.log(response.data);

                        if (response.data) {
                            alert('회원탈퇴에 성공하였습니다.');
                            this.$store.commit("member", {});
                            this.$router.push('/');
                            window.location.reload();
                            } else {
                                // 실패한 경우에 대한 처리
                                alert('회원탈퇴에 실패하였습니다.');
                            }
                            } else {
                            // 사용자가 취소한 경우의 처리
                            alert('회원탈퇴를 취소하셨습니다.');
                        }
                } catch (error) {
                    console.error(error);
                    alert('오류발생');
                }
                },



        updateForm(){
            if (this.newPhone === "" || this.newPw === "" || this.new_zipcode === "" || this.new_address1 === "" || this.new_address2 === "" ) {
               alert("모든 항목을 입력해주세요");
            } else {
                axios
                .post('http://localhost:3000/mypage/mypage_update', {
                    member_number: this.member_number,

                    member_phone: this.newPhone,
                    member_pw: this.newPw,
                    member_zipcode: this.new_zipcode,
                    member_address1: this.new_address1,
                    member_address2: this.new_address2,
                })
                .then((res) => {
                    if (res.data.message === 'mypage_update') {
                        alert("수정이 완료되었습니다");
                        this.$router.push({ path: '/mypage/mypage_update'});
                    } else {
                        
                        alert("수정1.");
                    }

                    })
                    .catch((err) => {
                        console.log(this.newPhone);
                        console.log(this.newPw);
                        console.log(this.new_zipcode);
                        console.log(this.new_address1);
                        console.log(this.new_address2);
                        console.log(err);
                        alert("수정2");
                    });
                    }
            },

            returnUpdate() {
                alert("최소되었습니다.")
                this.$router.push({ path: '/mypage/mypage_update'});
            }
        }
// def 괄호
}
    
    
</script>


<style scoped>
    #background {
    /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
    height: 100%;
    width: 100%;
    max-width: 900px;
    padding: 25px;
    margin: 10px auto;
    border-style: solid ;
    border-width: 5px;
    /* border-color: gray; */
    /* border-radius: 30px; */
    box-shadow: 0px 1px 10px 2px rgb(138, 139, 136);
    text-align: left;
    position: relative;
    top: 30px;
    
    }
    
    form {
    /* align-items: center; */
    display: flex;
    padding: 5px;
    flex-direction: column;
    
    }

    .form-label {
        font-size: 20px;
        font-weight: bold;
        margin-top: 20px;
    }

    .form input {
    display: flex;
    align-items: center;
    width: 90%;
    height: 40px;
    font-size: 1rem;
    font-family: GmarketSansMedium;
    padding-left: 20px;
    color: rgb(114, 114, 114);
    border: 3px solid rgb(221, 221, 221);
    border-radius: 10px;
    
}

    .form3 .btn {
    height: 40px;
    width: 10rem;
    position: relative;
    padding: 8px 10px;
    margin: 20px 0px 20px 0px;
    font-size: 15px;
    font-family: GmarketSansMedium;
    color: rgb(90, 87, 87);
    border: 2px solid rgb(182, 179, 179);
    border-radius: 10px;
    cursor: pointer;
}

    .withdraw {
        display: flex;
         justify-content: flex-end;
         
    }
    .withdraw-link{
        color: black;  /* 초기 글자색 */
        font-size: 25px;
        cursor: pointer;
        transition: color 0.3s, text-decoration 0.3s;
        margin-top: 20px;
    }
    .withdraw-link:hover {
        color: red;  /* 마우스 호버 시 글자색 변경 */
        text-decoration: underline;  /* 마우스 호버 시 밑줄 추가 */
        font-weight: 5px;
        }

    .userinfo{
        margin-inline: 30px;
        margin-right: auto;
        width: 100%;
    }
    .control-1{
        width: 500px;
    }
    .form3 .btn[data-v-6d9686f4] {
        margin: 13px 0px 20px 0px;
    }
    </style>