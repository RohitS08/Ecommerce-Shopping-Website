const express =  require('express');
const paymentRouter = express.Router();
const instance = require('./../config/razorpay');
const crypto = require('crypto');
const PAYMENT = require('./../models/Payment');

paymentRouter.post("/checkout", async(req, res)=>{
  console.log("$$$");
  const options = {
    amount: Number(req.body.amount * 82),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
console.log(order);
  res.status(200).json({
    success: true,
    order
  });
})

paymentRouter.post("/paymentverification", async(req, res)=>{
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await PAYMENT.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `/payment?status=succes&reference=${razorpay_payment_id}`
    );
  } else {
    res.redirect(
      `/payment?status=Failed&reference=${razorpay_payment_id}`
    );/*
    res.status(400).json({
      success: false,
    });*/
  }
})
paymentRouter.post('/test',(req,res)=>{
  console.log("hii");
  res.status(200).json({bame:"aa"});
})
module.exports = paymentRouter;