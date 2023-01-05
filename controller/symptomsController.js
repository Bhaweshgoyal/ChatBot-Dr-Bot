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
// console.log(data.data.mentions[0].id)
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
         "KM_TRIGGER_EVENT" : "Default Fallback"
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


const getDefaultSymptoms = async (req, res) => {
  let Userdata = await userInfo.data(req.query.userId);

  let temp = [];

  const response = await getSymptomsData(
    "https://api.infermedica.com/v3/symptoms",
    Userdata.age
  );

  for (let i = 0; i < response.length; i++) {

    // here temp got changed so please go through if its not going to work
    // temp.push(response[i].name);
    temp.push({
      "searchKey":response[i].name,
      "name" :response[i].name,
      "metadata":{
        "replyMetadata": {
      //  "id" : `${response.data.question.items[i].id}`, 
       "KM_TRIGGER_EVENT" : "symptoms"
    }}
    })
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
