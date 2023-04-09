const { PrismaClient } = require("@prisma/client");
const { failCode, errorCode, successCode } = require("../configs/responve");

const prisma = new PrismaClient();

module.exports = {
  addOrder: async (req, res) => {
    try {
      const { user_id, food_id, amount, code, arr_sub_id } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          user_id,
        },
      });
      const food = await prisma.food.findUnique({
        where: {
          food_id,
        },
      });
      if (!user) {
        failCode(res, "User không tồn tại!");
        return;
      } else if (!food) {
        failCode(res, "Food không tồn tại!");
        return;
      }

      const user_food = await prisma.order.findUnique({
        where: {
          user_id_food_id: {
            food_id,
            user_id,
          },
        },
      });
      // Theo e nghĩ order thì lấy mã order làm khoác chính chứ
      // check lỗi đây thấy hơi kì kì
      // Check vi phạm khoác chínhh user_id và food_id
      if (user_food) {
        failCode(res, "Vi phạm khóa chính");
        return;
      }
      if (arr_sub_id && arr_sub_id.length > 0) {
        const arr_subfood = arr_sub_id
          .replace(/\[|\]/g, "") // xóa các ký tự '[' và ']'
          .split(",")
          .map((s) => Number(s.trim()));

        const subfood = await prisma.sub_food.findMany({
          where: {
            sub_id: {
              notIn: arr_subfood,
            },
          },
        });
        if (subfood) {
          failCode(res, "SubFood không tồn tại!");
          return;
        }
      }
      const newOrder = await prisma.order.create({
        data: {
          user_id,
          food_id,
          amount,
          code,
          arr_sub_id,
        },
        include: {
          food: true,
          user: true,
        },
      });
      newOrder
        ? successCode(res, newOrder, "Đặt hàng thành công!", 201)
        : failCode(res, "Đặt hàng không thành công!");
    } catch (error) {
      errorCode(res, error);
    }
  },
};
