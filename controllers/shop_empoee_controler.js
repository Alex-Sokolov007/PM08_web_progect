import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import HASH_FUNCTION from "../config/hash.js"

class Shop_emploee_controler{
    async render_emploee_window(req, res){
        let shop_emploeer = await d_b.get_data("Users", "Id", req.params.id)
        const shop_emploee = await d_b.get_data("Shop_employee", "Id_user", req.params.id)
        const shop = await d_b.get_data("Shop_point", "Id", shop_emploee[0].Id_Shop_point)
        const orders = await d_b.get_data("Orders", "Id_Shop", shop[0].Id)
        shop_emploeer[0].shop = shop[0]
        
        const data = {
            shop_emploeer: shop_emploeer[0],
            orders: orders,
            products: [],
            len_products: null,
            len_orders: orders.length,
        }

        let products = await d_b.get_data("Products_of_shop_point", "Id_shop_point", shop[0].Id)
                         
        data.len_products = products.length

        for(let i = 0; i<products.length; i++){
            let product = await d_b.get_data("Products", "Id", products[i].Id_product)
            data.products.push(product[0])
        }
        
        console.log(data)
        res.render("shop_emploee", data)
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

export default new Shop_emploee_controler