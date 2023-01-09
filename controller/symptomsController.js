const { default: axios } = require("axios");
// const { token } = require("../service/interviewToken.service");
const { getSymptomsData } = require("../service/symptomsData.service");
const SymptomService = require("../service/symptomStore.service");
const storage = require("../service/store.service");
const userInfo = require("../service/userDetails");
const { specialist } = require("../service/specialist.service");

const SymptomStore = async (req, res) => {
  console.log(req.query.userId);
  console.log(req.query.symptoms);
  var Userdata = await userInfo.data(req.query.userId);

  console.log(Userdata.Gender);
  console.log(Userdata.symptoms);
  let data = await SymptomService.symptomsData(
    req.query.symptoms,
    Userdata.age
  );
  // console.log(data.data.mentions[0].id)

  if (Userdata.symptoms == undefined) {
    let store = data.data.mentions[0].id;
    console.log("undefined wala");
    const symptomsStorage = await storage.store(store, req.query.userId);
    // from here if it is undefined got true we have response for more symptoms "RETURN FROM HERE"
    return res.status(200).json({
      message: "Please add more symptoms",
    });
  } else if (Userdata.symptoms !== undefined || Userdata.symptoms !== null) {
    let symptomArr = Userdata.symptoms.split(",");
    console.log(symptomArr);
    if (symptomArr.length - 1 > 2) {
      //  if length got more than 2 we are going with diagnosis
      console.log("In diagnosis part");
      const response = await SymptomService.symptomsDiagonsis(
        "token",
        Userdata.age,
        Userdata.Gender,
        Userdata.symptoms
      );
      console.log(
        response.data.question,
        "response.data.question response.data.question response.data.question "
      );
      if (response && response.data.question != null) {
        const names = [];
        for (let i = 0; i < response.data.question.items.length; i++) {
          names.push({
            title: `${response.data.question.items[i].name}`,
            message: `${response.data.question.items[i].name}`,
            replyMetadata: {
              id: `${response.data.question.items[i].id}`,
              KM_TRIGGER_EVENT: "Default Fallback",
            },
          });
        }

        return res.status(200).json({
          message: "Successfull",
          success: true,
          items: names,
          data: response.data.question,
        });
      } else {
        const recomander = await specialist(
          Userdata.age,
          req.query.symptoms,
          Userdata.Gender
        );
        return res.status(200).json({
          message: recomander,
        });
      }
    } else {
      // if )
      let arr = Userdata.symptoms.split(",");
      if (arr.includes(data.data.mentions[0].id)) {
        return res.status(200).json({
          message: "Please add more symptoms",
        });
      } else {
        let store = Userdata.symptoms + "," + data.data.mentions[0].id;
        console.log(store, "in else part");
        const SymptomStore = await storage.store(store, req.query.userId);
        // here talso we have to response for more symptoms;
        res.status(201).json({
          message: " Please add more symptoms ",
        });
      }
    }
  } // console.log(CheckObj);
};

const getDefaultSymptoms = async (req, res) => {
  let Userdata = await userInfo.data(req.query.userId);
  function myAge(item) {
    var matches = item.match(/(\d+)/);
    return matches;
  }

  let temp = [];

  const response = await getSymptomsData(
    "https://api.infermedica.com/v3/symptoms",
    Userdata.age
  );
  for (let i = 0; i < response.length; i++) {
    if (!myAge(response[i].name) == true) {
      temp.push(response[i].name);
    }
  }
  return res.status(200).json({
    // data: response.data.map((item) => item.name),
    data: temp,
    message: "Successfully Got all the names",
    success: true,
  });
};

// getSymptomsController
module.exports = { SymptomStore, getDefaultSymptoms };
