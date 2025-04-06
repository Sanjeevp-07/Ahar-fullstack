import express from "express";
import { registerDeliveryPartner, loginDeliveryPartner } from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/register", registerDeliveryPartner);
router.post("/login", loginDeliveryPartner);

export default router;
