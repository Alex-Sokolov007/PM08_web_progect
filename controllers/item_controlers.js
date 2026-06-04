import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Item_controler{
    async get1(req, res){
        const id = req.params.id
        let data_db = await d_b.get_data("product", 'id_product', id)
        if (data_db.length == 0){
            const null_data = {id_product: undefined}
            data_db.push(null_data)
        }
        res.render('item', data_db[0])
    }
    async post1(req, res){
        console.log("post запрос")
    }
}

export default new Item_controler