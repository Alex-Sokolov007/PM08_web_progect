import { Router } from "express";
import Item_controler from "../controllers/item_controlers.js";

const item_router = new Router()

item_router.get("/item/:id", Item_controler.get1)

export default item_router