const db = require("../models");
const { Op } = require("sequelize");

exports.searchPost = (req, res) => {
  let minArea = 0;
  let maxArea = 0;

  // Các tiêu chí lọc
  if (req.body.area == 0) {
    minArea = 0;
    maxArea = 20;
  } else if (req.body.area == 1) {
    minArea = 20;
    maxArea = 50;
  } else if (req.body.area == 2) {
    minArea = 50;
    maxArea = 100;
  } else {
    minArea = 100;
    maxArea = 10000000;
  }
  const data = {
    // Loai phong tro
    estatetype: req.body.estatetype,
    // Khoang gia
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    // Dien tich
    minArea: minArea,
    maxArea: maxArea,
    // quan
    ward: req.body.ward,
  };

  db.posts
    .findAll({
      where: {
        estatetype: data.estatetype,
        ward: data.ward,
        price: { [Op.between]: [data.minPrice, data.maxPrice] },
        area: { [Op.between]: [data.minArea, data.maxArea] },
      },
    })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errors occur while searching posts",
      });
    });
};
