const { Router } = require("express");
const {
  getLikeByRes,
  getLikeByUser,
  like,
  unLike,
} = require("../controllers/like.controller");

const likeRouter = Router();

likeRouter
  // like nhà hàng
  .post("/like", like)

  // unlike nhà hàng
  .delete("/like", unLike)

  // lấy danh sách like theo user
  .get("/like/user/:idUser", getLikeByUser)

  // lấy danh sách like theo nhà hàng
  .get("/like/res/:idRes", getLikeByRes);

module.exports = likeRouter;
