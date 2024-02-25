const express = require('express');
const router = express.Router();
const db = require('../config.js');
const sql = require('../sql.js');
// const bcrypt = require('bcrypt');  


//로컬 회원가입
router.post('/join_process', (req, res) => {
    
    const user = req.body;
    console.log(user);
   // const encryptedPW = bcrypt.hashSync(user.member_pw, 10); // 비밀번호 암호화
   // console.log(encryptedPW);

    db.query(sql.id_check, [user.member_email], (error, results, fields) => {
        // console.log(user);
        if(results.length <= 0) {
            console.log(results.length);
            db.query(sql.join, [user.member_nickname, user.member_jumin, user.member_email, user.member_pw, user.member_phone, user.member_zipcode, user.member_address1, user.member_address2], (error, data)=> {
                if(error) {
                    return res.status(500).json({
                        message: 'DB_error'
                    })
                }
                return res.status(200).json({
                    message: '회원 가입 완료! '
                });
            })
        }else {
            return res.status(200).json({
                message: 'already_exist_id'
            })
        }
    })
})

//취향입력
router.post('/join_taste', (req, res) => {
    const taste = req.body;
    console.log(taste);
    db.query(sql.taste, [taste.taste_kind, taste.taste_sour, taste.taste_spark, taste.taste_degree, taste.taste_sweet], (error, data) => {
        if(error) {
            return res.status(500).json({
                message: 'DB_error'
            })
        }
        return res.status(200).json({
            message: 'insert_complete'
        
        });
    })
})

//카카오 회원가입
router.post('/kakaoJoin'), function(req, res) {
    const kakao = req.body;

    //데이터 없을 시 가입
    db.query(sql.kakao_check, [kakao.member_email], function(error, results, fields) {
        if(results.length <= 0) {
            db.query(sql.kakaoJoin, [kakao.member_email, kakao.member_nickname], function(error, result) {
                if(error) {
                    console.error(error);
                    return response.status(500).json({error: 'error'});
                }else {
                    return response.status(200).json({
                        message: '저장완료'
                    })
                }
            })
        }else {
            return response.status(200).json({
                message: 'already_exist_id'
            })
        }
    })
}


// 카카오 로그인
router.post('/kakaoLoginProcess', function (request, response) {
    const kakao = request.body;
    
    // 데이터 없을 시 회원가입도 진행
    db.query(sql.kakao_check, [kakao.member_email], function (error, results, fields) {
        if (results.length <= 0) {
            db.query(sql.kakao_join, [kakao.member_email, kakao.member_nickname], function (error, result) {
                if (error) {
                    console.error(error);
                    return response.status(500).json({ error: 'error' });
                }
            })
        }
        // 로그인 
        db.query(sql.get_member_number, [kakao.member_email], function (error, results, fields) {

            if (error) {
                console.log(error)
            }
            return response.status(200).json({
                message: results[0].member_number
            })
        })
    })
})



// 로컬 로그인   login  /  get_member_number  /  id_check  ==============
router.post('/login_process', function (request, response) {
    const loginUser = request.body;

    db.query(sql.id_check, [loginUser.member_email], function (error, results, fields) {
        if (results.length <= 0) {
            return response.status(200).json({
                message: 'undefined_email'
            })
        }
            else {   // 지정된 이메일에 비밀번호 검색
                db.query(sql.login, [loginUser.member_email], function (error, results, fields) {
            //비밀번호에 암호화가 걸려있어서 DB에 접속이 안되었음 - 암호화를 뺴고 진행한 것 (나중에 수정요함)
          // const same = bcrypt.compareSync(loginUser.user_pw, results[0].user_pw);
                    const same =  loginUser.member_pw == results[0].member_pw; 
                if (same) {
                    // Email에 저장된 pw 값과 입력한 pw값이 동일한 경우
                    db.query(sql.get_member_number, [loginUser.member_pw], function (error, results, fields) {
                        return response.status(200).json({
                            message: results[0].member_number
                        })
                    })
                }
                else {
                    // 비밀번호 불일치
                    return response.status(200).json({
                        message: 'incorrect_pw'
                    })
                }
            })
        }
    })
})


// 아이디 찾기    id_find 
router.post('/find', function (request, response, next) {
    const member_phone = request.body;

    //console.log(member_phone);

    db.query(sql.id_find, [member_phone.member_phone], function (error, results, fields) {
        if (error) {
            console.error(error);

            return response.status(500).json({ error: '회원 에러' });
        }

        if (results.length === 0) {
            // 전화번호가 데이터베이스에 존재하지 않는 경우
            return response.status(404).json({ message: 'member_not_found' });
        }

        const member_email = results[0].member_email; // 사용자 아이디를 가져옴
        return response.status(200).json({
            message: 'member_email',
            member_email: member_email
        });
    });
});
 
// 랜덤 비밀번호 설정 코드  
function generateTempPassword() {
    const length = 8; // 임시 비밀번호의 길이
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let tempPassword = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        tempPassword += characters[randomIndex];
    } //랜덤비번을 tempassword에 추가한다

    return tempPassword;
}



 // 아이디와 폰을 입력해서 임시 비밀번호를 받는다
// 비번 찾기   member_check    /  pass_update_tem
router.post('/find_pass', function (request, response, next) {
    const member_phone = request.body.member_phone;
    const member_email = request.body.member_email;
    
    db.query(sql.member_check, [member_phone,member_email ], async function (error, results, fields) {
        if (error) {
          
            return response.status(500).json({ error: '회원 에러' });
        }

        if (results.length == 0) {
            // 이메일이 데이터베이스에 존재하지 않는 경우
           
            return response.status(404).json({ message: 'member_not_found' });
        }

        const member_pw = generateTempPassword(); // 임시 비밀번호 생성
        // const encryptedPW = bcrypt.hashSync(member_pw, 10); // 임시 비밀번호 암호화(hashSync비동기암호화)

        // 업데이트
        db.query(sql.pass_update_tem, [member_pw, member_email], function (error, results, fields) {
            if (error) {
                console.error(error);
                return response.status(500).json({ error: '비번 에러' });
            }
            return response.status(200).json({
                message: member_pw
            });
        });

    });
});


// 관리자 체크 
router.post('/admin_check', function (request, response) {
    const loginUser = request.body;
    console.log(loginUser);

    db.query(sql.admin_check, [loginUser.member_number], function (error, results, fields) {
        if (results[0].MEMBER_TYPE == 1) {
            // 로그인한 유저의 TP가 1(관리자)인 경우    
            return response.status(200).json({
                message: 'admin'
            })
        }
        else if (results[0].MEMBER_TYPE == 0) {
            return response.status(200).json({
                message: 'member'
            })
        } else {
            console.error(error);
        }
    })
});

module.exports = router;