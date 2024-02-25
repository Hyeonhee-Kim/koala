const express = require('express');
const router = express.Router();
const db = require('../config.js'); // db 연결
const sql = require('../sql.js'); // 쿼리문 아카이브 연결





//주문관리 리스트 불러오기
router.get('/admin_order_list', (req, res) => {
  const orderlist = req.body;

  db.query(sql.order_list, (err, result) => {
    res.json(result);
  })
});

//공지 등록
router.post('/news_write', function(req, res) {
    const notice = req.body;

    db.query(sql.notice, [notice.news_writer, notice.news_title, notice.news_content], function(error, result) {
        if(error) {
            console.log(error);
            return res.status(500).json({error: 'error'});
        }else {
            res.send(result);
        }
    })
}); 

// 공지 목록 불러오기
router.get('/news_list', (req, res) => {

    db.query(sql.noticelist, (err, result, fields) => {
      
      res.json(result);
      
    });
  });
  
//공지 내용 불러오기
router.post('/news_content', (req, res) => {
  const newsno = req.body.NEWS_NUMBER;

  db.query(sql.noticecontent, [newsno], (error, result) => {
    if(error) {
      console.log(error);
      return res.status(500).json({error: 'error'});
    }else {
      res.send(result);
    }
  });
})

//공지 수정
router.post('/edit', (req, res) => {
  const edit = req.body;
  db.query(sql.noticeEdit, [edit.content, edit.title, edit.newsno], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

//공지 삭제
router.post('/delete', (req, res) => {
  const newsnum = req.body.newsno;

  db.query(sql.deleteNotice, [newsnum], function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'error' });
    } else {
      res.send(result);

    }
  })

});

//공지 글 갯수 불러오기
router.post('/board_list_cnt', (req, res) => {
    db.query(sql.noticecnt, (error, results, fields) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: '에러' });
      }
      return res.status(200).json(results[0]['COUNT(*)']);
    });
  });

  //회원관리_ 리스트 불러오기
  router.get('/member_list', (req, res) => {

    db.query(sql.memberlist, (err, result, fields) => {
      
      res.json(result);
      
    });
  });

  //회원관리_ 계정 활성화 버튼 상태 업데이트
  router.post('/update_member_block', (req, res) => {
    const upblock = req.body;

    db.query(sql.updateblock, [upblock.blockStatus, upblock.memberId], (err, result) => {
      if(err) {
        console.log(err);
        return res.status(500).json({err: 'error'});
      }else {
        res.send(result);
        
        
      }
      
    })
  })

//회원관리 - 회원명 업데이트
router.post('/update_member_nickname', (req, res) => {
  const upname = req.body;

  db.query(sql.updatename, [ upname.newNickname,upname.memberId], (err, result) => {
    if(err) {
      console.log(err);
      return res.status(500).json({err: 'error'});
    }else {
      res.send(result);
      // console.log(result);
    }
  })
}) 

//주문관리 리스트 불러오기
router.get('/admin_order_list', (req, res) => {
  const orderlist = req.body;

  db.query(sql.order_list, (err, result) => {
    res.json(result);
  })
})


module.exports = router;
