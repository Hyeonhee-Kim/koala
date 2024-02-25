<template>
      <div class="contain">

        <div class="generalJoin">
            <span class="textGeneral">일반 회원가입</span>
            <p><a><img src="../../assets/user_img.png" class="btn_general" @click="generalJoin"></a></p>
        </div>

        <div class="socialJoin">
            <span class="textSocial">간편 회원가입</span>
            <div class="socialImg">
                <p><a><img src="../../assets/btn_kakao.png" class="btn_kakao" @click="kakaoJoin"></a></p>
                <!-- <p><a ><img src="../assets/btn_naver.png"   class="btn_naver" @click="naverlogin"></a></p> -->
                <!-- <div id="naverIdLogin" @click="naverlogin" img src="../assets/naver.png"></div> -->
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    methods: {
        generalJoin() {
            this.$router.push({path:'/join'});
        },
        kakaoJoin() {
            window.Kakao.Auth.login({
                scope: "profile_nickname, account_email",
                success: this.getKakaoAccount,
            });
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: "v2/user/me",
                success: (res) => {
                    const kakao_account = res.kakao_account;
                    const email = kakao_account.email;
                    const nickname = kakao_account.profile.nickname;

                    axios({
                        url: "http://localhost:3000/auth/kakaoJoin",
                        method: "POST",
                        data: {
                            member_email: email,
                            member_nickname: nickname
                        },
                    }).then(res => {
                        if(res.data.message == '저장완료') {
                            alert("회원가입 성공!")
                        }
                        else {
                            alert("이미 생성된 계정이 있습니다.")
                        }
                        this.$router.push("/login");
                    }).catch(err => {
                        console.log(err);
                    })
                },
                fail: (error) => {
                    console.log(error);
                },
            });

        }
    }
}
</script>

<style scoped>
.contain {
    height: 500px;
    display: flex;
    /*div박스 나란히 */
    align-items: center;
    justify-content: center;
    font-family: 'GmarketSansMedium';
    position: relative;
    left: 5px;
}
.generalJoin {
    margin: 0 100px;
}
.btn_general {
    width: 140px;
    text-align: center;
}

.textGeneral {
    position: relative;
    bottom: 25px;
    font-size: 30px;
    right: -12px;
}

.textSocial {
    position: relative;
    bottom: 30px;
    font-size: 30px;

}

.socialJoin {
    margin: 0 90px;
    text-align: center;

}

.socialImg {
    display: flex;

}
.btn_kakao {
    width: 130px;
    text-align: center;
}
</style>