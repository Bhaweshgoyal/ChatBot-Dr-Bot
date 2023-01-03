require("dotenv").config()
const API_KEY = process.env.API_key;
const API_ID = process.env.api_id;
const axios = require("axios");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });


// const DiagonsisData = async(arr,sex,age)=>{
//     if(age && sex){
//     const response = await axios.post(
//         'https://api.infermedica.com/v3/diagnosis',
        
//         {
//             'sex': `${sex}`,
//             'age': {
//                 'value': Number(age)
//             },
//             'evidence': arr
//         },
//         {
//             headers: {
//                 'App-Id': '6b2c1128',
//                 'App-Key': 'ed31ef2357c0a91740327294a146c97d',
//                 'Content-Type': 'application/json'
//             }
//         }
//     );

//     return response
// }else{
//     return undefined
// }

// }



const getSymptomsData = async (url, age) => {

    // const cachedData = cache.get(age);
    // if (cachedData) {
  
    //   return cachedData;
    // }
  
   
    const response = await axios.get(url, {
    params: {
      'age.value': `${age}`,
      'age.unit': 'year',
      'enable_triage_3': 'true'
    },
    headers: {
        Accept: 'application/json',
        'Dev-Mode': 'true',
        'App-Key': API_KEY,
        'App-Id': API_ID,
      }
  });
  
    // cache.set(age, response.data);
  
    return response.data;
  };
  

module.exports = { getSymptomsData } 