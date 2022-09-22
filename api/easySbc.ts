import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {

  if (!req.query.setId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid sbcId." });
    return;
  } 
  var sbcId = undefined;
   const setId = await Axios.get(` https://uj78wx8nf5.execute-api.eu-west-1.amazonaws.com/23/get-sbcs-dev?set_id=${req.query.setId}`);
    const setIdArray = setId.data;
  for(var i of setIdArray){
    if(i.ImageURL.includes(req.query.asset)){
      sbcId= i.SBC_ID;
      break;
    }
  }
 
  const sbcs = {};
  const body = {"id":sbcId,"hybrid":4,"untradeable":false,"excludePosModifiers":false};

 const response = await Axios.post(`https://5fmhq2i8rp.eu-west-1.awsapprunner.com/sbcs`, body);
 res.send(response.data);
};
