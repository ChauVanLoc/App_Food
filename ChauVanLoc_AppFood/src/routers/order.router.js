const { addOrder } = require("../controllers/order.controller");
const { Router } = require("express");

const orderRouter = Router();

orderRouter.post("/order", addOrder);

module.exports = orderRouter;
