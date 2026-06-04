import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class User_profile_controler{
    async get1(req, res){
        const db_data = await d_b.get_data("Users", 'id_user', req.params.id)
        res.render('user_profile', db_data[0])
    }
    async post(req, res){
        // this.update
    }
    async update(req, res){
        const db_data = await d_b.get_data("Users", 'id_user', req.params.id)
        res.render('user_profile', db_data[0])
    }
}

export default new User_profile_controler