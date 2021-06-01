const db = require("../models");
const { Op } = require("sequelize");
const e = require("express");
const fs = require('fs')
const { updateProfile } = require("./accountsController");

exports.postStatistic = async (req, res) => {
  try{
    let i;
    let nPosts = [];
    for(i = 0; i <= 30; i++){
      let today = new Date();
      let date = new Date(today.setDate(today.getDate()-i));
      let dateStr = date.getUTCDate() + "/" + (date.getUTCMonth()+1) + "/" + date.getUTCFullYear();
      let nPostsInDate = await db.posts.count({ 
        where: { 
          created: {
            [Op.gt]: date.setHours(0,0,0,0),
            [Op.lt]: date.setHours(23, 59, 59, 999)
          } 
        }, 
      });
      nPosts.push({
        "Date": dateStr,
        "scales" : nPostsInDate
      });
    }
    return res.json({
      status: 1,
      data: nPosts,
    });
  } catch(error) {
    return res.status(500).json({
      status: 0,
      message: error.message || "Some errors occur while finding posts",
    });
  }
};

exports.searchPost = async (req, res) => {
  let minArea, maxArea, estatetype, minPrice, maxPrice, district;
  // Các tiêu chí lọc
  if (req.body.area !== "") {
    if (req.body.area == 0) {
      minArea = 0;
      maxArea = 20;
    } else if (req.body.area == 1) {
      minArea = 20;
      maxArea = 50;
    } else if (req.body.area == 2) {
      minArea = 50;
      maxArea = 100;
    } else if (req.body.area == 3) {
      minArea = 100;
      maxArea = 200;
    } else {
      minArea = 200;
      maxArea = 10000000;
    }
  } else {
    minArea = 0;
    maxArea = 10000000;
  }

  if (req.body.minPrice !== "") {
    minPrice = req.body.minPrice;
  } else {
    minPrice = 0;
  }
  if (req.body.maxPrice !== "") {
    maxPrice = req.body.maxPrice;
  } else {
    maxPrice = 100000000;
  }

  if (req.body.district !== "") {
    // district = req.body.district.split(" ").join("").split(",");
    district = req.body.district;
  } else {
    district = await Promise.all([
      db.districts
        .findAll({
          attributes: ["districtid"],
          raw: true,
        })
        .then((results) => results.map((result) => result.districtid)),
    ]);
    district = district[0];
  }

  if (req.body.estatetype !== "") {
    estatetype = req.body.estatetype;
    // .split(" ")
    // .join("")
    // .split(",")
    // .map((value) => Number(value));
    //console.log(typeof estatetype);
  } else {
    estatetype = [0, 1, 2, 3];
  }

  db.posts
    .findAll({
      where: {
        estatetype: estatetype,
        district: district,
        price: { [Op.between]: [minPrice, maxPrice] },
        area: { [Op.between]: [minArea, maxArea] },
      },
    })
    .then((data) => {
      ids = [];
      len = Object.keys(data).length;
      for (var i = 0; i < len; i++) {
        ids.push(data[i].postid);
      }
      db.images
        .findAll({
          where: { postid: ids },
        })
        .then((image_data) => {
          const posts = convertImg1D(data, image_data);
          return res.json({ posts: posts });
        });

      //const posts = GetImgaesByPosts(data);
      //console.log(len(data));
      //res.json(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some errors occur while searching posts",
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  db.posts
    .findAll()
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).send({
        status: 0,
        message: err.message || "Error happens when trying to retrieve posts",
      });
    });
};

exports.getPostsByUserId = async (req, res, next) => {
  let userId = req.params.id;
  db.posts
    .findAll({
      where: { userid: userId },
      order: [["updated", "DESC"]],
    })
    .then((data) => {
      ids = [];
      for (var i = 0; i < data.length; i++) {
        ids.push(data[i].postid);
      }
      db.images
        .findAll({
          where: {
            postid: ids,
          },
        })
        .then((image_data) => {
          const posts = convertImg1D(data, image_data);
          return res.json({ posts });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Error happen when trying to get post from user ${userId}",
      });
    });
};

exports.createPost = (req, res, next) => {
  const postFile = {
    userid: req.params.id,
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
    created: Date.now(),
    updated: Date.now(),
    expired: req.body.expired,
  };
  db.posts
    .create(postFile)
    .then((data) => {
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        status: 0,
        message: err.message || "Error when add posts",
      });
    });
};

exports.createPostWithImages = (req, res, next) => {
  const postFile = {
    userid: req.params.id,
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
    created: Date.now(),
    updated: Date.now(),
    expired: req.body.expired,
  };
  db.posts
    .create(postFile)
    .then((data) => {
      const images = req.body.images;
      if (images != null) {
        for (var i = 0; i < images.length; i++) {
          const image = {
            postid: data.postid,
            url: images[i],
            created: Date.now(),
          };
          db.images.create(image).then((result) => {
            data.images.push(result);
          });
        }
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        status: 0,
        message: err.message || "Error when add posts",
      });
    });
};

