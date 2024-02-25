<template>
    <div class="background" @submit.prevent="sendForm2" >🍶당신의 취향을 입력해주세요
        <form id="sendForm2"> 
            
            <select v-model="selected.kind" class="form-select" aria-label="Default select example">
                <option disabled value="0">선호 주종</option>
                <option value="1" >증류주</option>
                <option value="2">발효주</option>
                <option value="3">기타(혼성주)</option>
            </select> <br/>
            
            <select v-model="selected.degree" class="form-select" aria-label="Default select example">
                <option disabled value="0">도수</option>
                <option value="1">0~10%</option>
                <option value="2">10~20%</option>
                <option value="3">20~30%</option>
                <option value="4">30%이상</option>
             </select> <br/>

            <select v-model="selected.sour" class="form-select" aria-label="Default select example">
                <option disabled value="0">산미</option>
                <option value="1">강</option>
                <option value="2">중</option>
                <option value="3">약</option>
            </select> <br/>

            <select v-model="selected.sweet" class="form-select" aria-label="Default select example">
                <option disabled value="0">단맛</option>
                <option value="1">강</option>
                <option value="2">중</option>
                <option value="3">약</option>
            </select> <br/>  

           <select v-model="selected.spark" class="form-select" aria-label="Default select example">
                <option disabled value="0">탄산</option>
                <option value="1">유</option>
                <option value="2">무</option>
                
            </select>
            <br/><br/><br/>
          
                <div class="d-grid gap-2 col-md-6 mx-auto my-auto">
                    <button type="submit" class="btn btn-warning">완료</button>
                </div> <br/>
                <a class="icon-link icon-link-hover my-auto" style="--bs-link-hover-color-rgb: 25, 135, 84;" href="http://localhost:8080/"> 
                    skip
                <svg class="bi" aria-hidden="true"><use xlink:href="#arrow-right"></use></svg>
                </a> 
                
            
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
           selected: {
            kind: 0,
            degree: 0,
            sour: 0,
            spark: 0,
            sweet: 0,
           }

        }
    },
    methods: {
        sendForm2 () {
            if(!this.validationCheck()) {
                return;
            }
            axios({
                url: "http://localhost:3000/auth/join_taste",
                method: "POST",
                data: {
                    taste_kind: this.selected.kind,
                    taste_sour: this.selected.sour,
                    taste_spark: this.selected.spark,
                    taste_degree: this.selected.degree,
                    taste_sweet: this.selected.sweet,
                }
            }).then(res => { // 0104 변경함 >> 응답메세지 받아야함
                if (res.data.message == 'insert_complete') {
                    alert("취향입력이 완료되었습니다.")
                    this.$router.push({path: '/'});
                } else {
                    alert('취향입력 에러러러');
                }
            }).catch(err => {
                console.log(err);
            })
        },
        validationCheck() {
            if(this.selected.kind == "0") {
                alert("주종을 선택하세요.");
                return false;
            }
            if(this.selected.degree == "0") {
                alert("도수를 선택하세요.");
                return false;
            }
            if(this.selected.sour == "0") {
                alert("산미를 선택하세요.");
                return false;
            }
            if(this.selected.sweet == "0") {
                alert("단맛을 선택하세요.");
                return false;
            }
            if(this.selected.spark == "0") {
                alert("탄산을 선택하세요.");
                return false;
            }
            return true;
        }
    }
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
    padding: 30px;
}
</style>