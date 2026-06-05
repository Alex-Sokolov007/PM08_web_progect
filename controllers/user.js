import express from "express"
import { app, PORT } from "../config/config.js"
import d_b from "../config/db.js"

export const register = (req, res) => {
    try{

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const login = (req, res) => {
    try{

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const passwordSwap = (req, res) => {
    try{

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

export const editUser = (req, res) => {
    try{

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}