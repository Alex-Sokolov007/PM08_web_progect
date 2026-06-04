import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Reg_controler{
    async get1(req, res){
        res.render("reg")
    }
    async new_user(req, res){
        d_b.add_user(req.body.user_name, req.body.user_sure_name, 4,req.body.login,req.body.password,req.body.phone)

        res.render("reg")
    }
}

export default new Reg_controler