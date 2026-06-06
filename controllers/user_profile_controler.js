import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import HASH_FUNCTION from "../config/hash.js"

class User_profile_controler{
    async Chek_user_profile(req, res){
        const db_data = await d_b.get_data("Users", 'Id', req.params.id)
        if(db_data.length == 0)
            res.render('user_profile', {Id: 0})
        else
            res.render('user_profile', db_data[0])
    }
    async update_info(req, res){
        const old_password = req.body.old_password
        const user = await d_b.get_data("Users", 'Id', req.params.id)
        if(HASH_FUNCTION.verifyPassword(old_password, user[0].Password)){
            if(req.body.new_password != ''){
            const new_password = HASH_FUNCTION.hashPassword(req.body.new_password)
            d_b.update_qwery("Users", "Password", new_password, "Id", req.params.id)
            }
            d_b.update_qwery("Users", "User_name", req.body.User_name, "Id", req.params.id)
            d_b.update_qwery("Users", "User_surname", req.body.User_surname, "Id", req.params.id)
            d_b.update_qwery("Users", "Login", req.body.Login, "Id", req.params.id)
            d_b.update_qwery("Users", "Phone", req.body.Phone, "Id", req.params.id)
        }
        res.redirect(`/user_profile/${req.params.id}`)
    }
}

export default new User_profile_controler