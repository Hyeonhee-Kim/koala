//미들웨어
const express =require ('express');
const cors =require('cors');
const app = express();

app.use(cors({
  origin : 'http://localhost:8080',
  credentials : true,
}));

// 상품관련 라우터
const goodsRouter = require('./routes/goods.js');
app.use(express.json());
app.use(express.urlencoded({ extended : true}));
app.use('/goods', goodsRouter);

app.use(express.urlencoded({ extended: true }));
// authenticate 관련 라우터
const authRouter = require('./routes/auth.js');
app.use('/auth', authRouter);

// admin 관련 라우터
const adminRouter  = require('./routes/admin.js');
app.use('/admin',adminRouter);
//qna 관련 라우터
const qnaRouter  = require('./routes/qna.js');
app.use('/qna',qnaRouter);
// mypage 관련 라우터
const mypageRouter  = require('./routes/mypage.js');
app.use('/mypage',mypageRouter);



app.listen(3000, function() {
  console.log('Server Running at http://localhost:3000');
});

