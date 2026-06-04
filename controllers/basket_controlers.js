import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Basket_controler{
    async new_product_in_busket(req, res){
        // console.log(req.body)
        res.send("Пост запрос")
        // d_b.add_User_To_Basket(req.params.id, req.params.product_name, req.params.number_product)
    }
    async update_busket(req,res){
        console.log('123')
    }
    async delete_item_busket(req, res){
       console.log('стопапупа')
    }
    async render_page_busket(req, res){
        const db_data = await d_b.get_data('Users', 'id_user', req.params.id)
        const basket_data = await d_b.get_data("User_busket", "id_user", db_data[0].id_user)
        let render_data = {
            len: basket_data.length,
            user: db_data[0],
            products: []
        }
        for(let i=0; i<basket_data.length; i++){
         let product_data = await d_b.get_data("product", 'id_product', basket_data[i].id_product)
            product_data[0].number = basket_data[i].number_produxt
            render_data.products.push(product_data[0])
        }
        // console.log(req.query.product_name)
        res.render('basket', {render_data, Basket_controler})
    }
}

export default new Basket_controler