var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  try {
    let query = req.query;
    if (query.name == undefined)
      throw { message: "กรุณาระบุชื่อ", status: 400 };

    console.log(query);
    res.status(200).send({
      data: query,
      message: "Hello from GET",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

router.get("/senId/:id", function (req, res, next) {
  let params = req.params;
  console.log(params);
  res.send(params);
});

router.post("/", function (req, res, next) {
  let body = req.body;
  console.log(body);
  res.send(body);
});

router.put("/", function (req, res, next) {
  let body = req.body;
  console.log(body);
  res.send(body);
});

router.delete("/", function (req, res, next) {
  res.send("Hello from DELETE");
});

module.exports = router;
