//마이페이지 

const express = require('express');
const router = express.Router();
const db = require('../config.js'); // db 연결
const sql = require('../sql.js'); // 쿼리문 아카이브 연결
const multer = require('multer');
const path = require("path");
const fs = require('fs');



// 마이페이지
router.get('/mypage/:member_number', function (request, response, next) {
  const member_number = request.params.member_number;

  
  db.query(sql.get_member_info, [member_number], function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: '회원에러' });
      }
      response.json(results);
  });
});


// 정보 (마이페이지 회원수정)
router.get('/getMemberData', function (request, response, next) {
    const member_number = request.query.member_number;
  
    db.query(sql.member_info, [member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '정보에러' });
        }
        response.json(results);
    });
  });

    // 정보 수정
router.post('/mypage_update', function (request, response, next) {
    const member = request.body;
  
    db.query(sql.mypage_update, [member.member_phone, member.member_pw,
       member.member_zipcode, member.member_address1, member.member_address2,member.member_number ], function (error, result, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: 'mypage_update_error' });
        }
        return response.status(200).json({ message: 'mypage_update' });
    });
  });

  

// 회원탈퇴 (회원 차단만 해놓을것 MEMBER_BLOCK을 1로 바꿀것)
router.post('/mypage_withdrawal', function (request, response, next) {
  const member = request.body;

  db.query(sql.mypage_withdrawal, [member.member_block,member.member_number], function (error, result, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: 'mypage_withdrawal_error' });
      }
      return response.status(200).json({ message: 'mypage_withdrawal' });
  });
});
// 회원탈퇴 (회원 차단만 해놓을것 MEMBER_BLOCK을 1로 바꿀것)
router.post('/mypage_withdrawal/:member_number', function (request, response, next) {
  const member = request.params.member_number;
  //console.log(member);
  db.query(sql.mypage_withdrawal, [member], function (error, result, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: 'mypage_withdrawal_error' });
      }
      return response.status(200).json({ message: 'success' });
  });
});


// 주문상세 리스트 불러오기 
router.get('/order_list', (req, res) => {
    db.query(sql.mypage_order_list, (err, result, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: '에러' });
      }

      res.json(result);
      //console.log(result);
    
    });
  });


  // 주문리스트 글 갯수 불러오기
  router.post('/order_list_cnt', (req, res) => {
    db.query(sql.order_cnt, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: '에러' });
      }
      return res.status(200).json(results[0]['COUNT(*)']);
    });
  });


// 주문취소/환불 리스트 불러오기 
router.get('/refund_list', (req, res) => {
  db.query(sql.refund_list, (err, result, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '에러' });
    }

    res.json(result);
  //  console.log(result);
  
  });
});


// 주문취소/환불 글 갯수 불러오기
router.post('/refund_list_cnt', (req, res) => {
  db.query(sql.refund_cnt, (error, results, fields) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: '에러' });
    }
    return res.status(200).json(results[0]['COUNT(*)']);
  });
});






  // 리뷰 리스트 불러오기 
  router.get('/review_List/:member_number', function (request, response, next) {
    const member_number = request.params.member_number;

    db.query(sql.review_list, [member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '에러' });
        }
        return response.status(200).json(results);
    });
});

//리뷰 쓰기
router.post('/review_write', (req, res) => {
  const rev = req.body;
  console.log(rev)

  db.query(sql.review_write, [rev.content, rev.member_email, rev.review_score,rev.review_title,rev.review_check], (error, results) => {
    if(error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    }
    try {
      const pastDir0 = `${__dirname}` + `../../uploads/` + rev.review_image
      

      const newDir = `${__dirname}` + `../../uploads/uploadGoodss/`;
       
  
      
     
      
       if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

      

      const extension = rev.review_image.substring(rev.review_image.lastIndexOf('.'))
      
     
     
      // 등록 상품의 번호 불러오기
      
      db.query(sql.update_review_goods_no, [rev.member_email], function (error, results, fields) {
          
          const filename = results[0].review_number

         
         

          // 이미지 폴더 및 이름(상품번호-타입) 변경
          // 타입 0: 메인 이미지 1: 상세 이미지
          
          fs.rename(pastDir0, newDir + filename + '-0' + extension, (err) => {
              if (err) {
                  throw err;
              }
          });
        

          // 파일 변경 모두 성공했으면 바뀐 이름으로 DB에 입력 
          db.query(sql.update_review_image, [filename + '-0' + extension, filename], function (error, results, fields) {
              
               
               
              if (error) {
                  
                  throw error;
              }
              else {
                  return res.status(200).json({
                      message: 'add_complete'
                  })
              }
          })

      })

  }
  catch (err) {
      // 이미지 등록 실패
      // -> DB에서 미리 등록한 상품도 다시 제거하기
      db.query(sql.update_review_delete_goods, [rev.review_number], function (error, results, fields) {
          return res.status(200).json({
              message: 'fail'
          })
      })
  }

  })
});


 // 리뷰리스트 글 갯수 불러오기
 router.post('/review_cnt', (req, res) => {
    db.query(sql.review_cnt, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: '에러' });
      }
      return res.status(200).json(results[0]['COUNT(*)']);
    });
  });

