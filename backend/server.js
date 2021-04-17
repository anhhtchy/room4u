// load config variables from .env file
require("dotenv").config();

// init express app
let express = require("express");
app = express();

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
