const{gender} = require("../service/Gender.service")

const StoreSex = async (req, res) => {
    let Gender = req.body.sex;
    // console.log(req.body.userId)
    let userId = req.body.userId;
    let response = await gender(Gender, userId);
    // console.log(response);
    console.log("----------------------------------------");
    return res.status(200).json({
      message: "successfully Stored the data",
      data: response,
      success: true,
    });
  };


  module.exports = {
    StoreSex
  }