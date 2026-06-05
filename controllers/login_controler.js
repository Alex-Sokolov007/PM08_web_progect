import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Login_controler{
    async get1(req, res){
        res.render("login")
    }
}

export default new Login_controler