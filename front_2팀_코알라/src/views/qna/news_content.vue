<template>
    <div class="album py-5 ">
        <div class="container justify-content-center">
          <div id="title1" class="mt-5 mb-3">
            <h1>공지사항</h1>
            <div class="row">
            <hr>
    </div>
    </div>
    </div>
    </div>
    <div class="form-container" id="background">
        <div v-for="item in content" :key="item.NEWS_NUMBER" class="post">
            <div class="mb-3">
                <label for="writer" class="form-label" style="font-weight: bold; font-size: large;">작성자</label>
                &nbsp;&nbsp; <input type="text" class="form-control" value="관리자" readonly>
            </div>
            <div class="mb-3">
                <label for="title" class="form-label" style="font-weight: bold; font-size: large;">제목</label>
                <input type="text" class="form-control"  v-model="item.NEWS_TITLE" readonly>
            </div>
            <div class="mb-3">
            <label for="content" class="form-label" style="font-weight: bold; font-size: large;">내용</label>
            <textarea class="form-control"  v-model="item.NEWS_CONTENT" rows="10" readonly></textarea>
          </div>
    
         
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <!-- 삭제버튼 오류 뜨는게 없이 작동이 안되서 메소드명 변경함. delete => deleteNews -->
                <button class="btn btn-secondary" type="button" @click="cancel">이전</button>
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
                    editable: false
                }
            },
            mounted() {
                axios({
                    url: "http://localhost:3000/admin/news_content",
                    method: "POST",
                    data: {
                        NEWS_NUMBER: this.$route.query.NEWS_NUMBER
                          },
                      }).then(res => {
                        this.content = res.data;
                              console.log(this.content);
                      }).catch(err => {
                        alert(err);
                      });
    
            },
            methods: {

                cancel() { //취소
                    this.$router.push({path:'/news'})
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

    input {
        pointer-events: none;
    }
    
    
    </style>