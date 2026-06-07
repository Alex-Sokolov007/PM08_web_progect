import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import HASH_FUNCTION from "../config/hash.js"

class Login_controler{
    async rendering_page(req, res){
        res.render("login", {quantity: 0})
    }
    async logining_user(req, res){
        const user = await d_b.get_data("Users", "Login", req.body.login)
        if(user.length == 0){
            res.render("login", {quantity: 1})
        }else{
        if(await HASH_FUNCTION.verifyPassword(req.body.password,user[0].Password)){
            if(user[0].Role == 1){
                res.redirect("/admin", user[0])
            }
        const Shops = await d_b.get_data("Shop_point")
        const data = {
            len: Shops.length,
            id: [],
            title: [],
            img: []
        }
        for(let i=0; i<Shops.length; i++){
            data.title.push(Shops[i].Title)
            data.img.push(Shops[i].Img)
            data.id.push(Shops[i].Id)
        }
        res.redirect(`/?user=${user[0].Id}&role=${user[0].Role}`);
        // res.render(`index`, data)
        }
    }
    }
}

export default new Login_controler