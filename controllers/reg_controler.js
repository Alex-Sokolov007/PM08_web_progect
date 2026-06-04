import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Reg_controler{
    async get1(req, res){
        res.render("reg")
    }
    async new_user(req, res){
        d_b.addUser(req.body.user_name, req.body.user_sure_name, req.body.user_otch,req.body.email,req.body.phone,req.body.login,req.body.password,1)
        // console.log(await d_b.get_data())
        
        res.render("reg")
    }
}

export default new Reg_controler