//
  //찜리스트
  router.get('/wish_List/:member_number', function (request, response, next) {
    const member_number = request.params.member_number;

    db.query(sql.wish_list, [member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '에러' });
        }
        return response.status(200).json(results);
    });
});



// 1:1 리스트 불러오기 
router.get('/inquiry_list', (req, res) => {
     
    db.query(sql.inquiry_list, (err, result, fields) => {
  
      res.json(result);
      
    
    });
  });
  


// 1:1 글 갯수 불러오기
router.post('inquiry_cnt', (req, res) => {
    db.query(sql.inquiry_cnt, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: '에러' });
      }
      return res.status(200).json(results[0]['COUNT(*)']);
    });
  });
  
  


//1:1 문의  등록
router.post('/mypage_qnawrite', function(req, res) {
  const inquiry = req.body;

  db.query(sql.mypage_qnawrite, [inquiry.inquiry_category, inquiry.inquiry_member_email, inquiry.inquiry_title, inquiry.inquiry_content, inquiry.inquiry_image], 
    function(error, result) {
      if(error) {
          console.log(error);
          return res.status(500).json({error: 'error'});
      }else {
          res.send(result);
      }
  })
}); 


// 상품문의 리스트 불러오기 
router.get('/question_list', (req, res) => {
    db.query(sql.question_list, (err, result, fields) => {
  
      res.json(result);
     
    
    });
  });
  


// 상품문의 글 갯수 불러오기
router.post('/question_cnt', (req, res) => {
    db.query(sql.question_cnt, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: '에러' });
      }
      return res.status(200).json(results[0]['COUNT(*)']);
    });
  });

  const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploadss/');
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 리뷰 이미지 등록 
router.post('/upload_img', upload.single('img'), (request, response) => {
    setTimeout(() => {
        return response.status(200).json({
            message: 'success'
        })
    }, 2000);
});

//찜리스트
router.get('/wish_List/:member_number', function (request, response, next) {
  const member_number = request.params.member_number;

  db.query(sql.wish_list, [member_number], function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: '에러' });
      }
      return response.status(200).json(results);
  });
});

//찜목록에 상품 추가
router.post('/wishlist_insert',function(req, res, next){
  const wish = req.body;
  db.query(sql.wish_dupl, [wish.wish_member_number, wish.wish_goods_name], function (error, results, fields) {
      if(error){
          console.error(error);
          return res.status(500).json ({error : 'error'});
      } 
      if (results.length > 0) {
          return res.status(200).json({message : 'check error'});
      } else {
          db.query(sql.wishlist_insert, [wish.wish_member_number, wish.wish_goods_name], function (error,data){
              if(error){
                  console.error(error);
                  return res.status(500).json({error : 'error'});
              }
              return res.status(200).json({message : 'wish insert complete'});
          });
      }
  });
});



//찜목록 에서 데이터 불러오기
router.get('/get_wishlist/:member_number' , function (req,res,next){

  const member_number = req.params.member_number;

  db.query(sql.get_wishlist, [member_number], function (error, results, fields) {
      if (error) {
          console.error(error);
          return res.status(500).json({ error: 'wish error' });
      }
      res.json(results);
  });
});

//찜 목록 삭제 
router.post('/delete_wishlist/:wish_number', function (req, res, next) {
  const wish = req.params.wish_number;
  console.log(wish);

  db.query(sql.delete_wishlist, [wish], function(error, data){
      if(error) {
          return res.status(500).json({
              message : 'db error'
          })
      }
      return res.status(200).json({
          message : 'complete'
      });
  })
});
// 내 리뷰 불러오기
router.get('/get_review/:member_number', function (request, response, next) {
  const member_number = request.params.member_number;

  db.query(sql.get_my_review, [member_number], function (error, results, fields) {
      if (error) {
          console.error(error);
          return response.status(500).json({ error: '회원에러' });
      }
      response.json(results);
  });
})
  //찜리스트
  router.get('/get_wish_goods_list/:member_number', function (request, response, next) {
    const member_number = request.params.member_number;

    db.query(sql.wish_list, [member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '에러' });
        }
        return response.status(200).json(results);
    });
});

//찜리스트 해제 delete_wish

router.post('/delete_wish/:WISH_NUMBER', function (req, res, next) {
  const goods = req.params.WISH_NUMBER;
  //console.log(goods);

  db.query(sql.wish_delete, [goods], function(error, data){
      if(error) {
          return res.status(500).json({
              message : 'db error'
          })
      }
      return res.status(200).json({
          message : 'complete'
      });
  })
});

//리뷰작성띄우기
// router.post('/get_review_content' , function (req,res,next){

//   const get_review_content = req.body
//   console.log(get_review_content)

//   db.query(sql.get_review_content, [get_review_content.order_number], function (error, results, fields) {
//       if (error) {
//           console.error(error);
//           return res.status(500).json({ error: 'wish error' });
//       }
//       res.json(results);
//   });
// });



module.exports = router;
