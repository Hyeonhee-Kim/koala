<template>
    <main class="login_box">
       <div class="background" @submit.prevent="onSubmitForm">
        <div class="logo">
             <img src="../../assets/koala_logo.jpg" alt="로그인페이지 로고" id="toplogo">
         </div>
           <form id="login-form">
               
               <div class="form-floating mb-2">
                   <input type="id" @keyup.enter="login()" class="form-control"  id="floatingInput" 
                   v-model="member_email" placeholder="아이디 (이메일)">
                <label for="floatingInput">아이디 (이메일)</label>
               </div>

               <div class="form-floating mb-2">
                   <input type="password" @keyup.enter="login()" class="form-control" id="floatingPassword" 
                   v-model="member_pw" placeholder="비밀번호">
                   <label for="floatingPassword" class="form-label">비밀번호</label>
               </div>

               <div class="checkbox_wrap">
                <input type="checkbox" id="checkid">
                <label for="checkid" class="checkbox_label">아이디 저장</label>
               </div>
   
               <div class="find" @click="goToFind()">아이디  /  비밀번호 찾기</div>
               
               <div class="join" @click="join()">회원가입</div>
               
                    <div>
                     <div class="btn">
                        <button type="button" @click="login()">로그인</button>
                     </div>

                    <div class="btn_kakao">
                         <button type="button" @click="kakaoLogin()">
                           <img src="../../assets/kakao_login.png">
                        </button>
                    </div>
                      <!-- <div id="naverIdLogin">
                        <button type="button" @click="naverlogin">
                          <img src="../assets/naver_login.png">
                        </button>
                    </div>  -->
                </div>
           </form>
    </div>
</main>
</template>

<script>
import axios from 'axios';

