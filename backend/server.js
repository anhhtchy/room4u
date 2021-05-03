// load config variables from .env file
// don't need to load in every files,
// only need to load in server.js, then you can use in other files
require("dotenv").config();

// init express app
let express = require("express");
app = express();

// Dòng này để khi load ảnh = địa chỉ localhost thì dùng đc nhé
app.use('/uploads', express.static('../uploads'));

port = process.env.PORT || 3001

// middleware for CORS access control
cors = require("cors");
app.use(cors());

// request body parser
app.use(
    express.urlencoded({
      extended: true,
    })
  );
app.use(express.json());

// server route
let routes = require("./api/routes/routes");
routes(app);

// return 404 not found if request url not exist
app.use(function (req, res) {
  res.status(404).send({
    url: req.originalUrl + " not found",
  });
});

// start server
app.listen(port);
