<template>
  <div class="form-container" id="background">
      <div v-for="item in content" :key="item.NEWS_NUMBER" class="post">
          <div class="mb-3">
              <label for="writer" class="form-label" style="font-weight: bold; font-size: large;">작성자</label>
              &nbsp;&nbsp; <input type="text" class="form-control" value="관리자" disabled>
          </div>
          <div class="mb-3">
              <label for="title" class="form-label" style="font-weight: bold; font-size: large;">제목</label>
              <input type="text" class="form-control" :disabled="editable===false" v-model="item.NEWS_TITLE">
          </div>
          <div class="mb-3">
          <label for="content" class="form-label" style="font-weight: bold; font-size: large;">내용</label>
          <textarea class="form-control" :disabled="editable===false" v-model="item.NEWS_CONTENT" rows="10" ></textarea>
        </div>
  
       
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary" type="button" @click="edit" v-if="editable===false">수정</button>
              <button class="btn btn-primary" type="button" @click="completedEdit" v-if="editable===true ">수정완료</button>
              <button class="btn btn-primary" type="button" @click="deleteNews(item.NEWS_NUMBER)">삭제</button>
              <!-- 삭제버튼 오류 뜨는게 없이 작동이 안되서 메소드명 변경함. delete => deleteNews -->
              <button class="btn btn-secondary" type="button" @click="cancel">취소</button>
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
              noticeInsert() {//등록
                  this.$router.push({path:'/noticewrite'})
              },
              cancel() { //취소
                  this.$router.push({path:'/adminmain'})
  
              },
              edit() { //수정
                  this.editable = true;
              },
              completedEdit() { //수정완료
                  axios.post("http://localhost:3000/admin/edit", {
                        content: this.content[0].NEWS_CONTENT,
                        title: this.content[0].NEWS_TITLE,
                        newsno: this.content[0].NEWS_NUMBER,
  
        })
          .then(response => {
            console.log(response.data);
            this.$router.push({path: '/admin/admin_news'}); 
          })
          .catch(error => {
            console.log(error);
  
          });
        alert("수정완료");
        this.editable = false;
  
              },
              deleteNews(NEWS_NUMBER) { //삭제
                  axios({
          url: "http://localhost:3000/admin/delete",
          method: "POST",
          data: {
            newsno: NEWS_NUMBER
          },
        }).then(res => {
          this.content = res.data;
                  alert("삭제되었습니다.")
          this.$router.push('/adminmain');
        }).catch(err => {
          alert(err);
        });
  
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