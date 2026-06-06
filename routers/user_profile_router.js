import { Router } from "express";
import User_profile_controler from '../controllers/user_profile_controler.js'
import { app } from "../config/config.js";

const user_profile_router = new Router()

user_profile_router.get("/user_profile/:id", User_profile_controler.Chek_user_profile)
// user_profile_router.post("/user_profile/:id", User_profile_controler.post)
user_profile_router.post("/user_profile/:id", User_profile_controler.update_info)



export default user_profile_router