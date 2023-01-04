const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const { getSymptoms } = require("./routes/symptoms.route");
const { age } = require("./routes/age.route");
const { Gender } = require("./routes/sex.route");
const { diagonsis } = require("./routes/dignosis.routes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let port = 8080;
Gender(app)
age(app)
diagonsis(app)
getSymptoms(app);
app.get("/" , (req,res)=>{
  console.log("hello world!")
  res.json({
    message : "Sussessfull" ,
    data : ["lodon", "paris"]
  })
})
app.listen(port, () => {
  console.log("app is listening over port=", port);
});



// async function res(input, output) {
//   const response = await axios
//     .post(
//       "https://api.infermedica.com/v3/parse",
//       // '{"text": "I often feel cold.", "age": {"value":30}, "include_tokens": true}',
//       {
//         text: input.data.text,
//         age: {
//           value: input.data.age,
//         },
//         include_tokens: true,
//       },
//       {
//         headers: {
//           "App-Id": "6b2c1128",
//           "App-Key": "ed31ef2357c0a91740327294a146c97d",
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((data) => {
//       return data;
//     });

//   console.log(response.data.mentions[0].name);
// }
// let input = {
//   data: {
//     text: "I fell hotness",
//     age: 30,
//   },
// };
// res(input, (output = ""));
