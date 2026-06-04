import { Router } from "express";
import Login_controler from "../controllers/login_controler.js"

const login_router = new Router()

login_router.get("/login", Login_controler.get1)


export default login_router