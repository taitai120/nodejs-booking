import express from "express";
import {
    createHotel,
    updateHotel,
    getHotel,
    getHotels,
    deleteHotel,
} from "../controllers/hotelController.js";

const router = express.Router();

router.route("/").get(getHotels).post(createHotel);
router.route("/:id").get(getHotel).put(updateHotel).delete(deleteHotel);

export default router;
