const { default: axios } = require("axios");
const { token } = require("../service/interviewToken.service");
const {
 
  getSymptomsData,
} = require("../service/symptomsData.service");
const SymptomService = require("../service/symptomStore.service");
const userInfo = require("../service/userDetails");

const SymptomStore = async (req, res) => {
  console.log(req.query.userId);
  console.log(req.query.symptoms);
  var Userdata = await userInfo.data(req.query.userId);
console.log(Userdata.Gender)
  let data = await SymptomService.symptomsData(req.query.symptoms, Userdata.age);
console.log(data.data.mentions[0].id)
const response = await SymptomService.symptomsDiagonsis("token",Userdata.age,Userdata.Gender,data.data.mentions[0].id)
// const token = await token(req.query.userId , response.data.interview_token)
// req["interview_token"] = response.data.interview_token
// console.log(req[`${req.query.userId}`] , "helllllllllllllllllllllllllllllllllllllllllllllllllllllllllloooooooooo")
  // const response = await SymptomService.storeSymptom(req.query.userId,data.data.mentions[0].id);
  if(response && response.data.question.items.length > 0){
    const names = []
    for(let  i = 0 ; i <response.data.question.items.length ;i++ ){
      names.push({
        "title": `${response.data.question.items[i].name}`,
        "message": `${response.data.question.items[i].name}`,
        "replyMetadata": {
         "id" : `${response.data.question.items[i].id}`,
         "KM_TRIGGER_EVENT" : "Default Fallback Intent"
      }
      }
      )
    }
  
  res.status(200).json({
    message: "Successfull",
    success: true,
    items : names,
    data: response.data.question,
    });
  }// console.log(CheckObj);
};

// console.log(CheckObj.age)
// if (CheckObj.symptoms.length >= 3) {
//   var { question } = await diagonsis(
//     CheckObj.symptoms,
//     CheckObj.sex,
//     CheckObj.age
//   );
  //  console.log(question.text , "QQQQQQQQQQQQQQQQQQQQQq")
// }
//   let symptomsSize = CheckObj.symptoms.length;

//   // let ans = CheckObj.symptoms.join(" and ");

//   if (question) {
//     return res.status(200).json({
//       message: "Successflly Added the symptoms",
//       success: true,
//       // data: ans,
//       data: [question.text, question.items],
//       len: symptomsSize,
//     });
//   } else {
//     return res.status(201).json({
//       message: "Not Getting Any value",
//       success: false,
//       len: symptomsSize,
//     });
//   }
// };
// }

// const diagonsis = async (arr, sex, age) => {
//   let response = await DiagonsisData(arr, sex, age);
//   if (response) {
//     return response.data;
//   } else {
//     console.log("no response ----------");
//   }
//   // console.log(response.data);
// };



// const debouncedGetDefaultSymptoms = async (req, res) => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => getDefaultSymptoms(req, res), 3000);
// }

const getDefaultSymptoms = async (req, res) => {
  let Userdata = await userInfo.data(req.query.userId);

  let temp = [];

  const response = await getSymptomsData(
    "https://api.infermedica.com/v3/symptoms",
    Userdata.age
  );
// Changed were done here 
  for (let i = 0; i < response.length; i++) {
    temp.push({name : response[i].name ,    "replyMetadata": {
            "KM_TRIGGER_EVENT" : "symptoms Intent"
   }});
  }

  // console.log(temp);
  return res.status(200).json({
    // data: response.data.map((item) => item.name),
    data: {},
    message: "Successfully Got all the names",
    success: true,
  });
};

// getSymptomsController
module.exports = { SymptomStore, getDefaultSymptoms };
