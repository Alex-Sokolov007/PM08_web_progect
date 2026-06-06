import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import HASH_FUNCTION from "../config/hash.js"

class Admin_controler{
    async rendering_page(req, res){
        let Shops = await d_b.get_data("Shop_point")
        Shops.len = Shops.length
        let users = await d_b.get_data("Users")
        let Roles = await d_b.get_data("Roles")
        Roles.len = Roles.length
        users.len = users.length
        for(let i = 0; i<users.len; i++)
            for(let j = 0; j < Roles.length; j++)
                if(users[i].Role == Roles[j].Id)
                    users[i].Role = Roles[j].Role

        const render_data = {
            Shops: Shops,
            Users: users,
            Roles: Roles
        }
        res.render("admin", render_data)
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
        res.redirect(`/?user=${user[0].Id}`);
        // res.render(`index`, data)
        }
    }
    }
}

export default new Admin_controler