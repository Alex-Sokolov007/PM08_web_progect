import express from "express"
import bodyParser from "body-parser"
import methodOverride from "method-override";
const PORT = 5000
const app = express()

app.use(express.json())
app.set('view engine', 'ejs')//ejs
app.use(express.static("views"))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(methodOverride("_method"));

export {PORT, app}