exports.updatePost = async (req, res, next) => {
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
    expired: req.body.expired,
  };
  try {
    const [pst, image_data] = await Promise.all([
      db.posts.update(updatePost, { where: { postid: req.params.pid } }),
      db.images.findAll({
        where: {
          [Op.and]: [{ postid: req.params.pid }, { url:{[Op.notIn]:req.body.images}}],
        },}),
    ]);
    x = ('http://' + process.env.BACKEND_HOST + ":" + process.env.PORT).length;
    li = Object.keys(image_data).length;
    for(var ix = 0; ix < li; ix++){
      path = '..' + image_data[ix].url.substring(x);
      fs.unlink(path, (err) => console.log(err));
    }
    const del_img = await db.images.destroy({where:{postid:req.params.pid}});

    const images = req.body.images;
    if (images != null) {
      for (var i = 0; i < images.length; i++) {
        const image = {
          postid: req.params.pid,
          url: images[i],
          created: Date.now(),
        };
        db.images.create(image).then();
      }
    }
    return res.status(200).send({
      message: "Added successfully",
    });
  } catch (err) {
    return res.send({
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  const [comment, rate, save] = await Promise.all([
    db.comments.destroy({where:{postid:req.params.pid}}),
    db.ratings.destroy({ where: { postid: req.params.pid } }),
    db.savedPosts.destroy({ where: { postid: req.params.pid } })
  ]);
  const image_data = await db.images.findAll({where:{postid:req.params.pid}});
  l = Object.keys(image_data).length;
  x = ('http://' + process.env.BACKEND_HOST + ":" + process.env.PORT).length;
  for(var i = 0; i < l ; i++){
    path = '..' + image_data[i].url.substring(x);
    fs.unlink(path, (err) => console.log(err));
  }
  db.images.destroy({where:{postid:req.params.pid}})
  .then(data=>{
    db.posts.destroy({where:{postid:req.params.pid}})
    .then(result=>{
      return res.status(200).send({
        status:1
      })
    }).catch(err=>{
      return res.status(500).send({
        message:err.message
      })
    })
  }).catch(err=>{
    return res.status(500).send({
      message: err.message
    })
  })
};

exports.deleteAllPostByUserId = async (req, res, next) => {
  const data = await db.posts.findAll({ where: { userid: req.params.id } });
  if (data.length < 1) {
    return res.send({ messange: "no posts to delete" });
  }

  const ids = [];
  for (var i = 0; i < data.length; i++) {
    ids.push(data[i].postid);
  }
  image_data = await db.images.destroy({ where: { postid: ids } });
  x = ('http://' + process.env.BACKEND_HOST + ":" + process.env.PORT).length;
  li = Object.keys(image_data).length;
  for (var j = 0; j < li; j++) {
    path = '..' + image_data[j].url.substring(x);
    fs.unlink(path, (err) => console.log(err));
  }
  try {
    [saved_, image_, rate_, comment_] = await Promise.all([
      db.savedPosts.destroy({ where: { postid: ids } }),
      db.images.destroy({ where: { postid: ids } }),
      db.ratings.destroy({ where: { postid: ids } }),
      db.comments.destroy({ where: { postid: ids } })
    ]);
    db.posts
      .destroy({ where: { userid: req.params.id } })
      .then((result) => {
        return res.status(200).send({
          message:
            "Deleted post with id all post of user with id" + req.params.id,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: 0,
          message: err.message || "Cannot delete all posts!",
        });
      });
  } catch (err) {
    return res.send({ message: err.message });
  }
};

exports.getDistricts = (req, res, next) => {
  db.districts
    .findAll({
      where: {
        cityid: "01",
      },
    })
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Cannot get disctricts",
      });
    });
};

exports.getHomePosts = async (req, res, next) => {
  try {
    let dataX = await Promise.all([
      db.posts.findAll({
        where: { estatetype: 0 },
        order: [["updated", "DESC"]],
        //limit: 10,
      }),
      db.posts.findAll({
        where: { estatetype: 1 },
        order: [["updated", "DESC"]],
        //limit: 10,
      }),
      db.posts.findAll({
        where: { estatetype: 2 },
        order: [["updated", "DESC"]],
        //limit: 10,
      }),
      db.posts.findAll({
        where: { estatetype: 3 },
        order: [["updated", "DESC"]],
        //limit: 10,
      }),
    ]);
    var ids = [];
    for (var i = 0; i < 4; i++) {
      k = Object.keys(dataX[i]).length; // cái này để đếm số phần tử mỗi loại
      for (var j = 0; j < k; j++) {
        ids.push(dataX[i][j].postid);
      }
    }
    if (ids.length < 1) {
      return res.send({
        posts: {},
      });
    }
    db.images
      .findAll({
        where: {
          postid: ids,
        },
      })
      .then((image_data) => {
        const posts = convertImg2D(dataX, image_data);
        return res.send({ posts });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Failed to get images",
        });
      });
  } catch (error) {
    return res.status(500).send({
      status: 0,
      message: error.message || "Error when trying to get data",
    });
  }
};