export default {

    data() {

        return {
            member_name: '',
            member_email: '',
            member_pw: '',
            member_number: '',
        };
    },
    computed: {  // user 정보가 바뀔 때마다 자동으로 user() 갱신
        member() { 
            return this.$store.state.member;
        },
    },
    // ======네이버
    // mounted() {
    //     console.log(this.naverLogin.member);
    //     this.naverLogin = new window.naver.LoginWithNaverId({
    //         clientId: "kSMlvo4wrd1SZTXO5JjU",   
    //         callbackUrl: "http://localhost:8080/",
    //         isPopup: false,
    //         loginButton: {
    //             color: "green", type: 3, height: 60,
    //         },
    //     });
    //     this.$store.commit("naverLogin", this.naverLogin);

    //     this.naverLogin.init();

    //     this.naverLogin.getLoginStatus((status) => {
    //         if (status) {
    //             console.log(status);
    //             console.log(this.naverLogin.member.nickname);

    //             const email = this.naverLogin.member.email;
    //             const nickname = this.naverLogin.member.nickname;

    //             this.naver_email = email;
    //             console.log(email)
    //             console.log(nickname)

    //         } else {
    //             console.log("callback처리 실패");
    //         }
    //     });

    // },

//============================로컬 로그인
    methods: {
        login() {
            if (!this.validationCheck()) {
                return;
            }
            axios({
                url: "http://localhost:3000/auth/login_process",
                method: "POST",
                data: {
                    member_email: this.member_email,
                    member_pw: this.member_pw
                },
            })
                   .then(res => {
                    if (res.data.message == 'undefined_email') {
                        alert("존재하지 않는 아이디(이메일)입니다.")
                    }
                   else if (res.data.message == 'incorrect_pw') { // 
                        alert("비밀번호가 틀렸습니다.")
                    }
                    else {
                        this.$store.commit("member", { member_email: this.member_email, member_number: res.data.message })
                        alert('로그인 성공!')
                     setTimeout(() => {
                        window.location.href = "http://localhost:8080";
                    });
                        this.$router.push({ path: '/' });  // 메인 화면으로 이동
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        validationCheck() {
            if (this.member_email == "") {
                alert("아이디를 입력하세요.");
                return false;
            }
            if (this.member_pw == "") {
                alert("비밀번호를 입력하세요.");
                return false;
            }
            return true;

        },

        // 아이디,비밀번호 찾기로 이동
        goToFind() {
            this.$router.push({ path: '/find' }); 
        },

        join() {
            this.$router.push({ path: '/join' }); 
        },


//==================카카오===========================
        kakaoLogin() {

        window.Kakao.Auth.login({
            scope: "profile_nickname, account_email",
            success: this.getKakaoAccount,
        });
        },
        getKakaoAccount() {
        window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
                const kakao_account = res.kakao_account;
                const email = kakao_account.email; //카카오 이메일
                const nickname = kakao_account.profile.nickname;
               
                console.log('nickname', nickname);
                console.log('email', email);


                axios({
                    url: "http://localhost:3000/auth/kakaoLoginProcess",  //리다이렉트 주소 설정
                    method: "POST",
                    data: {
                        member_email: email,
                        member_nickname: nickname
                    },
                }).then(res => {
                    if (res.data.message == '저장완료') {

                        alert('회원가입 성공!')

                    }
                    else {
                        this.$store.commit("member", { member_email: email, member_number: res.data.message })
                        alert('로그인 성공!')
                    
                  
                        setTimeout(() => {
                            window.location.href = "http://localhost:8080";
                        }, 1000);


                    }
                })
                    .catch(err => {
                        console.log(err);
                    })


            },
            fail: (error) => {
                // this.$router.push("/errorPage");
                console.log(error);
            },
        });

        },

//=========================================네이버===========================

},
};
</script>



<style scoped>

* {
    padding: 0;
    margin: 0;

}

.logo img {
    width: 400px;
    height: 100px;
    max-width: 400px;
    display: block;
    margin-top: 0;
    position: relative;
    margin: auto;

}
.background {
   /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
   height: 680px;
   width: 500%;
   max-width: 450px;
   padding: 5px;
   margin: 0 auto;
   border-style: solid;
   border-radius: 30px;
   box-shadow: 0px 1px 30px 2px rgb(138, 139, 136);
   text-align: center;
   position: relative;
   top: 50px;

}

form {
   
   align-items: center;
   display: flex;
   padding: 20px;
   flex-direction: column;
  
}


/* 아이디 비번 작성칸*/
.login-form {

    display: block;
    width: 200%;
    height: 60px;
    padding: 4px 8px;
    color: #333;
    border: 2px solid #bbb;
    outline: none;
    background:none;
    box-sizing: border-box; 
    font-weight: bold;

}

.form-control {
    width:300px;
}

input::placeholder {
color: #aaa;
}

input:focus {
outline: 2px solid #ffc905;
}

/* 아이디 저장 */
.checkbox_wrap {
    display: inline-block;
    position: relative;
    bottom: 20px;
    width: 212px;
    height: 30px;
    line-height: 75px;
    text-align: left;
    font-weight: bold;
    padding-top: 10px;
    margin: 0px;
    font-size: 15px;
    color: #989595;
    cursor: pointer;
    border:  #e1e1e1;
    border-radius: 4px;
    cursor: pointer;
}


/* 아이디 비밀번호 찾기 */
.find {
display: inline-block;
position: relative;
bottom: 20px;
width: 212px;
height: 30px;
line-height: 40px;
text-align: left;
font-weight: bold;
padding-top: 15px;
margin: 0px;
font-size: 15px;
color: #989595;
cursor: pointer;
border:  #e1e1e1;
border-radius: 4px;
}

/* 회원가입 */
.join {
display: inline-block;
position: relative;
bottom: 20px;
width: 212px;
height: 30px;
line-height: 40px;
text-align: left;
font-weight: bold;
padding-top: 30px;
margin: 0px;
font-size: 15px;
color: #989595;
cursor: pointer;
border:  #e1e1e1;
border-radius: 4px;
}


/*로그인 버튼 */
.btn {margin-bottom: 5px;}
.btn_login:last-child {margin-bottom: 0;}

.btn {
background-color:#000;
font-size: 18px;
line-height: 60px;
width: 438px;
border-radius: 3px;
border: none;
display: flex; 
flex-direction: column;
margin-top: 80px;
color: white;
}



.button {
    text-transform: none;
    background-color: black;
    color: white;
    font-size: 17px;
}

.login-form .btn:hover {
cursor: pointer;
}

/* sns btn */


.login-form .btn_kakao {
scale: 50%;
position: relative;
left: 115px;
top: 50px;
margin-bottom: 5px;

}
.login-form .btn_naver {
scale: 10%;
position: relative;
left: 13px;
top: 50px;
padding: 40px;
margin-bottom: 5px;
line-height: 60px;
width: 440px;
}

.login-form .btn_kakao:hover {
cursor: pointer;
}

.login-form .btn_naver:hover {
cursor: pointer;
}

.find {
    position: relative;
    bottom: -1px;
    height: 47px;
    text-align: left;
    padding-top: 12px;
    font-size: 0.9rem;
    color: #aaa;
    cursor: pointer;
    /* border: 1px solid red; */
}

#naverIdLogin {
    top: 5px;
    position: relative;
}
#naverIdLogin a {
    width: 437px;
    height: 53.2px;
    display: block;
}
#naverIdLogin_loginButton img {
    width: 100%;
    height: 53.2px;
    object-fit: cover;
    border-radius: 2PX;
}

#toplogo {
    width: 200px;
    height: 100px;
    max-width: 400px;
    display: block;
    position: relative;
    margin: auto;
    margin-top: 30px;
    margin-bottom: 20px;
}

</style>