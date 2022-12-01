const express = require("express");
const router = express.Router();
const Users = require("../Schemas/Users");


//==================================
//
//            게시글 작성
//
//==================================
router.post("/user", async (req, res) => {
    //예상할 수 없는 err는 try catch로 잡아줌
    try {
      const { name, ID, pw } = req.body;
  
      // DB 등록되는 입력값
      await Users.create({ name, ID, pw });
      return res.status(200).json({ message: "회원 가입 완료" });
      
    } catch (error) {
      console.error("Catch 에러 발생!!");
      return res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
  });


//==================================
//
//            게시글 조회
//       postman 구현 확인 완료
//
//==================================
// 게시글 조회 라우터 만들기
router.get("/user", async (req, res) => {
    try {
      // 모든 post를 불러옴
      // sort 이용해 내림차순 정렬
      const user = await Users.find({});
  
      // map 함수를 통해 원하는 정보만 가져옴
      const result = user.map((users) => {
        return {
          userId: users._id,
          name: users.name,
          ID: users.ID,
          pw: users.pw,
        };
      });
  
      // 리스폰으로 데이터를 불러옴.
      // 데이터는 위에 지정해준 값
      return res.json({ result });
    } catch (error) {
      console.error("Catch 에러 발생!!");
      return res.status(400).json({ msg: "회원 목록 조회 실패." });
    }
  });

//==================================
//
//            게시글 상세
//       postman 구현 확인 완료
//      err일 경우의 수를 어떻게 정의해야할 지 잘 모르겠음.
//
//==================================
// 게시글 상세 라우터 만들기
router.get("/user/:_userId", async (req, res) => {
    try {
      // params를 통해 id 값을 가져옴
      let {_userId} = req.params;
        
      // 상세 페이지이기 때문에 한가지 정보만 가져오기
      const user = await Users.findOne({_id : _userId});
      console.log(user)
      //id에 맞는 정보가 없을 경우
      if (user == null || user.length === 0) {
        return res.status(400).json({ msg: "회원 상세 조회 실패." });
      }
  
      // 원하는 정보만 찍어주기
      const result = {
        userId: user._id,
        name: user.name,
        ID: user.ID,
        pw: user.pw,
      };
      res.status(200).json( {result : result} )
    } catch (error) {
      return res.status(400).json({ msg: "회원 상세 조회 실패." });
    }
  });



module.exports = router;