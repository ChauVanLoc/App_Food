const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../configs/responve");

const prisma = new PrismaClient();

module.exports = {
  like: async (req, res) => {
    const { res_id, user_id } = req.body;
    try {
      const like = await prisma.like_res.findUnique({
        where: {
          user_id_res_id: {
            res_id,
            user_id,
          },
        },
      });
      if (like) {
        failCode(res, "Bạn đã like nhà hàng này rồi!");
        return;
      }
      let newLike = await prisma.like_res.create({
        data: {
          res_id,
          user_id,
          date_like: new Date(),
        },
      });
      newLike
        ? successCode(res, newLike, "Like thành công!", 201)
        : failCode(res, "Like thất bại!");
    } catch (error) {
      errorCode(res, error);
    }
  },
  unLike: async (req, res) => {
    const { res_id, user_id } = req.body;
    try {
      const like = await prisma.like_res.findUnique({
        where: {
          user_id_res_id: {
            res_id,
            user_id,
          },
        },
      });
      like
        ? (await prisma.like_res.delete({
            where: {
              user_id_res_id: {
                res_id,
                user_id,
              },
            },
          }))
          ? successCode(res, {}, "Unlike thành công!")
          : failCode(res, "Unlike thất bại!")
        : errorCode(res, {}, "Không tìm thấy khách hàng hoặc nhà hàng", 404);
    } catch (error) {
      errorCode(res, error);
    }
  },
  getLikeByRes: async (req, res) => {
    const { idRes } = req.params;
    try {
      const listLike = await prisma.like_res.findMany({
        where: {
          res_id: Number(idRes),
        },
        include: {
          user: true,
          restaurant: true,
        },
      });
      listLike.length > 0
        ? successCode(res, listLike, "Lấy danh sách like User thành công")
        : errorCode(res, {}, "Không tìm thấy danh sách like", 404);
    } catch (error) {
      errorSql(res, error);
    }
  },
  getLikeByUser: async (req, res) => {
    const { idUser } = req.params;
    try {
      const listLike = await prisma.like_res.findMany({
        where: {
          user_id: Number(idUser),
        },
        include: {
          restaurant: true,
          user: true,
        },
      });
      listLike.length > 0
        ? successCode(
            res,
            listLike,
            "Lấy danh sách like Restaurant thành công",
            200
          )
        : failCode(res, "Không tìm thấy danh sách like", 404);
    } catch (error) {
      errorCode(res, error);
    }
  },
};
