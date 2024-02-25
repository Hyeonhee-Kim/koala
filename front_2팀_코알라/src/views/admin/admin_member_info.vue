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
                <tr v-for="(member,i) in memberlist" :key="i" >
                  <td style="text-align: center;">{{ pageNum * pageSize + i + 1 }}</td>
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
                  <td style="display: flex;" class="d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" @click="modalOpen(member)">사용자명 변경</button>
                    <!-- 사용자명 변경 모달창 -->
                        <div class="modal-wrap" v-show="modalCheck">
                            <div class="modal-container">
                                <div class="modal-title" style="padding: 5%; text-align: center; font-weight: bolder;">사용자명 변경</div>
                                <div class="modal-content">
                                    <div>
                                        <label for="m_number" class="form-label">회원 번호</label>
                                        <input type="text" class="form-control" id="m_number" v-model="orginal_number"  readonly>
                                        <label for="m_name" class="form-label">기존 이름</label>
                                        <input type="text" class="form-control" id="m_name" v-model="original_nickname"  readonly>
                                    </div> <br/>
                                    <label for="c_name" class="form-label">변경할 닉네임을 입력해주세요.</label>
                                    <input type="text" class="form-control" id="c_name" v-model="newName">
                                </div> <br/>
                                <div class="modal-btn d-flex justify-content-end">
                                    <button class="btn btn-warning me-2 float-right" @click="changeNickname()">변경</button>
                                    <button class="btn btn-secondary float-right" @click="modalOpen" >닫기</button>
                                </div>
                            </div>

                        </div>   

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
                pageNum: 0,
                modalCheck: false,
                newName: '',
                original_number : 0,
                original_nickname : ''
            
            };
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
                console.log(member);
                axios.post('http://localhost:3000/admin/update_member_block', {memberId: member.MEMBER_NUMBER, blockStatus: member.MEMBER_BLOCK})
                .then(res => {
                    console.log(res);
                    console.log('스위치 상태 업데이트 완료');
                }).catch(err => {
                    console.error(err);
                });
                },
                modalOpen(member) {
                    this.modalCheck = !this.modalCheck;
                    this.newName = member.MEMBER_NICKNAME; // 기존 회원명으로 초기화
                    this.orginal_number = member.MEMBER_NUMBER;
                    this.original_nickname = member.MEMBER_NICKNAME;
                    console.log(member);
                },
                //변경된 사용자명 적용
                async changeNickname() {

                    try {
                        const response = await axios.post('http://localhost:3000/admin/update_member_nickname', {
                            newNickname: this.newName, memberId: this.orginal_number //순서도 맞아야함.
                        });
                        console.log('서버 응답', response.data);
                        location.reload();
                    }catch(error) {
                        console.error('에러 발생: ', error);
                    }
                }


                    
                },
                deleteID() {

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

/* dimmed */
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: white; */
}
/* modal or popup */
.modal-container {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 550px;
  background: #fff;
  border-style: solid;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}  
</style>
