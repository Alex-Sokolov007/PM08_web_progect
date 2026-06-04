import { Router } from "express";
import Basket_controler from "../controllers/basket_controlers.js";

const basket_router = new Router()

basket_router.get("/basket/:id", Basket_controler.render_page_busket)
basket_router.post("/basket/:id", Basket_controler.new_product_in_busket)
basket_router.delete("/basket/:id", Basket_controler.delete_item_busket)


export default basket_router