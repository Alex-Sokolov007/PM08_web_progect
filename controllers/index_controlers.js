import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"
import { match } from "path-to-regexp"


class Index_controler{
    async rendering_page(req, res){
        let user = req.query.user
        if(req.query.user == undefined)user=0
        const Shops = await d_b.get_data("Shop_point")
        const data = {
            active_user: user,
            role: req.query.role,
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

        res.render("index", data)

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

export default new Index_controler