<template>
        <div class="background" >

            <form id="sendForm" @submit.prevent="onSubmitForm" >
                
                <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="member_nickname" placeholder="이름">
                     <label for="floatingName">이름</label>
                </div>
<!-- 인풋메소드가 안먹음,,!! -->
                 <div class="form-floating mb-2">
                    <input type="text" class="form-control" v-model="member_jumin" placeholder="주민번호">
                     <label for="floatingJumin">주민번호(ex 8801011)</label>
                </div>

                <div class="form-floating mb-2">
                    <input type="email" class="form-control"  v-model="member_email"  placeholder="example@gmail.com">
                     <label for="floatingEmail" class="form-label">이메일</label>
                </div>

                <div class="form-floating mb-2">
                    <input type="password" class="form-control" v-model="member_pw" placeholder="비밀번호">
                    <label for="floatingPassword" class="form-label">비밀번호</label>
                </div>

                <div class="form-floating mb-2">
                    <input type="password" class="form-control" v-model="member_pw2" placeholder="비밀번호 확인">
                    <label for="floatingPassword2" class="form-label">비밀번호 확인</label>
                </div>

                <div class="form-floating mb-2">
                    <input type="tel" @input="validatePhoneNumber" class="form-control" v-model="member_phone" placeholder="전화번호">
                    <label for="floatingPhone" class="form-label">전화번호(-없이)</label>
                </div>

             
                <!-- 우편번호 불러오면 입력된 게 들어감 -->
               <div class="row g-3">
                    <div class="col-auto mb-2">
                    <input type="text" placeholder="우편번호" v-model="member_zipcode" class="form-control" readonly />
                    </div>
                    <div class="col-auto">
                    <button id="postcode" class="btn btn-primary " @click="openPostcode">검색</button><br />
                </div>
               </div>
                <div class="col-auto mb-2">
                <input type="text" v-model="member_address1" class="form-control" placeholder="주소" readonly />
                </div>
                <div class="col-auto mb-2">
                <input type="text" v-model="member_address2" class="form-control" placeholder="상세주소" />
               </div>
                <br/>
                 <div class="d-grid gap-2 col-6 mx-auto">
                 <button type="submit" class="btn btn-warning">회원가입 완료</button>
                 </div> <br/>                    
            
                
            </form>
        </div>


   
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            member_nickname: '',
            member_jumin: '',
            member_email: '',
            member_pw: '',
            member_pw2: '',
            member_phone: '',   
            member_zipcode: '',
            member_address1: '',
            member_address2: '',
            
        };
    },
    methods: {
        onSubmitForm() {
            if(!this.validationCheck()) {
                return;
            }
            axios({
                url: "http://localhost:3000/auth/join_process",
                method: "POST",
                data: {
                    member_nickname: this.member_nickname,
                    member_jumin: this.member_jumin,
                    member_email: this.member_email,
                    member_pw: this.member_pw,
                    member_phone: this.member_phone,
                    member_zipcode: this.member_zipcode,
                    member_address1: this.member_address1,
                    member_address2: this.member_address2
                },
            })
                .then(res => {
                    alert(res.data.message);
                    if(res.data.message == 'already_exist_id') {
                        alert("이미 존재하는 이메일입니다.")
                    }else if(res.data.message == 'DB_error') {
                        alert("DB 에러 발생")
                    }else {
                        
                        this.$router.push({path: '/'}); //로그인 화면으로 이동
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },

        openPostcode() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    console.log(data);
                    this.member_zipcode = data.zonecode; //주소api에서 넘어오는 명칭이랑 내가 준 변수랑 매칭해야함.
                    this.member_address1 = data.roadAddress;
                },
            }).open();
        },
        validationCheck() {
            if(this.member_nickname == "") {
                alert("이름을 입력하세요.");
                return false;
            }
            if(this.member_jumin == "") {
                alert("주민번호를 입력하세요.");
                return false;
            }
            if(this.member_email == "") {
                alert("이메일을 입력하세요.");
                return false;
            }
            if(this.user_pw == "") {
                alert("비밀번호를 입력하세요.");
                return false;
            }
            if(this.member_pw2 !== this.member_pw) {
                alert("비밀번호가 일치하지 않습니다.");
                return false;
            }
            if(this.member_phone == "") {
                alert("전화번호를 입력해주세요.");
                return false;
            }
            if(this.member_address1 == "") {
                alert("우편번호를 입력하세요.");
                return false;
            }
            return true;
        },
        // validatePhoneNumber() {
        //     this.member_phone = this.member_phone.replace(/\D/g, '');// 숫자 이외의 문자제거
        // },
        // // validateJumin() {
        // //     this.member_jumin = this.member_jumin.replace(/\D/g, '');// 숫자 이외의 문자제거
        // // }
        // join2 () {
        //     this.$router.push({path: '/join2'})
        // }
    },
}
</script>

<style scoped>
.background {
    /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
    height: auto;
    width: 100%;
    max-width: 450px;
    padding: 30px;
    margin: 0 auto;
    border-style: solid;
    border-radius: 30px;
    box-shadow: 0px 1px 30px 2px rgb(138, 139, 136);
    text-align: center;
    position: relative;
    top: 50px;

}

form {
    
    /* align-items: center; */
    display: flex;
    padding: 30px;
    flex-direction: column;
   
}

.addinput {
    border: none;
    border-bottom: 2px solid #080601;
    background: none;
    padding: 0px;
    font-weight: 700;
    transition: .2s;
    width: 90%;
    
}




</style>