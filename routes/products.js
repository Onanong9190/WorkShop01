const express = require("express");
const router = express.Router();
const productModel = require("../models/product.models");
const shortid = require("shortid");


//* createProduct
router.post("/", async function (req, res, next) {
  try {
    const { product_id, product_name, product_price, product_amount } = req.body;
    let body = req.body;

    let new_product = new productModel({
      product_name: body.product_name,
      product_price: body.product_price,
      product_amount: body.product_amount,
    });
    let product = await new_product.save();

    return res.status(201).send({
      data: product,
      message: "Add Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});


//! findAllProduct
router.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(200).send({
      data: products,
      message: "Get All Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});


//! findOneByIdProduct
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let product = await productModel.findById(id);

    return res.status(200).send({
      data: product,
      message: "Get Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});


//! updateOneByIdProduct
router.put("/:id", async (req, res) => {
  //   res.send("Hello from PUT products");
  try {
    let id = req.params.id;
    let body = req.body;

    await productModel.updateOne(
      { _id: id },
      {
        $set: {
          product_name: body.product_name,
          product_price: body.product_price,
          product_amount: body.product_amount,
        },
      }
    );

    let product = await productModel.findById(id);

    return res.status(200).send({
      data: product,
      message: "Edit Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

//! deleteOneById
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        await productModel.deleteOne({_id: id});

        let products = await productModel.find();

        return res.status(200).send({
            data: products,
            message: "Deleted Product Success",
            success: true,
        });
    } catch (err) {
        res.status(err.status || 500).send({
            message: err.message,
        });
    }
});

//! <--------------------------------Start------------------------------------->

//* createProduct **
router.post("/create_product", async (req, res) => {
  try {
    let body = req.body;
    let new_product = new productModel({
      _id: shortid(),
      product_id: body.product_id,
      product_name: body.product_name,
      product_price: body.product_price,
      product_amount: body.product_amount,
    });
    let product = await new_product.save();

    return res.status(201).send({
      data: product,
      message: "Add Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

//? findAllProduct **
router.get("/", async (req, res) => {
  try {
    let products = await productModel.find();
    return res.status(200).send({
      data: products,
      message: "Get All Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});


//? findOneByIdProduct **
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let product = await productModel.findById(id);

    return res.status(200).send({
      data: product,
      message: "Get Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});


//* updateOneByIdProduct **
router.put("/:id", async (req, res) => {
  //   res.send("Hello from PUT products");
  try {
    let id = req.params.id;
    let body = req.body;

    await productModel.updateOne(
      { _id: id },
      {
        $set: {
          product_name: body.product_name,
          product_price: body.product_price,
          product_amount: body.product_amount,
        },
      }
    );

    let product = await productModel.findById(id);

    return res.status(200).send({
      data: product,
      message: "Update Product Success",
      success: true,
    });
  } catch (err) {
    res.status(err.status || 500).send({
      message: err.message,
    });
  }
});

//! deleteOneById **
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;

        await productModel.deleteOne({_id: id});

        let products = await productModel.find();

        return res.status(200).send({
            data: products,
            message: "Deleted Product Success",
            success: true,
        });
    } catch (err) {
        res.status(err.status || 500).send({
            message: err.message,
        });
    }
});

//! <--------------------------------End------------------------------------->

module.exports = router;
