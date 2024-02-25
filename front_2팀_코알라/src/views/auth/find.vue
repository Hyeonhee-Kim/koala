<template>
    <main class="form">
       <div class="background" @submit.prevent="onSubmitForm">
        <div class="tabListArea">
            <ul class="tabList">
                <li role="tab" id="tab1" @click="handleTabClick('idbtn')" :class="{ active: isTabActive('idbtn') }">
                    <button type="button" class="idbtn">아이디 찾기</button>
                </li>
                <hr>
                <li role="tab" id="tab2" @click="handleTabClick('pwbtn')" :class="{ active: isTabActive('pwbtn') }">
                    <button type="button" class="pwbtn">비밀번호 찾기</button>
                </li>
            </ul>
        </div>

        <div class="formContainer">
            <div class="idform" v-show="isTabActive('idbtn')">
                <div class="one">
                    <input type="phone" class="form-control" placeholder="가입했던 전화번호" v-model="member_phone" />
                    <label for="floatingPassword"></label>
                    <button type="button" class="sendbtn" @click="findID()">아이디 찾기</button>
                </div>

                <div v-if="response_id_check" class="response">
                    <p class="idp">아이디(이메일)은 {{ search_member_email }}입니다. </p>
                </div>

                <div>
                    <button type="button" class="btn" @click="goToLogin">로그인</button>
                </div>
            </div>

            <div class="pwform" v-show="isTabActive('pwbtn')">
                <div class="two">
                    <input type="test" class="form-control" placeholder="아이디 (이메일)" v-model="member_email" />
                    <label for="floatingPassword"></label>
                </div>

                <div class="three">
                    <input type="email" class="form-control" placeholder="가입했던 전화번호 (ex.010-0000-0000)" v-model="member_phone" />
                    <label for="fa floatingPassword"></label>
                    <button type="button" class="sendbtn" @click="findPW()">비밀번호 찾기</button>
                </div>

                <div v-if="response_pw_check" class="response">
                    <p>임시 비밀번호는 {{ member_pw }} 입니다.</p><br>
                        <p>로그인 후 꼭 변경해주세요.</p>
                </div>

                <div>
                    <button type="button" class="btn" @click="goToLogin">로그인</button>
                </div>
            </div>
        </div>
    </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            activeTab: 'idbtn',     // 초기에 보여질 탭 버튼
            member_phone: '',      // password 변경 용 입력한 핸드폰번호
            member_email: '',
            member_pw: '',
            search_member_email: '',     // id 찾기로 받은 아이디
            response_id_check: false,
            response_pw_check: false,
        };
    },
    computed: {
        member() {
            return this.$store.state.member;
        }
    },
    methods: {
        goToLogin() {
            this.$router.push({ path: '/login' });
        },
        handleTabClick(tab) {
            this.activeTab = tab; // 클릭한 탭 버튼으로 activeTab 값을 업데이트
        },
        isTabActive(tab) {
            return this.activeTab === tab; // 현재 활성화된 탭인지 확인하는 메서드
        },
        mounted() {  // 선택된 탭 버튼의 텍스트 색상 변경
            const selectedTab = document.querySelector(`${this.activeTab} button`);
            if (selectedTab) {
                selectedTab.style.color = '#cc8c00';
            }
        },

        findID() {
            if (this.member_phone === '') {
                alert('전화번호를 입력해주세요');
            } else if (!this.isValidPhoneNumber(this.member_phone)) {
                alert('유효한 전화번호를 입력해주세요');
            } else {
                axios ({
                    url:"http://localhost:3000/auth/find",
                    method: "POST",
                    data: {member_phone: this.member_phone }
                })

                .then((res) => {
                    if (res.data.message === 'member_email') {  //
                        this.search_member_email = res.data.member_email;
                        this.response_id_check = true;
                    } else {
                        alert('알 수 없는 오류가 발생했습니다.');
                    }
                })
                    .catch((error) => {
                        console.log(error);
                        alert('해당 이메일이 없습니다.');
                        // 이메일 전송 실패 시 처리할 작업 수행
                    });
            }
        },

        findPW() {
            if (this.member_email === '' || this.member_phone === '') {
                alert('아이디(이메일)와 휴대폰번호를 입력해주세요');
            } else if (!this.isValidPhoneNumber(this.member_phone)) {
                alert('유효한 휴대폰번호를 입력해주세요');
            } else {
                
                axios ({
                    url:"http://localhost:3000/auth/find_pass",
                    method: "POST",
                    data: {
                            member_email: this.member_email,
                            member_phone: this.member_phone 
                          }
                      })
                    .then((res) => {
                        this.member_pw = res.data.message;
                        this.response_pw_check = true;
                      })
                    .catch((error) => {
                        console.log(error);
                        alert('정보 확인에 실패했습니다.');
                    });
            }
        }, //이메일 형식 유효성 검사
        isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        },
           //핸드폰 번호 유효성 검사
        isValidPhoneNumber(phone) {
            const phonePattern = /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/;
            return phonePattern.test(phone);
        }
    }
}
</script>

