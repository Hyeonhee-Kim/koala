// 쿼리문 작성하고 변수에 저장하는 곳
module.exports = {
    //상품 관련 쿼리문
    goodsInsert: `INSERT INTO goods (goods_name,goods_price,goods_sweet,goods_spark,goods_sour,goods_degree,goods_kind,goods_stock ) values (?,?,?,?,?,?,?,?)`,
    goodsList :`SELECT GOODS_ID,GOODS_IMAGE,GOODS_NAME,GOODS_DEGREE,GOODS_PRICE,GOODS_STOCK FROM GOODS`,
    goods_check : `SELECT * FROM goods WHERE goods_name = ?`,
    get_goods_no: `SELECT goods_id FROM goods WHERE goods_name = ?`,
    add_image: `UPDATE GOODS SET goods_image = ?, goods_image_detail = ? WHERE goods_id = ?`,
    delete_goods: `DELETE FROM GOODS WHERE GOODS_name = ?`,
    get_goods_list:`SELECT * FROM goods`,
    get_goods_detail : `SELECT * FROM goods WHERE goods_id = ?`,
    goods_delete : `DELETE FROM goods WHERE goods_id = ?`,
    get_goods_review: `SELECT * FROM GOODS_REVIEW where goods_id =?`,

    //예림누나
    orderlist: `SELECT * FROM ORDERS WHERE ORDER_MEMBER_NUMBER = ?`,

    orderlist_detail: `SELECT * FROM ORDERS WHERE ORDER_NUMBER = ?`,

    delete_order :`DELETE from orders where order_number=?`,


    goods_order:`insert into orders(order_nickname,order_phone,order_taker,order_taker_phone,order_taker_zipcode,order_taker_address1,order_taker_address2,order_taker_memo,order_goods_price,order_count,order_member_number)values(?,?,?,?,?,?,?,?,?,?,?)`,
    goods_order2:`insert into orders(order_nickname,order_phone,order_taker,order_taker_phone,order_taker_zipcode,order_taker_address1,order_taker_address2,order_taker_memo,order_goods_price,order_count,order_member_number)values(?,?,?,?,?,?,?,?,?,?,?)`,
    goods_order3:`insert into orders(order_nickname,order_phone,order_taker,order_taker_phone,order_taker_zipcode,order_taker_address1,order_taker_address2,order_taker_memo,order_goods_price,order_member_number)values(?,?,?,?,?,?,?,?,?,?)`,
    goods_order4:`insert into orders(order_nickname,order_phone,order_taker,order_taker_phone,order_taker_zipcode,order_taker_address1,order_taker_address2,order_taker_memo,order_goods_price,order_member_number)values(?,?,?,?,?,?,?,?,?,?)`,
    order_image : `select goods_image,goods_name,goods_price,goods_quantity from goods where goods_id=?`,
    order_basket_image:`select * from basket`,
    order_basket_price:`SELECT SUM(BASKET_GOODS_PRICE*BASKET_GOODS_COUNT) AS basket_goods_price FROM basket where member_number=?;`,
    get_member_list:`select * from member where member_email=?`,
    goods_quantity:`update goods set goods_quantity=? where goods_id=? `,
    order_price_get:`SELECT order_goods_price 
    FROM orders 
    WHERE order_number = (SELECT MAX(order_number) FROM orders)`,
    delete_basket : 'DELETE from basket where member_number=?;',
    // auth
    id_check: `SELECT * FROM member WHERE member_email = ? and member_block = 0`,
    get_member_number: `SELECT member_number FROM member WHERE member_pw = ?`,
    login: `SELECT member_pw FROM member WHERE member_email = ?`,

    //카카오 로그인
    kakaoJoin: `INSERT INTO member (member_email, member_nickname) VALUES(?,?)`,
    kakao_check: `SELECT * FROM member WHERE member_email = ?`,

    //아이디 비번 찾기
    id_find: `SELECT member_email FROM member WHERE member_phone = ?`,
    member_check: `SELECT member_number FROM member WHERE member_phone = ? AND member_email = ?`,
    pass_update_tem: `UPDATE member SET member_pw = ? WHERE member_email = ?`,

    //회원가입
    join: `insert into member( member_nickname, member_jumin, member_email, member_pw,
           member_phone, member_zipcode, member_address1, member_address2) values(?,?,?,?,?,?,?,?)`,
    taste: `INSERT INTO TASTE(TASTE_KIND, TASTE_SOUR, TASTE_SPARK, TASTE_DEGREE, TASTE_SWEET) VALUES (?,?,?,?,?)`,

    //공지
    notice:  `INSERT INTO NEWS(NEWS_WRITER, NEWS_TITLE, NEWS_CONTENT) VALUES(?,?,?)`,
    noticecnt: `SELECT COUNT(*) FROM NEWS;`,
    noticelist: `SELECT * FROM NEWS;`,
    noticecontent: `SELECT * FROM NEWS WHERE NEWS_NUMBER = ?;`,
    noticeEdit: `UPDATE NEWS SET NEWS_CONTENT = ?, NEWS_TITLE = ? WHERE NEWS_NUMBER = ?;`,
    deleteNotice: `DELETE FROM NEWS WHERE NEWS_NUMBER = ?`,

    // admin 기능 
    admin_check: `SELECT MEMBER_TYPE FROM MEMBER WHERE MEMBER_NUMBER = ?`,
    
    //회원관리기능
    memberlist: `SELECT * FROM MEMBER;`,
    updateblock: `UPDATE MEMBER SET MEMBER_BLOCK = ? WHERE MEMBER_NUMBER = ?;`,
    updatename: `UPDATE MEMBER SET MEMBER_NICKNAME = ? WHERE MEMBER_NUMBER = ?;`,
    //관리자 상품 문의 기능
    goods_qnalist: `SELECT * FROM GOODS_QUESTION;`,
    goods_qna_content: `SELECT * FROM GOODS_QUESTION WHERE QUESTION_NUMBER = ?;`,
    goods_qna_answer: `UPDATE GOODS_QUESTION SET QUESTION_ANSWER = ? ,QUESTION_STATUS=? WHERE QUESTION_NUMBER = ?`,
    //관리자1대1문의
    inquiry_answer: `UPDATE INQUIRY SET INQUIRY_ANSWER = ? WHERE INQUIRY_NUMBER = ?`,
    qnalist: `SELECT * FROM INQUIRY;`,
    qnacontent: `SELECT * FROM INQUIRY WHERE INQUIRY_NUMBER = ?;`,
    
    
    
    //제고관리기능
    update_goods_no:`SELECT goods_id FROM goods WHERE goods_name = ?`,
    update_image:`UPDATE GOODS SET goods_image = ?, goods_image_detail = ? WHERE goods_id = ?`,
    update_delete_goods:`DELETE FROM GOODS WHERE GOODS_name = ?`,
    updategoods:`UPDATE goods SET goods_name=?, goods_price=? ,goods_sweet=?,goods_spark=?,goods_sour=?,goods_degree=?,goods_kind=?,goods_stock=?
    where goods_id=?;`,
    goodscontent:`select * from goods where goods_id=?;`,
    goods_delete : `delete from goods where goods_id=?`,
    //상품상세페이지 회원상품문의
    goodsinquiry:`SELECT * FROM GOODS_QUESTION where goods_question_id=?;`,
    questioninsert : `insert into goods_question (question_title,question_content,question_image,question_status,question_member_email,goods_question_id) values(?,?,?,?,?,?)`,
    
    //주문관리 기능
    order_list: `SELECT * FROM ORDERS;`,
    
    get_question_answer:`select question_answer from goods_question where question_title=?`,

    //장바구니 기능
    basket_dupl: `SELECT * FROM basket where member_number = ? AND basket_goods_name = ?`,
    basket_insert: `INSERT INTO basket (member_number, basket_goods_price, basket_goods_count, basket_goods_name, basket_goods_image) VALUE (?, ?, ?, ?, ?)`,
    basket_delete: `DELETE FROM basket WHERE basket_number = ?`,
    get_basket_goods_list: `SELECT * FROM basket WHERE member_number = ?`,
    goods_list2 : `select goods_id, goods_stock from goods where goods_name=?`,
    

    

    //주문관리 기능
    order_list: `SELECT * FROM ORDERS`,
     //마이페이지 기능

     get_member_info: `SELECT MEMBER_NICKNAME, MEMBER_EMAIL, MEMBER_PW, MEMBER_PHONE, MEMBER_ZIPCODE, MEMBER_ADDRESS1, MEMBER_ADDRESS2 FROM MEMBER WHERE MEMBER_NUMBER = ?`,
     mypage_update: `UPDATE MEMBER SET MEMBER_PHONE =?, MEMBER_PW =?, MEMBER_ZIPCODE = ?, MEMBER_ADDRESS1 =?, MEMBER_ADDRESS2 =? WHERE MEMBER_NUMBER = ?`,
     mypage_withdrawal: `UPDATE MEMBER SET MEMBER_BLOCK = 1, WHERE MEMBER_NUMBER = ?;`,
     member_info: `SELECT MEMBER_NICKNAME, MEMBER_EMAIL, MEMBER_PW, MEMBER_PHONE,  MEMBER_ZIPCODE, MEMBER_ADDRESS1, MEMBER_ADDRESS2 FROM MEMBER WHERE MEMBER_NUMBER = ?`,
 
 
 //회원탈퇴는 member_block이 1이 되어야하는데
 
     mypage_order_list: `SELECT * FROM ORDERS`, 
     order_cnt: `SELECT COUNT(*) FROM ORDERS`,
     review_list: `SELECT * FROM GOODS_REVIEW`,
     review_cnt: `SELECT COUNT(*) FROM GOODS_REVIEW`,
     get_my_review: `SELECT * FROM goods_review JOIN MEMBER WHERE MEMBER.MEMBER_NUMBER = ? AND goods_review.REVIEW_MEMBER_NUMBER = ?;`,
     wish_list: `SELECT * FROM WISH`,
     inquiry_list: `SELECT * FROM INQUIRY `,
     inquiry_cnt: `SELECT COUNT(*) FROM INQUIRY`,   
     question_list: `SELECT * FROM GOODS_QUESTION`,
     question_cnt: `SELECT COUNT(*) FROM GOODS_QUESTION`,
     check_review: `UPDATE ORDERS SET REVIEW_CHECK = 1`, 
     refund_list: `SELECT * FROM ORDERS`,
     refund_cnt: `SELECT COUNT(*) FROM ORDERS`,
     review_write: `insert into goods_review (review_content,review_member_email, review_score,review_title,review_check) values (?,?,?,?,?) `,
     update_review_image:`UPDATE goods_review SET review_image = ? where review_number=?`,
     update_review_delete_goods : `DELETE FROM goods_review WHERE review_goods_id = ?`,
     update_review_goods_no :`SELECT review_number FROM goods_review WHERE review_member_email= ?`,
    //  get_review_content:`insert into goods_review (review_title,review_member_email,review_score,reveiw_content,review_image)values (?,?,?,?,?)`,
     //위시리스트인듯? 
     get_wishlist: `SELECT w.*, g.GOODS_NAME, g.GOODS_PRICE, g.GOODS_IMAGE FROM wish w JOIN goods g ON w.wish_goods_name = g.goods_name WHERE w.wish_member_number = ?`,                                                                                                                  
     wish_dupl: `SELECT * FROM wish where wish_member_number = ? AND wish_goods_name = ?`,
     wishlist_insert: `INSERT INTO wish (wish_member_number, wish_goods_name) VALUE (?, ?)`,
     delete_wishlist: `DELETE FROM wish WHERE wish_number = ?`,

     mypage_qnawrite: `INSERT INTO INQUIRY(INQUIRY_CATEGORY, INQUIRY_MEMBER_EMAIL,
        INQUIRY_TITLE, INQUIRY_CONTENT, INQUIRY_IMAGE) VALUES(?,?,?,?,?)`,


        //1대1문의 
        set_inquiry_answer: `UPDATE INQUIRY SET INQUIRY_ANSWER = ? WHERE INQUIRY_NUMBER = ?`,
        get_inquiry_answer: `SELECT INQUIRY_ANSWER FROM INQUIRY WHERE INQUIRY_NUMBER = ? AND INQUIRY_MEMBER_NUMBER = ?`,
        qna_content: `SELECT * FROM INQUIRY where INQUIRY_NUMBER=?`,
        qna_edit: `UPDATE INQUIRY SET INQUIRY_CONTENT = ?, INQUIRY_TITLE = ? WHERE INQUIRY_NUMBER = ?`,
    delete_qna:`DELETE FROM INQUIRY WHERE INQUIRY_NUMBER = ?`,
    goods_qna_content :`SELECT * FROM goods_question where QUESTION_NUMBER=?`,
   
   
   
    }
