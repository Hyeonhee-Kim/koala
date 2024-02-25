<template>
  <!-- 글쓰기 부분 -->
  <div class="form-control" id="background">
   <form id="sendForm" >
      <div class="content" v-for="item in content" :key="item.INQUIRY_NUMBER">
           <div class="mb-3">
            <label for="writer" class="col-sm-2 col-form-label">작성자</label>
                 <h3>{{ loginUser.MEMBER_NICKNAME }}</h3>
           </div>
            
            <div class="mb-3">
              <label for="writer" class="col-sm-2 col-form-label">제목</label>
                  <textarea class="text2" :disabled="editable === false" v-model="content[0].INQUIRY_TITLE"
                style="font-size: 17px;"></textarea>
              </div>
            <div class="mb-3">
                <label for="content" class="form-label" >내용<span>*</span></label>
                <textarea class="text1" :disabled="editable === false" v-model="content[0].INQUIRY_CONTENT"
						style="font-size: 17px;"></textarea>
            </div>
  
            <!-- <div class="mb-3">
                <label for="formFile" class="form-label">사진 수정</label>
                <input class="form-control" type="file" id="formFile" style="margin:30px 0 30px;">  
                <img class="bd-placeholder-img card-img-top" width="auto" height="200" id="img" 
                             :src="item.INQUIRY_IMAGE ? require(`../../../../node-back/uploads/uploadGoods/${item.INQUIRY_IMAGE}`) :'/goodsempty.jpg'"/>
            </div> -->
      
            <div class="btn_area">
				       	<button type="button" class="main_btn" @click="QnaMain" style="margin-top:100px;">목록으로</button>

            <div class="right_btn" style="margin-top:100px;">
                  <button type="button" class="btn btn-warning" @click="editContent()" v-if="editable === false">수정완료</button>
                        <button type="button" class="btn" @click="confirmEditContent()" v-else>수정</button>
                        <button type="button" class="btn btn-secondary" @click="confirmDeleteContent(item.INQUIRY_NUMBER)">삭제</button>
				  	</div>
      </div> 
            <hr style="margin: 60px">

            <div class="area" v-for="(qna,i) in content" :key="i">
              <form v-if="qna.INQUIRY_ANSWER != null">
                <label class="head_answer" style="font-size: 17px; font-weight: bold;">답변</label>
              
                  <textarea class="text3" v-model="qna.INQUIRY_ANSWER" style="font-size: 17px;" readonly></textarea>
                
              </form>
              </div>
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
        content: [],
        editable: true
      };
           },
    created() {
        this.getloginUser();
    },

    computed: {
      member() {
            return this.$store.state.member; // 로그인 확인
          },
          

    },
    mounted() { //불러오기
          axios({
          url: "http://localhost:3000/qna/qna_content",
          method: "POST",
          data: {
            INQUIRY_NUMBER: this.$route.query.INQUIRY_NUMBER
          },
        }).then(res => {
          this.content = res.data;

        }).catch(err => {
          alert("너냐?"+err);
        });
    },

    methods: {
// 삭제
      confirmDeleteContent(INQUIRY_NUMBER) {
              // 사용자에게 확인 메시지를 띄우고 결과를 받아옴
              const userConfirmed = confirm('정말 삭제하시겠습니까?');

              if (userConfirmed) {
                // 사용자가 확인 버튼을 누른 경우에만 삭제를 진행
                      axios({
                        url: "http://localhost:3000/qna/qna_delete",
                        method: "POST",
                        data: {
                          qnano: INQUIRY_NUMBER
                        }
                      }).then(res => {
                        alert("삭제되었습니다.")
                        // 삭제가 성공한 경우에만 페이지 이동
                        this.$router.push('/mypage/mypage_qna');
                      }).catch(err => {
                        // 삭제에 실패하면 에러 메시지를 표시
                        alert(err);
                      });
              } else {
              }
            },
     

    confirmEditContent() { //수정완료버튼
            axios.post("http://localhost:3000/qna/qna_edit", {
              content: this.content[0].INQUIRY_CONTENT,
              title: this.content[0].INQUIRY_TITLE,
              qnano: this.content[0].INQUIRY_NUMBER,

            })
              .then(response => {
              //  console.log(response.data);
              })
              
              .catch(error => {
                console.log(error);

              });
           alert("저장완료. 수정이 완료되었으면 수정완료 버튼을 눌러주세요.");
              this.editable = false;
              // this.$router.push('/mypage_qnan?page=1');

          },

     editContent() { //수정완료시
				alert("수정이 완료 되었습니다.")
        this.$router.push('/mypage/mypage_qna');

		},
      QnaMain() {
              console.log("실행 확인")
              this.$router.push('/mypage/mypage_qna');
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
  };
  </script>
  
  <style scoped>
  #background {
  /* background: linear-gradient(180deg, rgb(139, 138, 135), rgba(81, 80, 80, 0.179)); */
  height: 1100px;
  width: 1000px;
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
  

  span{
      color: red;
  }
  h3 {
    font-size: 30px;
    margin: 10px 30px;
  }
.mb-3{
  font-size: 20px;
}

  .answer{
    font-size: 20px;
  }

* {
	margin: 0;
	padding: 0;
}

div {
	font-family: 'GmarketSansMedium';
}

.btn_area {
	align-items: center;
	display: flex;
	vertical-align: middle;
	height: 100px;
	margin: auto;
	padding: auto;
	justify-content: flex-start;
}

.content {
	margin: auto;
	padding: 30px;
	max-width: 900px;
}

.content textarea {
	width: 100%;
}

.text1 {
	resize: none;
	height: 100px;
	font-family: 'GmarketSansMedium';
}

.text2 {
	resize: none;
	height: 35px;
	font-family: 'GmarketSansMedium';
}

.text3 {
	resize: none;
	height: 120px;
	margin-bottom: 50px;
	font-family: 'GmarketSansMedium';
}

.main_btn {
	font-size: 16px;
	width: 80px;
	height: 50px;
	background-color: rgb(255, 225, 160);
	border: black;
	border-radius: 4px;
	cursor: pointer;
	font-family: 'GmarketSansMedium';
	vertical-align: middle;
}

.right_btn {
	margin-left: auto;
}

.btn {
	font-size: 16px;
	width: 80px;
	height: 50px;
	margin-left: auto;
	background-color: skyblue;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-family: 'GmarketSansMedium';
	margin: 3px
}

.btn:hover {
	background-color: rgb(29, 170, 226);
}

.t2 {
	margin: 20px 0px 5px 0px;
	font-size: 17px;
	font-weight: bold;
}

.text3:focus {
	outline: none;
}
  </style>