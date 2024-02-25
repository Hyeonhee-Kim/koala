const express = require('express');
const router = express.Router();
const db = require('../config.js');
const sql = require('../sql.js');
const fs = require('fs');


const multer = require('multer');
const path = require("path");



// 상품 등록
router.post('/add_goods', function (request, response) {
    const goods = request.body;
   
    try {
        
        // 동일 상품 존재하는지 조회
        db.query(sql.goods_check, [goods.goods_name], function (error, results, fields) {
            
            if (results.length <= 0)
            
             {
               
                // 이미지를 제외한 굿즈 정보 먼저 입력
                db.query(sql.goodsInsert, [goods.goods_name, goods.goods_price,goods.goods_sweet, goods.goods_spark,goods.goods_sour,goods.goods_degree,goods.goods_kind,goods.goods_stock], function (error, results, fields) {
                    
                    if (error) {
                        return response.status(200).json({
                            message: 'fail'
                        })
                        
                    }
                    
                    try {
                        const pastDir0 = `${__dirname}` + `../../uploads/` + goods.goods_image
                        const pastDir1 = `${__dirname}` + `../../uploads/` + goods.goods_image_detail

                        const newDir = `${__dirname}` + `../../uploads/uploadGoods/`;
                        
                         if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);

                        

                        const extension = goods.goods_image.substring(goods.goods_image.lastIndexOf('.'))
                        
                        // 등록 상품의 번호 불러오기
                        
                        db.query(sql.get_goods_no, [goods.goods_name], function (error, results, fields) {
                            
                            const filename = results[0].goods_id
                           

                            // 이미지 폴더 및 이름(상품번호-타입) 변경
                            // 타입 0: 메인 이미지 1: 상세 이미지
                            fs.rename(pastDir0, newDir + filename + '-0' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                            });
                            fs.rename(pastDir1, newDir + filename + '-1' + extension, (err) => {
                                if (err) {
                                    throw err;
                                }
                                
                            });

                            // 파일 변경 모두 성공했으면 바뀐 이름으로 DB에 입력 
                            db.query(sql.add_image, [filename + '-0' + extension, filename + '-1' + extension, filename], function (error, results, fields) {
                                 
                                 
                                if (error) {
                                    
                                    throw error;
                                }
                                else {
                                    return response.status(200).json({
                                        message: 'add_complete'
                                    })
                                }
                            })

                        })

                    }
                    catch (err) {
                        // 이미지 등록 실패
                        // -> DB에서 미리 등록한 상품도 다시 제거하기
                        db.query(sql.delete_goods, [goods.goods_name], function (error, results, fields) {
                            return response.status(200).json({
                                message: 'fail'
                            })
                        })
                    }
                })

            }
            else {
                return response.status(200).json({
                    message: 'already_exist_goods'
                })
            }
        })

    } catch {
        return response.status(200).json({
            message: 'DB_error'
        })
    }
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 등록 
router.post('/upload_img', upload.single('img'), (request, response) => {
    setTimeout(() => {
        return response.status(200).json({
            message: 'success'
        })
    }, 2000);
});

//상품 정렬 키워드  쿼리문 앞에 띄어쓰기 주의!
function sortNumReplace(sortCase) {
    if (sortCase == 0 ){
        order = ` ORDER BY goods_date` // 오래된 순
    } else if (sortCase == 1) { // 최근 순
        order = ` ORDER BY goods_date DESC`;
    }
    else if (sortCase == 2) { // 가격 낮은 순 
        order = ` ORDER BY goods_price`;
    }
    else if (sortCase == 3) { // 가격 높은 순 
        order = ` ORDER BY goods_price DESC`;
    }
    else if (sortCase == 4) {  // 이름
        order = ` ORDER BY goods_name`;
    }
    return order;
}


//db로부터 상품데이터 가져오기
router.get('/get_goods_list/:sortNum/:keyword', function (req, res, next) {
    const sortNum = req.params.sortNum;
    const keyword = req.params.keyword;
    let search = '';

    if (keyword != 'none'){
        search = ' WHERE goods_name LIKE "%' + keyword + '%" ';
    }

    const order = sortNumReplace(sortNum);


    db.query(sql.get_goods_list + search + order, function (error, results, fields) {
        if(error){
            console.error(error);
        }
        // console.log(results)
        res.json(results);
   }
)
});


//상품 취향 필터링 키워드
function filterReplace(filter) {
    if (filter == 0 ){
        where = ` WHERE goods_sell > 4` // 판매량 일정 이상 상품
    } else if (filter == 1) { // 출시된지 3개월 이내 상품
        where = ` WHERE goods_date BETWEEN DATE_ADD(NOW(), INTERVAL -3 MONTH) AND NOW()`;
    }
    return where;
}

