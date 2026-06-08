import { Router } from "express";
import { app } from "../config/config.js";
import Kurier_controler from "../controllers/Kurier_controler.js";

const Kurier_router = new Router()

Kurier_router.get("/Kurier/:id", Kurier_controler.render_page)
// Kurier_router.post("/user_profile/:id", User_profile_controler.post)
Kurier_router.post("/Kurier/:id", Kurier_controler.update_order_info)



export default Kurier_router