/*--------------------------------------------------------------------------------------------------------------------*/
function convertImg1D(data, imgs) {
  var dict = {};
  var res_data = [];

  for (var i = 0; i < imgs.length; i++) {
    if (dict.hasOwnProperty(String(imgs[i].postid))) {
      dict[String(imgs[i].postid)].push(imgs[i].url);
    } else {
      dict[String(imgs[i].postid)] = [];
      dict[String(imgs[i].postid)].push(imgs[i].url);
    }
  }
  len = Object.keys(data).length;
  if (len < 1) {
    return {};
  }
  for (var i = 0; i < len; i++) {
    res_data[i] = {};
    res_data[i].data = data[i];
    res_data[i]["images"] = dict[String(data[i].postid)];
  }
 
  return res_data;
}

function convertImg1DSavePost(data, imgs) {
  var dict = {};
  var res_data = [];

  for (var i = 0; i < imgs.length; i++) {
    if (dict.hasOwnProperty(String(imgs[i].postid))) {
      dict[String(imgs[i].postid)].push(imgs[i].url);
    } else {
      dict[String(imgs[i].postid)] = [];
      dict[String(imgs[i].postid)].push(imgs[i].url);
    }
  }
  len = Object.keys(data).length;
  if (len < 1) {
    return {};
  }
  // Chỗ này là tạo data cho save posts
  for (var i = 0; i < len; i++) {
    res_data[i] = {};
    res_data[i].saveid = data[i].saveid;
    res_data[i].post = data[i].post;
    res_data[i]["images"] = dict[String(data[i].post.postid)];
  }

  return res_data;
}

function convertImg2D(data, imgs) {
  var dict = {};
  var res_data = [];
  for (var i = 0; i < imgs.length; i++) {
    if (dict.hasOwnProperty(String(imgs[i].postid))) {
      dict[String(imgs[i].postid)].push(imgs[i].url);
    } else {
      dict[String(imgs[i].postid)] = [];
      dict[String(imgs[i].postid)].push(imgs[i].url);
    }
  }
  len = Object.keys(data).length;
  for (var i = 0; i < len; i++) {
    l = Object.keys(data[i]).length;
    res_data[i] = [];
    for (var j = 0; j < l; j++) {
      res_data[i][j] = {};
      res_data[i][j].data = data[i][j];
      res_data[i][j]["images"] = dict[String(data[i][j].postid)];
    }
  }
  return res_data;
}
//---------------------------------------------------------------------------------------------------
// Luu bai dang
exports.savePosts = async (req, res) => {
  let newRow = {
    postid: req.body.postid,
    userid: req.body.userid,
  };
  console.log(newRow);
  const saved = await db.savedPosts.findOne({
    where: { userid: newRow.userid, postid: newRow.postid },
  });

  if (saved == null) {
    db.savedPosts
      .create(newRow)
      .then((data) => {
        return res.status(200).send({
          status: "1",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: 0,
          message: err.message || "Error when add post in user's saved list",
        });
      });
  } else {
    return res.status(200).send({
      status: "1",
      message: "Đã lưu bài đăng trước đó",
    });
  }
};

// Xem danh sách bài đăng đã lưu theo userid
exports.getSavePostsByUserid = async (req, res) => {
  await db.savedPosts
    .findAll({
      attributes: ["saveid", "userid"],
      where: { userid: req.params.userid },
      include: [db.posts],
    })
    .then((data) => {
      //console.log(len(data));
      const ids = [];
      l = Object.keys(data).length;
      if (l < 1) {
        return res.send({ posts: {} });
      }
      for (var i = 0; i < l; i++) {
        ids.push(data[i].post.postid);
      }
      db.images
        .findAll({ where: { postid: ids } })
        .then((image_data) => {
          const posts = convertImg1DSavePost(data, image_data);
          return res.send({ posts });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || "Cannot get image data",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some errors occur while searching posts",
      });
    });
};

// Xóa bài đăng đã lưu
exports.deleteSavePosts = async (req, res) => {
  await db.savedPosts
    .destroy({
      where: { postid: req.params.postid, userid: req.params.userid },
    })
    .then((data) => {
      return res.status(200).send({
        status: "1",
        message:
          "Userid " +
          req.params.userid +
          " unsaved Postid " +
          req.params.postid,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        status: 0,
        message: err.message || "Cannot delete!",
      });
    });
};

exports.getPostById = async (req, res, next) => {
  const [data, images] = await Promise.all([
    db.posts.findAll({ where: { postid: req.params.pid } }),
    db.images.findAll({ where: { postid: req.params.pid } }),
  ]);
  return res.send({
    "data": data[0],
    "images": images,
  });
};
