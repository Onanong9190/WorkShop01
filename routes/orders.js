const express = require("express");
const router = express.Router();
const ordersModel = require("../models/order.model");
const productModel = require("../models/product.models");
const shortid = require("shortid");

//* createOrder
router.post("/create_order", async (req, res) => {
  try {
    let body = req.body;

    let total = 0;
    for (let i = 0; i < body.orderDetail.length; i++) {
      let product = body.orderDetail[i];
      let price = await productModel.findById(product.id);
      let amount = await productModel.findById(product.id);
      total += price.product_price * product.quantity;

      if (amount.product_amount < product.quantity) {
        return res.status(400).send({
          message: "Not enough product",
          success: false,
        });
      } else {
        let new_amount = amount.product_amount - product.quantity;
        let update_amount = await productModel.findByIdAndUpdate(
          product.id,
          {
            product_amount: new_amount,
          },
          { new: true }
        );
      }
      body.total_price = total;
    }

    let new_order = new ordersModel({
      orders_id: shortid(),
      username: body.username,
      orderDetail: body.orderDetail,
      total_price: body.total_price,
    });
    let order = await new_order.save();

    return res.status(201).send({
      data: order,
      message: "Add Details Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

//? findAllOrder
router.get("/", async (req, res) => {
  //   res.send("Hello from GET orders");
  try {
    let orders = await ordersModel.find();
    return res.status(200).send({
      data: orders,
      message: "Get All Order Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

//? findOneByIdOrder
router.get("/:id", async (req, res) => {
  //   res.send("Hello from GET orders");
  try {
    let id = req.params.id;

    let order = await ordersModel.findById(id);

    return res.status(200).send({
      data: order,
      message: "Get This Order Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

module.exports = router;
