import { Router } from "express";
import admin_controler from "../controllers/admin_controler.js";

const admin_router = new Router()

// admin_router.post("/", Index_controler.post1)

admin_router.get("/admin", admin_controler.rendering_page)
// admin_router.post("/", Index_controler.post1)
// admin_router.put("/", Index_controler.put)

export default admin_router