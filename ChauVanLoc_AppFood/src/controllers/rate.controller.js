const { PrismaClient } = require("@prisma/client");
const { failCode, successCode, errorCode } = require("../configs/responve");

const prisma = new PrismaClient();

module.exports = {
  addRate: async (req, res) => {
    const { user_id, res_id, amount } = req.body;
    try {
      const rate = await prisma.rate_res.findUnique({
        where: {
          user_id_res_id: {
            res_id,
            user_id,
          },
        },
      });
      if (rate) {
        failCode(res, "Đã tồn tại rate");
        return;
      }
      const newRate = await prisma.rate_res.create({
        data: {
          res_id,
          user_id,
          amount,
          date_rate: new Date(),
        },
        include: {
          restaurant: true,
          user: true,
        },
      });
      newRate
        ? successCode(res, newRate, "Thêm rate thành công", 201)
        : failCode(res, "Thêm rate không thành công");
    } catch (error) {
      errorCode(res, error);
    }
  },
  getRateByRes: async (req, res) => {
    const { idRes } = req.params;
    try {
      const rates = await prisma.rate_res.findMany({
        where: {
          res_id: Number(idRes),
        },
        include: {
          restaurant: true,
          user: true,
        },
      });
      rates.length > 0
        ? successCode(
            res,
            rates,
            "Lấy danh sách rating của nhà hàng thành công"
          )
        : failCode(res, "Không tìm thấy danh sách rating của nhà hàng", 404);
    } catch (error) {
      errorCode(res, error);
    }
  },
  getRateByUser: async (req, res) => {
    const { idUser } = req.params;
    try {
      const rates = await prisma.rate_res.findMany({
        where: {
          user_id: Number(idUser),
        },
        include: {
          restaurant: true,
          user: true,
        },
      });
      rates.length > 0
        ? successCode(res, rates, "Lấy danh sách rating theo User thành công")
        : failCode(res, "Không tìm thấy danh sách rating của User", 404);
    } catch (error) {
      errorCode(res, error);
    }
  },
};
