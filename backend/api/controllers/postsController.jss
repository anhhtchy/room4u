const db = require("../models");
const { Op } = require("sequelize");
const e = require("express");

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
    } else {
      minArea = 100;
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
    //district = req.body.district.split(" ").join("").split(",");
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

  // if (req.body.estatetype !== "") {
  //   estatetype = req.body.estatetype
  //     .split(" ")
  //     .join("")
  //     .split(",")
  //     .map((value) => Number(value));
  //   //console.log(typeof estatetype);
  // } else {
  //   estatetype = [0, 1, 2, 3];
  // }

  db.posts
    .findAll({
      where: {
        //estatetype: estatetype,
        district: district,
        price: { [Op.between]: [minPrice, maxPrice] },
        area: { [Op.between]: [minArea, maxArea] },
      },
    })
    .then((data) => {
      //console.log(len(data));
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some errors occur while searching posts",
      });
    });
};

exports.getAllPosts = (req, res, next) => {
  db.posts
    .findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
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
    })
    .then((data) => {
      ids = []
      for(var i = 0; i < data.length; i++)
      {
        ids.push(data[i].postid);
      }
      db.images.findAll({
        where:{
          postid:ids
        }
      }).then(image_data=>{
        res.json({data,image_data});
      })
    })
    .catch((err) => {
      res.status(500).send({
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
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
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
            created: Date.now()
          }
          db.images.create(image).then((result) => {data.images.push(result)});
        }
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error when add posts",
      });
    });
};


exports.updatePost = (req, res, next) => {
  file = req.files
  res.send(file)
  // const updatePost = {
  //   title: req.body.title,
  //   estatetype: req.body.estatetype,
  //   address: req.body.address,
  //   ward: req.body.ward,
  //   district: req.body.district,
  //   city: req.body.city,
  //   area: req.body.area,
  //   price: req.body.price,
  //   description: req.body.description,
  //   roomnum: req.body.roomnum,
  //   restroom: req.body.restroom,
  //   electricity: req.body.electricity,
  //   water: req.body.water,
  //   wifi: req.body.wifi,
  //   ultility: req.body.ultility,
  //   rented: req.body.rented,
  //   updated: Date.now(),
  //   expired: req.body.expired,
  // };
  // db.posts
  //   .update(updatePost, {
  //     where: {
  //       postid: req.body.postid,
  //     },
  //   })
  //   .then((data) => {
  //     res.status(200).send({
  //       message: "Ok updated!",
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       status: 0,
  //       message:
  //         err.message || "Error when update post with id ${req.body.postid}",
  //     });
  //   });
};

exports.deletePost = async(req, res, next) => {
  try{
    const [del_imng, del_post] = await Promise.all([
      db.images.destroy({
        where:{
          postid:req.params.pid
        }}),
      db.posts.destroy({
        where:{
          postid: req.params.pid },
        })
    ])
    res.status(200).send({
      message: "Deleted post with id ${req.params.pid}",
    });
  }
  catch(err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Cannot delete that post!",
    });
  };
}

exports.deleteAllPostByUserId = (req, res, next) => {
  db.posts
    .destroy({
      where: { userid: req.params.id },
    })
    .then((data) => {
      res.status(200).send({
        message:
          "Deleted post with id all post of user with id" + req.params.id,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Cannot delete all posts!",
      });
    });
};

exports.getDistricts = (req, res, next) =>{
  db.districts.findAll({
    where:{
      cityid: '01'
    }
  }).then((data)=>{
    res.json(data);
  }).catch(err=>{
    res.status(500).send({
      message:err.message || "Cannot get disctricts"
    });
  });
}

exports.getHomePosts = async (req, res, next) => {
  try{
    const [data0,data1,data2,data3] = await Promise.all([
      db.posts.findAll({
        where:{estatetype:0},
        order:[["updated","DESC"]],
        limit:10
      }),
      db.posts.findAll({
        where: { estatetype: 1 },
        order: [["updated", "DESC"]],
        limit: 10
      }),
      db.posts.findAll({
        where: { estatetype: 2 },
        order: [["updated", "DESC"]],
        limit: 10
      }),
      db.posts.findAll({
        where: { estatetype: 3 },
        order: [["updated", "DESC"]],
        limit: 10
      })
    ]);
    var ids = [];

    // for(var i = 0; i < data0.length;i++)
    //   ids.push(data0[i].postid);

    // for (var i = 0; i < data1.length; i++)
    //   ids.push(data1[i].postid);

    // for (var i = 0; i < data2.length; i++)
    //   ids.push(data2[i].postid);

    // for (var i = 0; i < data3.length; i++)
    //   ids.push(data3[i].postid);

    var dataX = [data0,data1,data2,data3]
    for(var i = 0; i < 4; i++){
      k = Object.keys(dataX[i]).length// cái này để đếm số phần tử mỗi loại
      for(var j = 0; j <k; j++){
        ids.push(dataX[i][j].postid);
      }
    }

    db.images.findAll({
      where:{
        postid:ids
      }
    }).then(image_data=>{
      res.send({ data0, data1, data2, data3, image_data})
    }).catch(err=>{
      res.status(500).send({
        message: err.message||"Failed to get images"
      })
    });
    
  }
  catch(error){
    res.status(500).send({
      status:0,
      message:error.message || "Error when trying to get data"
    })
  }
}

exports.getHomePosts1 = async (req, res, next) => {
  try {
    const dataX= await Promise.all([
      db.posts.findAll({
        where: { estatetype: 0 },
        order: [["updated", "DESC"]],
        limit: 10
      }),
      db.posts.findAll({
        where: { estatetype: 1 },
        order: [["updated", "DESC"]],
        limit: 10
      }),
      db.posts.findAll({
        where: { estatetype: 2 },
        order: [["updated", "DESC"]],
        limit: 10
      }),
      db.posts.findAll({
        where: { estatetype: 3 },
        order: [["updated", "DESC"]],
        limit: 10
      })
    ]);
    var ids = [];
    for (var i = 0; i < 4; i++) {
      k = Object.keys(dataX[i]).length// cái này để đếm số phần tử mỗi loại
      for (var j = 0; j < k; j++) {
        ids.push(dataX[i][j].postid);
      }
    }

    db.images.findAll({
      where: {
        postid: ids
      }
    }).then(image_data => {
      const dict = convertImg(dataX,image_data);
      dataX[1][1].test = 5;
      res.send({da:dataX[1][1],di:dict["3"]})
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Failed to get images"
      })
    });

  }
  catch (error) {
    res.status(500).send({
      status: 0,
      message: error.message || "Error when trying to get data"
    })
  }
}
function convertImg(data,imgs){
  var dict = {};
  for(var i = 0; i < imgs.length;i++)
  { 
    if(dict.hasOwnProperty(String(imgs[i].postid))){
      dict[String(imgs[i].postid)].push(imgs[i].url);
    }
    else{
      dict[String(imgs[i].postid)] = [];
    }
  }
  len = Object.keys(data).length;
  for(var i = 0; i <len; i++)
  {
    l = Object.keys(data[i]).length;
    for(var j = 0; j < l; j++)
    {
      data[i][j].images = dict[String(1)]
    }
  }
  return dict;
}