//db로부터 필터링된 상품데이터 가져오기
router.get('/get_goods_filter_list/:sortNum/:filter', function (req, res, next) {
    const sortNum = req.params.sortNum;
    const filter = req.params.filter;

    const order = sortNumReplace(sortNum);
    const where = filterReplace(filter);

    db.query(sql.get_goods_list + where + order, function (error, results, fields) {
        if(error){
            console.error(error);
        }
        res.json(results);
   }
)
});

// 상품 상세정보 가져오기 
router.get('/goods_detail/:goods_id', function (request, response, next) {
    const goods_id = request.params.goods_id;

    db.query(sql.get_goods_detail, [goods_id], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '상품디테일에러' });
        }
       
        response.json(results[0]);
    });
});


//장바구니 추가
router.post('/basket_insert',function(req, res, next){
    const basket = req.body;
    
    db.query(sql.basket_dupl, [basket.member_number, basket.basket_goods_name], function (error, results, fields) {
        if(error){
            console.error(error);
            return res.status(500).json ({error : 'error'});
        } 
        if (results.length > 0) {
            return res.status(200).json({message : 'check error'});
        } else {
            db.query(sql.basket_insert, [basket.member_number, basket.basket_goods_price, basket.basket_goods_count, basket.basket_goods_name, basket.basket_goods_image], function (error,data){
                if(error){
                    console.error(error);
                    return res.status(500).json({error : 'error'});
                }
                return res.status(200).json({message : 'basket insert complete'});
            });
        }
    });
});


//장바구니에서 데이터 불러오기
router.get('/get_basket_goods_list/:member_number' , function (req,res,next){

    const member_number = req.params.member_number;

    db.query(sql.get_basket_goods_list, [member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: 'basket error' });
        }
        console.log(results);
        res.json(results);
    });
});