<style scoped="scoped">
* {
    margin: 0;
    padding: 0;
}


.background {
   /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
   height: 680px;
    width: 500px;
    max-width: 450px;
    padding: 0px;
    margin: 0 auto;
    border-style: solid;
    border-radius: 30px;
    box-shadow: 0px 1px 30px 2px rgb(138, 139, 136);
    text-align: center;
    position: relative;
    top: -40px;

  

}




li,
ul {
    list-style: none;
}

a {
    text-decoration: none;
}



.form [type="button"],
.form input {
    font-family: GmarketSansMedium;
}

.form {
    /* 전체 폼 스타일 */
    display: grid;
    width: 400px;
    height: 400px;
    margin: 6% auto;
    border-radius: 30px;
    top: 40px;
}

.tabListArea {
    height: 70px;
}

.form .tabListArea .tabList {
    /* 탭 리스트 스타일 */
    display: flex;
    width: 455px;
    position: absolute;
    left: -8px;
    top: -4px;
}

.form .tabListArea .tabList li {
    width: 270px;
    height: 80px;
    margin: 5px;
    margin-left: 10px;
    display: block;
    top: 40px;
}

.form .tabListArea .tabList .idbtn,
.form .tabListArea .tabList .pwbtn {
    padding: 18px 0;
    width: 100%;
    font-size:20px;
    color: #f69104;
    margin: 0 auto;
    border: none;
    background: none;
}

.form .tabListArea .tabList .idbtn:hover,
.form .tabListArea .tabList .pwbtn:hover {
    color: #cc8c00;
}

.form .tabListArea #tab1 {
    border-radius: 30px 0 0 0;
}

.form .tabListArea #tab2 {
    border-radius: 0 30px 0 0;
}

hr {
    height: 60px;
    border: 1px solid rgb(239, 219, 170);
}

.tabList li.active {
    /* 활성화된 탭 아이템 스타일 */
    color: #cc8c00;
    background-color: #fdefce;
}

.formContainer {
    /* 폼 컨테이너 스타일 */
    position: relative;
    display: grid;
    height: 360px;
    top: 45px;
    margin: auto;
    display: block;

}

.idform {
    /* 아이디 찾기 폼 스타일 */
    width: 400px;
    height: 440px;
    margin: 0;
    padding: 0;
    border-radius: 0 0 30px 30px;
    margin: auto;
    display: block;
}

.pwform {
    /* 비밀번호 찾기 폼 스타일 */
    width: 400px;
    height: 440px;
    margin: 0;
    padding: 40px 0 0 0;
    border-radius: 0 0 30px 30px;
    position: absolute;
    left: 30px;
}

.pwform .form-control {
    width: 340px;
    margin: 0 30px 0 30px;
}
.pwform .sendbtn {
    width: 340px;
    margin-top: 30px;
}

.formContainer input {
    height: 48px;
    width: 220px;
    font-size: 16px;
    border: solid 2px rgb(237, 237, 237);
    border-radius: 8px;
    /* margin: 0px 10px 10px 0px; */
    padding-left: 18px;
    margin: 60px 10px 0 30px;
}

.three input {
    margin-top: 10px;
}

.formContainer input::placeholder {
    color: #aaa;
}
.one {    
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.sendbtn {
    padding: 0 8px;
    height: 48px;
    line-height: 48px;
    border-radius: 8px;
    color: #888;
    background-color: #f2f2f2;
    border: 2px solid rgb(221, 221, 221);
}

.sendbtn:hover {
    cursor: pointer;
    background-color: #e6e6e6;
}

p{
    font: bold;
    font-size: 1.2rem;
    font-family: GmarketSansMedium;
    text-align: center;
    padding-top: 30px;
    color: #cc8c00;
}

.formContainer .idform .response .idp{
    font: bold;
    font-size: 1.2rem;
    font-family: GmarketSansMedium;
    text-align: center;
    padding-top: 30px;
    color: #cc8c00;
}

p:nth-last-child(1){
    font: bold;
    font-size: 1.4rem;
    font-family: GmarketSansMedium;
    text-align: center;
    padding-top: 0px;
    margin: 0;
    color: #cc3d00;
    /* border: 1px solid red; */
}
.btn {
    height: 50px;
    width: 260px;
    position: absolute;
    top: 300px;
    display: inline;
    bottom: 0;
    left: 19%;
    font-size: 16px;
    border-radius: 8px;
    border: solid 2px rgb(2, 2, 2);
    background-color: rgb(2, 2, 2);
    color: white;
}

.btn:hover {
    cursor: pointer;
}

input:focus {
    outline: 2px solid #ffc905;
}</style>