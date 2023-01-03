const {StoreSex} = require("../controller/sex.controller");

const Gender = (app)=>{
    app.post("/symptoms/api/v1/sex", StoreSex);
}

module.exports = {
    Gender
}