var axios = require("axios");

const gender = (sex , userId) => {
  var data = JSON.stringify({
    metadata: {
      "Gender": `${sex}`,
    },
  });

  var config = {
    method: "post",
    url: "https://services.kommunicate.io/rest/ws/user/update",
    headers: {
      "Api-Key": `${process.env.Kommunicate_Key}`,
      "Of-User-Id":`${userId}`,
      "Content-Type": "application/json",
      Cookie: "JSESSIONID=899ECC009FC10D593EA5BE9F6029B6C4",
    },
    data: data,
  };

var response  =  axios(config)
    .then(function (response) {
    //   console.log(JSON.stringify(response.data));
        return response.data
    })
    .catch(function (error) {
      console.log(error);
    });

    return response
};


module.exports = {
    gender
}
