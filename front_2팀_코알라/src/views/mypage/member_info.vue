<template>
    <div>      
    <div class="article-list table-common con" style="margin-bottom: 20px;">
      <!-- 테이블 높이를 너비 100%로 수정 -->
        <table style='width:100%;table-layout:fixed;'> 
            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">Email(ID)</th>
                    <th scope="col">회원명</th>
                    <th scope="col">가입일시</th>
                    <th scope="col">계정 활성화</th>
                    <th scope="col">관리</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="member in memberlist" :key="member.MEMBER_NUMBER" >
                  <td style="text-align: center;">{{member.MEMBER_NUMBER}}</td>
                  <td style="text-align: center;">{{member.MEMBER_EMAIL}}</td>                  
                  <td style="text-align: center;">{{member.MEMBER_NICKNAME}}</td>
                  <td style="text-align: center;">{{member.MEMBER_JOINDATE.split('T')[0]}}</td>
                  <td>
                    <!-- {{member.MEMBER_BLOCK}} -->
                    <div class="form-switch custom-switch" >
                        <input class="form-check-input" 
                              type="checkbox" 
                              role="switch" 
                              :checked="member.MEMBER_BLOCK === 0"
                              @change="toggleSwitch(member)">
                    </div>
                </td> 
                  <td style="display: flex; gap: 10px;">
                    <button type="button" class="btn btn-primary">사용자명 변경</button>
                    <button type="button" class="btn btn-secondary">탈퇴</button>
                 </td>
                </tr>
               
            </tbody>
        </table>
    </div>
<br/>
        <!-- 페이징
        <div class="text-center">
          <button @click="prevPage" class="page-btn">이전</button>
          <span class="page-count">{{$route.query.page}}/{{totalpage}} 페이지</span>
          <button @click="nextPage" class="page-btn">다음</button>
        </div> -->

  </div>

  </template>

  <script>
    import axios from 'axios'

    export default {
        data() {
            return {
                memberlist: [],
                //페이징 추가
                pageSize: 5,
            }
        },
        mounted() {
            axios({
                url: "http://localhost:3000/admin/member_list",
                method: "GET",
                data: {
                    page:this.$route.query.page,
                    pagesize: this.pageSize
                },
            }).then(res => {
                this.memberlist = res.data;
            }).catch(err => {
                console.log(err);
            });
            //게시판 글 개수 가져오는 axios 추가
        },
        methods: {
            toggleSwitch(member) {
                member.MEMBER_BLOCK = member.MEMBER_BLOCK === 0 ? 1 : 0; //스위치 상태 토글
                axios.post('http://localhost:3000/admin/update_member_block', {memberId: member.MEMBER_NUMBER, blockStatus: member.MEMBER_BLOCK})
                .then(res => {
                    console.log('스위치 상태 업데이트 완료',res);
                }).catch(err => {
                    console.error(err);
                });
                }
            }
        }
    
  </script>

  <style scoped>
.custom-switch {
    /* 원하는 크기 설정 */
    transform: scale(1.7); /* 예: 스위치 크기를 1.5배로 확대 */
    display: flex;
    justify-content: center;
}

th {
    text-align: center;
  }
  </style>
