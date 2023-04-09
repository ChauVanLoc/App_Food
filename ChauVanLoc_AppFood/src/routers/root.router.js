const { Router } = require("express");
const likeRouter = require("./like.router");
const rateRouter = require("./rate.router");
const orderRouter = require("./order.router");

const rootRouter = Router();

rootRouter.use("/api", likeRouter, orderRouter, rateRouter);

module.exports = rootRouter;
