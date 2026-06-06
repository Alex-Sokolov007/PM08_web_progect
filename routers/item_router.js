import { Router } from "express";
import Item_controler from "../controllers/item_controlers.js";

const item_router = new Router()

item_router.get("/item/:id", Item_controler.read_info_item)
item_router.post("/item/:id", Item_controler.add_prodict_in_basket)

export default item_router