var express = require("express");
const {
    createOrder,
    getAllOrders,
} = require("../controllers/orderController");
var router = express.Router();

router.get("/", getAllOrders);
router.post("/create", createOrder);

module.exports = router;