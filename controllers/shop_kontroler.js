import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import { match } from "path-to-regexp"


class Shop_controler{
    async rendering_page(req, res){
        const user = req.query.user
        const Shop = await d_b.get_data("Shop_point", "Id", req.params.id)
        
        const data = {
            active_user: user,
            id: Shop[0].Id,
            title: Shop[0].Title,
            img: Shop[0].Img,
            adres: Shop[0].Adress,
            Hot_phone: Shop[0].Hot_phone,
            products: []
        }

        let products = await d_b.get_data("Products_of_shop_point", "Id_shop_point", req.params.id)
                                            
        for(let i = 0; i<products.length; i++){
            let product = await d_b.get_data("Products", "Id", products[i].Id_product)
            data.products.push(product[0])
        }
        // console.log(data.products[0].Price)
        res.render("shop", data)

    }

    async post1(req, res){
        console.log(req.body.prise)
        if(req.body.name != undefined && req.body.prise != undefined && req.body.img != undefined){
            d_b.add_producte(req.body.name, req.body.prise, req.body.img)
        }else{
            console.log("Данные не коректны")
        }
        res.send("post запрос успешен :)")
    }

    async put(req, res){
        console.log(req.body)
    try{
        switch(req.body.property){
            case "name":
                d_b.update_product_name(req.body.id, req.body.name)
                break
            case "prise":
                console.log("Тут будет изменение по цене")
                break
            default:
                console.log('Ошибка выбора свойства')
                break
        }
        res.send("put запрос успешен")
    }catch (e){
        res.send('Ошибка ввода параметров')
    }
        
    }

}

export default new Shop_controler