const { symptomsDiagonsis, symptomsData } = require("../service/symptomStore.service");
const { data } = require("../service/userDetails")

const diagonsischecker = async(req,res) =>{
// here I ned a data response from front end so I'll just put that yes/present other all no/absent
// with there parse Id or symptom Id 
// if directly call from symptom store symptomDiagnosis function for further dignosis and in evidence I'll just put the array custome
/*
take response from inline code all the the options and put them absent and choosed wala present

  "evidence": [
          {
            "id": `${id}`,
            "choice_id": "present",
            "source": "initial"
          }
        ]

        here from end I'll get the symptoms in words or sentence which I have to pass into diagnosis with id from parse API we need to do so
 apan ko response from diagnosis sai pura response mil reha hai agr mai usko pura post kardo in diagnosis API change karke then?
        */  


 /* 
 
 here Im planning that I'll going to give the symptom id from front ID/Inline code editor so we can go further
 
 */
const UserData = await data(req.query.userId);
console.log(req.query.s_id)
console.log(req.query.s_id)
    const response = await symptomsDiagonsis(UserData.token,UserData.age , UserData.Gender ,req.query.s_id )
        if(response.data.conditions.common_name !== undefined || response.data.conditions.common_name !== null){
            // const names = []
            // for(let  i = 0 ; i <response.data.question.items.length ;i++ ){
            //   names.push({
            //     "title": `${response.data.question.items[i].name}`,
            //     "message": `${response.data.question.items[i].name}`,
            //     "replyMetadata": {
            //      "id" : `${response.data.question.items[i].id}`
            //   }
            //   }
            //   )
            // }
          
          res.status(200).json({
            message: "Successfull",
            success: true,
            // items : names,
            data: response.data.conditions[0].common_name,
            });
        }else{
         return res.status(200).json({
            message :"Please Go to near by doctor",
            success : true
          })
        }
      // }



// console.log(UserData.token , "TOKENNNNNNNNNNNNNNNNNNNNNNNNNNNn");

}

module.exports = {
    diagonsischecker
}