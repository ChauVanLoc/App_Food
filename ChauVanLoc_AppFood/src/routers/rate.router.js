const {
  addRate,
  getRateByRes,
  getRateByUser,
} = require("../controllers/rate.controller");
const { Router } = require("express");

const rateRouter = Router();

rateRouter
  // Thêm đánh giá nhà hàng
  .post("/rate", addRate)

  // Lấy danh sách đánh giá theo user
  .get("/rate/user/:idUser", getRateByUser)

  // lấy danh sách đánh giá theo nhà hàng
  .get("/rate/res/:idRes", getRateByRes);

module.exports = rateRouter;
