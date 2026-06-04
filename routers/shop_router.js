import { Router } from "express";
import shop_kontroler from "../controllers/shop_kontroler.js";

const shop_router = new Router()

// shop_router.post("/", Shop_controler.post1)

shop_router.get("/shop/:id", shop_kontroler.rendering_page)
// shop_router.post("/", Shop_controler.post1)
// shop_router.put("/", Shop_controler.put)

export default shop_router