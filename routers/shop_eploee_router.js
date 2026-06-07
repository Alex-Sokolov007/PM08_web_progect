import { Router } from "express";
import shop_empoee_controler from "../controllers/shop_empoee_controler.js";
import { app } from "../config/config.js";

const shop_emploee_router = new Router()

shop_emploee_router.get("/Shop_imploee/:id", shop_empoee_controler.render_emploee_window)
// shop_emploee_router.post("/user_profile/:id", User_profile_controler.post)
// shop_emploee_router.post("/user_profile/:id", User_profile_controler.update_info)



export default shop_emploee_router