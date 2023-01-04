
const {diagonsischecker} = require("../controller/diagnosis.controller.js")
const diagonsis = (app) =>{
    app.post("/symptoms/diagonsis" , diagonsischecker)
}

module.exports = {
    diagonsis
}