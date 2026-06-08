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
            zakazchici: [],
            len_products: null,
            len_orders: orders.length,
        }

        let products = await d_b.get_data("Products_of_shop_point", "Id_shop_point", shop[0].Id)
                         
        data.len_products = products.length

        for(let i = 0; i<products.length; i++){
            let product = await d_b.get_data("Products", "Id", products[i].Id_product)
            data.products.push(product[0])
        }

        for(let i = 0; i<orders.length; i++){
            let zakazchic = await d_b.get_data("Users", "Id", orders[i].Id_user)
            data.zakazchici.push(zakazchic[0])
        }

        const order_statuses = await d_b.get_data("Order_statuses")
        
        data.order_statuses = order_statuses

        for(let i = 0; i<data.orders.length; i++){
            for(let j = 0; j<order_statuses.length; j++)
                if(data.orders[i].Order_status == order_statuses[j].Id)
                    data.orders[i].Order_status = order_statuses[j].Status
        }
        
        // console.log(data)
        res.render("shop_emploee", data)
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
            
            case "products":
                await d_b.update_qwery(
    "Products",           // table_name
    "Name",               // column_name
    req.body.Name,     // column_value
    "Id",                 // serdg_column_name
    req.body.Id        // serdg_column_value
                    );

                await d_b.update_qwery(
                    "Products",
                    "Price",
                    req.body.Price,
                    "Id",
                    req.body.Id
                    );  

                await d_b.update_qwery(
                    "Products",
                    "Img",
                    req.body.Img,
                    "Id",
                    req.body.Id
                    );
                break;
            
            case "new_products":
                await d_b.add_product(req.body.Name, req.body.Price, 1, 1, req.body.Img)
                await d_b.add_products_of_shop_point(req.body.Id_Shop, req.body.Id)
                break
            }

        res.redirect(`/Shop_imploee/${req.params.id}/?role=2`)
    }
}

export default new Shop_emploee_controler