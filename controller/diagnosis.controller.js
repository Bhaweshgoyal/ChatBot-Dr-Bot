const { specialist } = require("../service/specialist.service");
const { symptomsDiagonsis, symptomsData } = require("../service/symptomStore.service");
const { data } = require("../service/userDetails")

const diagonsischecker = async(req,res) =>{
const UserData = await data(req.query.userId);
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

          const ans = await specialist(UserData.age , req.query.s_id , UserData.Gender)

         return res.  status(200).json({
            message :"Sorry, I couldn't diagnose based on the provided symptoms. Please visit the nearest doctor for further diagnosis",
            success : true,
            data : ans
          })
        }
}

module.exports = {
    diagonsischecker
}