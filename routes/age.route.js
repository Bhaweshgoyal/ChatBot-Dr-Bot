
const {StoreAge} = require("../controller/age.controller")

const age = (app)=>{
    app.post("/symptoms/api/v1/age", StoreAge);
}

module.exports={
    age
}