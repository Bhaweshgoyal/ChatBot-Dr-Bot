var axios = require('axios');
require(`dotenv`).config()

const specialist = async (age,symptoms,Gender)=>{
    var data = JSON.stringify({
        "sex": `${Gender}`,
        "age": {
          "value": Number(age),
          "unit": "year"
        },
        "evidence": [
          {
            "id": `${symptoms}`,
            "choice_id": "present",
            "source": "initial",
          }
        ],
      });
      
      var config = {
        method: 'post',
        url: 'https://api.infermedica.com/v3/recommend_specialist',
        headers: { 
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
          'Dev-Mode': 'true', 
          'App-Id': `${process.env.api_id}`, 
          'App-Key': `${process.env.api_key}`
        },
        data : data
      };
      
     const response = await axios(config)

       return "We recommand you to reach " + response.data.recommended_specialist.name
    //   return ans
}

// specialist("43" , "sp_1" , "male");
module.exports = {
    specialist
}

