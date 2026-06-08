import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import HASH_FUNCTION from "../config/hash.js"

class Kurier_controler{
    async render_page(req, res){
        const orders = await d_b.get_data("Orders", "Id_user_employee", req.params.id)
        const order_statuses = await d_b.get_data("Order_statuses")
        const user = await d_b.get_data("Users", "Id", req.params.id)
        const data = {orders: orders, User: user[0], order_statuses: order_statuses}
        console.log(data)
        res.render("Kurier", data)
    }
    async update_order_info(req, res){
        console.log(req.body)
        switch (req.body.type){
            case "order":
                await d_b.update_qwery(
        "Orders",           // table_name
        "Id_user_employee", // column_name
        req.body.Id_user_employee, // column_value
        "Id",               // serdg_column_name
        req.body.Id             // serdg_column_value
                    );
                    
                await  d_b.update_qwery(
                        "Orders",
                        "Id_user",
                        req.body.Id_user,
                        "Id",
                        req.body.Id
                    );

                await d_b.update_qwery(
                        "Orders",
                        "pay_status",
                        req.body.pay_status,
                        "Id",
                        req.body.Id
                    );
                    
                await d_b.update_qwery(
                        "Orders",
                        "Order_status",
                        req.body.Order_status,
                        "Id",
                        req.body.Id
                    );
                    
                await d_b.update_qwery(
                        "Orders",
                        "Adress",
                        req.body.Adress,
                        "Id",
                        req.body.Id
                    );
                break;
                }
                res.redirect(`/Kurier/${req.params.id}/?role=3`)
            }
}

export default new Kurier_controler