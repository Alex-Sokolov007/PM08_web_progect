import { Router } from "express";
import Basket_controler from "../controllers/basket_controlers.js";

const basket_router = new Router()

basket_router.get("/basket/:id", Basket_controler.render_page_busket)
// basket_router.post("/basket/:id", Basket_controler.new_product_in_busket)
basket_router.post("/basket/:id", Basket_controler.post_rederect)


export default basket_router