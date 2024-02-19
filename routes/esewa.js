var express = require("express");
const { handleEsewaSuccess } = require("../controllers/esewaController");
const { updateOrderAfterPayment } = require("../controllers/orderController");
var router = express.Router();

router.get("/success", handleEsewaSuccess, updateOrderAfterPayment);

module.exports = router;