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

exports.getAllPosts = (req, res, next) =>{
  db.posts.findAll()
  .then((data) =>{
    res.json(data);
  })
  .catch(err =>{
    res.status(500).send({
      status:0,
      message:
        err.message || "Error happens when trying to retrieve posts"
    });
  });
}

exports.getPostsByUserId = (req, res, next) =>{
  let userId = req.params.id;
  db.posts.findAll({
    where:{userid: userId}
  })
  .then((data) =>{
      res.json(data);
  })
  .catch((err) =>{
    res.status(500).send({
      status:0,
      message:
        err.message || "Error happen when trying to get post from user ${userId}"
    });
  });
}

exports.createPost = (req, res, next) =>{
  const postFile = {
    userid: req.params.id,
    title:  req.body.title,
    estatetype: req.body.estatetype,
    address : req.body.address,
    ward : req.body.ward,
    district: req.body.district,
    city: req.body.city,
    area: req.body.area,
    price: req.body.price,
    description: req.body.description,
    roomnum : req.body.roomnum,
    restroom: req.body.restroom,
    electricity: req.body.electricity,
    water:  req.body.water,
    wifi: req.body.wifi,
    ultility: req.body.ultility,
    rented: req.body.rented,
    created:  Date.now(),
    updated:  Date.now(),
    expired: req.body.expired
  }
  db.posts.create(postFile)
  .then(data =>{
    res.status(200).send('Successfully create post');
  })
  .catch(err =>{
    res.status(500).send({
      status:0,
      message:
        err.message|| "Error when add posts"
    });
  });
}

exports.updatePost = (req, res, next) =>{
  const updatePost = {
    title: req.body.title,
    estatetype: req.body.estatetype,
    address: req.body.address,
    ward: req.body.ward,
    district: req.body.district,
    city: req.body.city,
    area: req.body.area,
    price: req.body.price,
    description: req.body.description,
    roomnum: req.body.roomnum,
    restroom: req.body.restroom,
    electricity: req.body.electricity,
    water: req.body.water,
    wifi: req.body.wifi,
    ultility: req.body.ultility,
    rented: req.body.rented,
    updated: Date.now(),
    expired: req.body.expired
  }
  db.posts.update(updatePost, 
    {where:{
      postid: req.body.postid
    }
  })
  .then(data =>{
    res.status(200).send({
      message: "Ok updated!"
    });
  })
  .catch(err =>{
    res.status(500).send({
      status: 0,
      message: err.message || "Error when update post with id ${req.body.postid}"
    })
  })
}

exports.deletePost = (req, res,next) =>{
  db.posts.destroy({
    where: {postid: req.params.pid}
  })
  .then(data =>{
    res.status(200).send({
      message: "Deleted post with id ${req.params.pid}"
    });
  })
  .catch(err =>{
    res.status(500).send({
      status : 0 ,
      message: err.message || "Cannot delete that post!"
    })
  })
}

exports.deleteAllPostByUserId = (req, res, next) =>{
  db.posts.destroy({
    where: { userid: req.params.id }
  })
    .then(data => {
      res.status(200).send({
        message: "Deleted post with id all post of user with id" + req.params.id
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message: err.message || "Cannot delete all posts!"
      })
    })
}
