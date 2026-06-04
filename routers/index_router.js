import { Router } from "express";
import Index_controler from "../controllers/index_controlers.js";

const test_router = new Router()

// test_router.post("/", Index_controler.post1)

test_router.get("/", Index_controler.rendering_page)
test_router.post("/", Index_controler.post1)
test_router.put("/", Index_controler.put)

export default test_router