const { default: axios } = require("axios");
const {
 
  getSymptomsData,
} = require("../service/symptomsData.service");
const SymptomService = require("../service/symptomStore.service");
const userInfo = require("../service/userDetails");

const SymptomStore = async (req, res) => {
  
  console.log(req.query.userId);
  console.log(req.query.symptoms);
  var Userdata = await userInfo.data(req.query.userId);
console.log(Userdata.age)
  let data = await SymptomService.symptomsData(req.query.symptoms, Userdata.age);

const response = await SymptomService.symptomsDiagonsis(Userdata.age,Userdata.Gender,data.data.mentions[0].id)

  // const response = await SymptomService.storeSymptom(req.query.userId,data.data.mentions[0].id);
  if(response.data.question.items.length > 0){
    const names = []
    for(let  i = 0 ; i <response.data.question.items.length ;i++ ){
      names.push({
        "title": `${response.data.question.items[i].name}`,
        "message": `${response.data.question.items[i].name}`
      })
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

  for (let i = 0; i < response.length; i++) {
    temp.push(response[i].name);
  }

  // console.log(temp);
  return res.status(200).json({
    // data: response.data.map((item) => item.name),
    data: temp,
    message: "Successfully Got all the names",
    success: true,
  });
};

// getSymptomsController
module.exports = { SymptomStore, getDefaultSymptoms };
