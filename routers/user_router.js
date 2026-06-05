import { Router } from "express";
import {register, login, passwordSwap, editUser} from "../controllers/user.js"
const user_router = new Router()

user_router.get("/registration", Reg_controler.get1)
user_router.post("/registration", Reg_controler.new_user)


export default user_router