//장바구니 삭제 
router.post('/delete_basket/:basket_number', function (req, res, next) {
    const basket = req.params.basket_number;
    console.log(basket);

    db.query(sql.basket_delete, [basket], function(error, data){
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

//재고관리 -상품 삭제
router.post('/delete_goods/:goods_id', function (req, res, next) {
    const goods = req.params.goods_id;
   

    db.query(sql.goods_delete, [goods], function(error, data){
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
//수정
router.post('/goodscontent', (req, res) => {
    const goodsid = req.body.goods_id;
   
      
    db.query(sql.goodscontent, [goodsid], (error, result) => {
      if(error) {
        console.log(error);
        return res.status(500).json({error: 'error'});
      }else {
        res.send(result);
        
        
      }
    });
  })
//수정이미지받기
  router.post('/update_img', upload.single('img'), (request, response) => {
    setTimeout(() => {
        return response.status(200).json({
            message: 'success'
        })
    }, 2000);
  });
  
  //상품수정
router.post('/updategoods', (req, res) => {
    const update = req.body;
    
    
    
    
    db.query(sql.updategoods, [update.goods_name, update.goods_price, update.goods_sweet,update.goods_spark, update.goods_sour,update.goods_degree,update.goods_kind,update.goods_stock,update.goods_id], function (error, result) {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'error' });
      }   
        
    
      
     
       try {
        const pastDir0 = `${__dirname}` + `../../uploads/` + update.goods_image
        const pastDir1 = `${__dirname}` + `../../uploads/` + update.goods_image_detail
  
        const newDir = `${__dirname}` + `../../uploads/uploadGoods/`;
         
        // 이미 파일이 존재하면 try 블록 실행하지 않음
         if (fs.existsSync(newDir + update.goods_image)) {
            return res.status(200).json({
                message: 'add_complete'
            });
        }
       
        
         if (!fs.existsSync(newDir)) fs.mkdirSync(newDir);
  
        
  
        const extension = update.goods_image.substring(update.goods_image.lastIndexOf('.'))
       
        // 등록 상품의 번호 불러오기
        
        db.query(sql.update_goods_no, [update.goods_name], function (error, results, fields) {
            
            const filename = results[0].goods_id
            
           
  
            // 이미지 폴더 및 이름(상품번호-타입) 변경
            // 타입 0: 메인 이미지 1: 상세 이미지
            fs.rename(pastDir0, newDir + filename + '-0' + extension, (err) => {
                if (err) {
                    throw err;
                }
            });
            fs.rename(pastDir1, newDir + filename + '-1' + extension, (err) => {
                if (err) {
                    throw err;
                }
                
            });
  
            // 파일 변경 모두 성공했으면 바뀐 이름으로 DB에 입력 
            db.query(sql.update_image, [filename + '-0' + extension, filename + '-1' + extension, filename], function (error, results, fields) {
                
                 
                 
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
        db.query(sql.update_delete_goods, [update.goods_name], function (error, results, fields) {
            return res.status(200).json({
                message: 'fail'
            })
        })
    }
    })
  
  });
//주문하기 
  router.post('/goods_order', function (request, response){
    const order=request.body;
    
    
    db.query(sql.goods_order, [order.order_nickname,order.order_phone,order.order_taker,order.order_taker_phone,order.order_taker_zipcode,order.order_taker_address1,order.order_taker_address2,order.order_taker_memo,order.order_goods_price,order.order_count,order.order_member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            return response.status(200).json({
                message: 'add_complete'
            })
        }
    })

  });

  //주문정보가져오기 (맴버정보)
  router.post('/order_member_list', function(req,res){
    const member_list=req.body;
   
    db.query(sql.get_member_list,[member_list.member_email],function (error, results, fields){
        if(error){
            console.error(error);
        }else{
            res.send(results)
           
        }
    })
  });
//주문자정보 통일 주문
  router.post('/goods_order2', function (request, response){
    const order2=request.body;
    
    db.query(sql.goods_order2, [order2.order_nickname,order2.order_phone,order2.order_taker,order2.order_taker_phone,order2.order_taker_zipcode,order2.order_taker_address1,order2.order_taker_address2,order2.order_taker_memo,order2.order_goods_price,order2.order_count,order2.order_member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            return response.status(200).json({
                message: 'add_complete'
            })
        }
    })

  });
  //장바구니로온 결제
  router.post('/goods_order3', function (request, response){
    const order3=request.body;
   
   
    db.query(sql.delete_basket,[order3.order_member_number],function (error, results, fields){
        if(error){
            console.error(error)
        }
        
    })
    db.query(sql.goods_order3, [order3.order_nickname,order3.order_phone,order3.order_taker,order3.order_taker_phone,order3.order_taker_zipcode,order3.order_taker_address1,order3.order_taker_address2,order3.order_taker_memo,order3.order_goods_price,order3.order_member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            return response.status(200).json({
                message: 'add_complete'
            })
        }
    })
    

  });
  //체크한장바구니로온 결제
  router.post('/goods_order4', function (request, response){
    const order4=request.body;
    console.log(order4)
    db.query(sql.delete_basket,[order4.order_member_number],function (error, results, fields){
        if(error){
            console.error(error)
        }
        
    })
    db.query(sql.goods_order4, [order4.order_nickname,order4.order_phone,order4.order_taker,order4.order_taker_phone,order4.order_taker_zipcode,order4.order_taker_address1,order4.order_taker_address2,order4.order_taker_memo,order4.order_goods_price,order4.order_member_number], function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            return response.status(200).json({
                message: 'add_complete'
            })

        }
       
    })  

  });
//주문에 이미지업로드
  router.post('/order_image', function (request, response){
    const goodsid=request.body;
    
    db.query(sql.order_image, [goodsid.goods_id], function (error, results, fields) {
        if(error){
            console.error(error);
        }else{
            response.send(results)
           
        }
    })

  });
  //수량담기
  router.post('/goods_quantity', function (request, response){
    const goods=request.body;
    
    db.query(sql.goods_quantity, [goods.goods_quantity,goods.goods_id], function (error, results, fields) {
        if (error) {
            console.error(error);
        }
        else {
            return response.status(200).json({
                message: 'add_complete'
            })
        }
    })

  });
  //주문에 장바구니 이미지업로드
  router.post('/order_basket_image', function (request, response){
    const order_basket_image=request.body;

    
    db.query(sql.order_basket_image, [order_basket_image.member_number], function (error, results, fields) {
        if(error){
            console.error(error);
        }else{
            response.send(results)
           
        }
    })

  });
//총상품금액가져오기
  router.post('/order_basket_price', function (request, response){
    const order_basket_price=request.body;
    console.log(order_basket_price)

    
    db.query(sql.order_basket_price, [order_basket_price.member_number], function (error, results, fields) {
        if(error){
            console.error(error);
        }else{
            response.send(results)
           
        }
    })

  });

  router.post('/order_price_get', function (request, response){
  

   db.query(sql.order_price_get,  function (error, results, fields) {
        if(error){
            console.error(error);
        }else{
            response.send(results)
           
        }
    })

  });

  // 주문 리스트
router.get('/orderlist/:member_number', function (request, response, next) {

    const memberno = request.params.member_number;
    db.query(sql.orderlist, [memberno], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '결제리스트에러' });
        }
        response.json(results);
    });
});

  
// 주문한 상품
router.get('/order_Detail/:order_number', function (request, response, next) {
    const orderno = request.params.order_number;
 
    db.query(sql.orderlist_detail, [orderno], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '결제리스트에러' });
        }
        
        response.json(results);
    });
});

router.post('/delete_order', function (request, response, next) {

    const delete_order = request.body
    console.log(delete_order)
    db.query(sql.delete_order, [delete_order.order_number], function (error, results, fields) {
        if (error) {
            console.error(error);
            return response.status(500).json({ error: '결제리스트에러' });
        }
        response.json(results);
    });
});

//상품 상세페이지 상품후기 가져오기
router.get('/reviewlist/:goods_id', (req, res) => {
    const goods_id = req.params.goods_id;
    db.query(sql.get_goods_review, [goods_id], (err,results) => {
        if(err) {
            console.log(err);
            return res.status(500).json({ error: '상품디테일에러' });
        }
        res.json(results);

    });
});

module.exports=router;