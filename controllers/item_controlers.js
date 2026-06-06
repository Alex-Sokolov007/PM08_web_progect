import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

class Item_controler{
    async read_info_item(req, res){
        const id = req.params.id
        let data_db = await d_b.get_data("Products", 'Id', id)
        if (data_db.length == 0){
            const null_data = {id_product: undefined}
            data_db.push(null_data)
        }
        const type_of_Measurment = await d_b.get_data("Types_of_measurement", "Id", data_db[0].Type_of_measurement)
        data_db[0].Type_of_measurement = type_of_Measurment[0].Type_of_measurement
        data_db[0].active_user=req.query.user
        data_db[0].in_basket = req.query.in_basket
        res.render('item', data_db[0])
    }
    async add_prodict_in_basket(req, res){
        if(req.query.user == 0) res.redirect(`/login/?user=${req.query.user}`)
        const user_busket = await d_b.get_data("User_busket", "Id_user", req.query.user)
        for(let i = 0; i<user_busket.length; i++){
            if(user_busket[i].Id_product == req.params.id){
                res.redirect(`/item/${req.params.id}/?user=${req.query.user}&in_basket=true`)
            }
        }
            await d_b.add_user_busket(req.query.user,req.params.id,1)
            res.redirect(`/basket/${req.query.user}/?user=${req.query.user}`)
        
    }
}

export default new Item_controler