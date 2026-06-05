import { Router } from "express";
import Login_controler from "../controllers/login_controler.js"

const login_router = new Router()

login_router.get("/login", Login_controler.rendering_page)
login_router.post("/login", Login_controler.logining_user)


export default login_router