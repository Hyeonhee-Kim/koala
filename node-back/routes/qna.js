const express = require('express');
const router = express.Router();
const db = require('../config.js'); // db 연결
const sql = require('../sql.js'); // 쿼리문 아카이브 연결


//관리자_ 1:1문의_ 목록 불러오기
router.get('/admin_qna', (req, res) => {
    
  db.query(sql.qnalist, (err, result) => {
    res.json(result);
  //  console.log(result);
  })
});
//1:1문의 관리자 페이지 목록 불러오기
router.get('/admin_inquiry', (req, res) => {
    
    db.query(sql.qnalist, (err, result) => {
      res.json(result);
      console.log(result);
    })
  });

//1:1문의 관리자 페이지 내용 불러오기
router.post('/admin_inquiry_content', (req, res) => {
    const qnanum = req.body.INQUIRY_NUMBER;
    // console.log(qnanum);
    db.query(sql.qnacontent, [qnanum], (error, result) => {
      if(error) {
        console.log(error);
        return res.status(500).json({error: 'error'});
      }else {
        res.send(result);
      }
    });
  })
  
//1:1문의 수정
router.post('/inquiry_edit', (req, res) => {
      const edit = req.body;
      console.log(edit);
      db.query(sql.qnaEdit, [edit.content, edit.title, edit.qnano], function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'error' });
        } else {
          res.send(result);
    
        }
      })
    
    });
    
//1:1문의 삭제
router.post('/inquiry_delete', (req, res) => {
    const qnanum = req.body.qnano;
    console.log(qnanum);
      db.query(sql.deleteQna, [qnanum], function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: 'error' });
        } else {
          res.send(result);
    
        }
      })
    
    });

//1대1문의 관리자 답변 작성
router.post('/inquiry_answer', (req, res) => {
  const answer = req.body;
  db.query(sql.inquiry_answer, [answer.answer_content, answer.inquiry_no], (error, result) => {
      if(error) {
          console.error(error);
          return res.status(500).json({ error: 'error' });
      }else {
          res.send(result);
      }
  })
});

//상품 문의 관리자 페이지 목록
router.get('/admin_goods_qna', (req, res) => {
    
  db.query(sql.goods_qnalist, (err, result) => {
    res.json(result);
    // console.log(result);
  })
})
//1:1문의 수정
router.post('/qna_edit', (req, res) => {
  const edit = req.body;
  console.log(edit);
  db.query(sql.qna_edit, [edit.content, edit.title, edit.qnano], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});
//마이페이지1대1내용불러오기용
router.post('/qna_content', (req, res) => {
  const qnanum = req.body.INQUIRY_NUMBER;
 
  db.query(sql.qna_content, [qnanum], (error, result) => {
    if(error) {
      console.log(error);
      return res.status(500).json({error: 'error'});
    }else {
      res.send(result);
    }
  });
})
//상품문의 답글 불러오기
router.post('/goods_qna_content', (req, res) => {
  const goods_qna_content = req.body.QUESTION_NUMBER;
  console.log(goods_qna_content);
  db.query(sql.goods_qna_content, [goods_qna_content], (error, result) => {
    if(error) {
      console.log(error);
      return res.status(500).json({error: 'error'});
    }else {
      res.send(result);
    }
  });
})

//상품 문의 관리자 페이지 내용
router.post('/goods_qna_content', (req, res) => {
  const qnanum = req.body.QUESTION_NUMBER;
  // console.log(qnanum);
  db.query(sql.goods_qna_content, [qnanum], (error, result) => {
    if(error) {
      console.log(error);
      return res.status(500).json({error: 'error'});
    }else {
      res.send(result);
    }
  });
});

//1:1문의 삭제
router.post('/qna_delete', (req, res) => {
  const qnanum = req.body.qnano;
  console.log(qnanum);
    db.query(sql.delete_qna, [qnanum], function (error, result) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'error' });
      } else {
        res.send(result);
  
      }
    })
  
  });



//상품 문의 관리자 답변 작성
router.post('/goods_qna_answer', (req, res) => {
const answer = req.body;
console.log(answer)

db.query(sql.goods_qna_answer, [answer.answer_content, answer.question_status, answer.inquiry_no,], (error, result) => {
  if(error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
  }else {
      res.send(result);
  }
})
});
// 1:1문의 답변  불러오기
router.post('/get_inquiry_answer', (req, res) => {
  const qnano = req.body.INQUIRY_NUMBER;

  db.query(sql.inquiry_answer, [qnano], function (error, result1) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result1);


    }
  });
})
//상품상세페이지 문의답변 ^ㅡ^
router.post('/get_question_answer', (req, res) => {
  const question_answer = req.body
  console.log(question_answer)
  db.query(sql.get_question_answer, [question_answer.question_title], (error, result) => {
    if(error) {
        console.log(error);
        
    }else {
        res.send(result);
    }
  })
  });

  //상품문의목록가져오기
router.get('/goodsinquiry/:goods_question_id' ,(req, res)=>{
  const goods=req.params.goods_question_id;
  console.log(goods)
  
db.query(sql.goodsinquiry,[goods] ,(err, result)=>{
 
 res.json(result);

 
})
})

//상품상세페이지 문의작성
router.post('/question' ,(req,res)=>{
    
  const questioncomplete=req.body;


  db.query(sql.questioninsert,[questioncomplete.question_title,questioncomplete.question_content,questioncomplete.question_image,questioncomplete.question_status,questioncomplete.question_member_email,questioncomplete.goods_question_id], function(err,result,fields){
    if (err) {
                                  
      throw err;
  }else {
      return res.status(200).json({
        message: 'add_complete'
    })
      
  }
  })
})

module.exports = router;