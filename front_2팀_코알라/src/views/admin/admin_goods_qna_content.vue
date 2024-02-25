<template>
    <div class="form-container" id="background">
        <div v-for="qna in content" :key="qna.QUESTION_NUMBER" class="post">

            <div class="mb-3">
                <label for="writer" class="form-label" style="font-weight: bold; font-size: large;">작성자</label>
                &nbsp;&nbsp; <input type="text" class="form-control" value="회원바인딩필요" disabled>
            </div>
            <div class="mb-3">
                <label for="title" class="form-label" style="font-weight: bold; font-size: large;">제목</label>
                <input type="text" class="form-control" :disabled="editable===false" v-model="qna.QUESTION_TITLE">
            </div>
            <div class="mb-3">
            <label for="content" class="form-label" style="font-weight: bold; font-size: large;">내용</label>
            <textarea class="form-control" :disabled="editable===false" v-model="qna.QUESTION_CONTENT" rows="10" ></textarea>
          </div>
    
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-secondary" type="button" @click="cancel">취소</button>
          <!-- <div v-if="this.user.user_no == this.content[0].USER_NO" class="right_btn"> 글쓴이와 로그인한 회원이 일치할 때 보여줘야 함. 
                <button class="btn btn-primary" type="button" @click="edit" v-if="editable===false">수정</button>
                <button class="btn btn-primary" type="button" @click="completedEdit" v-if="editable===true ">수정완료</button>
                <button class="btn btn-primary" type="button" @click="delete(qna.QUESTION_NUMBER)">삭제</button> -->
              </div>
              
              <hr style="margin: 20px">

            <!-- 관리자 답변view -->
            <div class="area" v-for="(qna,i) in content" :key="i">
                <form v-if="qna.QUESTION_ANSWER != null">
                    <label for="answer" class="form-label" style="font-weight: bold; font-size: large;">답변</label>
                    <textarea class="form-control" :disabled="admin_editable===false" v-model="qna.QUESTION_ANSWER" rows="3" readonly ></textarea>    
                </form>
                <div v-else class="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button class="btn btn-primary" type="button" @click="goToAnswer(qna)">답변 작성</button>
                    </div>
    
            </div>

        
              
         
          
    
        </div>
    
    </div>
    </template>
    <script>
    import axios from 'axios';
    
        export default {
            data() {
                return {
                    content: [],
                    editable: false,
                    admin_editable: false
                    
                }
            },
            // computed: {
		    //     user() {
			//         return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
		    //     },
            // },
            mounted() {
                axios({
                    url: "http://localhost:3000/qna/goods_qna_content",
                    method: "POST",
                    data: {
                        QUESTION_NUMBER: this.$route.query.QUESTION_NUMBER
                    },
            }).then(res => {
                this.content = res.data;
            }).catch(err => {
                alert(err);
                console.error(err);
            });
    
            },
            methods: {
                cancel() { //취소
                    this.$router.push({path:'/admin/admin_goods_qna'})
    
                },
                goToAnswer(qna) {
                    window.location.href = window.location.pathname + '/answer?QUESTION_NUMBER=' + qna.QUESTION_NUMBER

                }

                }
    
            }

    </script>
    
    <style scoped>
    .form-container {
    
        display: flex;
        padding: 20px;
        flex-direction: column;
    }
    
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
    
    
    </style>