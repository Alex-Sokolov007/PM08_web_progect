import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
// import { render } from "ejs"

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
        if(req.params.id != 0){
        const db_data = await d_b.get_data('Users', 'Id', req.params.id)
        const basket_data = await d_b.get_data("User_busket", "id_user", req.params.id)
        let render_data = {
            active_user: req.params.id,
            id: db_data[0].Id,
            len: basket_data.length,
            user: db_data[0],
            products: []
        }
        for(let i=0; i<basket_data.length; i++){
         let product_data = await d_b.get_data("Products", 'Id', basket_data[i].Id_product)
            product_data[0].Quantity = basket_data[i].Quantity
            render_data.products.push(product_data[0])
        }
        // console.log(render_data)
        res.render('basket', render_data)
    }
        else res.render('basket', {id:0})
    }
}

export default new Basket_controler