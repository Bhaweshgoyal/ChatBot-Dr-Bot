const { symptomsDiagonsis, symptomsData } = require("../service/symptomStore.service");
const { data } = require("../service/userDetails")

const diagonsischecker = async(req,res) =>{
const UserData = await data(req.query.userId);
console.log(req.query.s_id)
console.log(req.query.s_id)
    const response = await symptomsDiagonsis(UserData.token,UserData.age , UserData.Gender ,req.query.s_id )
        if(response.data.conditions[0] != null){
          console.log(response.data.conditions[0])
          // console.log(response.data.conditions[0] )
          res.status(200).json({
            message: "Successfull",
            success: true,
            // items : names,
            data: response.data.conditions[0].common_name,
            });
        }else{
         return res.  status(200).json({
            message :"Sorry, I couldn't diagnose based on the provided symptoms. Please visit the nearest doctor for further diagnosis",
            success : true
          })
        }
}

module.exports = {
    diagonsischecker
}