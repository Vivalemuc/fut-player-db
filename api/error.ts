import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.futbinId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId." });
    return;
  }

var errorPrice = "";
var maybeError = "";

  for (const futbinId of (req.query.futbinId as string).split(",")) {
    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${futbinId}`
    );
    var firstPrice = information.data[0].LCPrice;
    var fifthPrice = information.data[0].LCPrice5;
    if(parseInt(fifthPrice)*0.95 > parseInt(firstPrice) && (parseInt(fifthPrice)*0.95-parseInt(firstPrice))>500){
        errorPrice+="Name :"+ information.data[0].Player_Name+" ---  1st price : "+firstPrice+" --- 5th price : "+fifthPrice + " --- Benefits : "+(parseInt(fifthPrice)*0.95-parseInt(firstPrice));
        errorPrice+='<br/>';
    }
    if(parseInt(fifthPrice)==0){
        maybeError+="Name :"+ information.data[0].Player_Name+" ---  1st price : "+firstPrice+" --- 5th price : "+fifthPrice;
        maybeError+='<br/>';
    }
  }
  
  var finalString="";
  finalString+="------[Error]------";
  finalString+='<br/>';
  finalString+='<br/>';
  finalString+=errorPrice;
  finalString+='<br/>';
  finalString+='<br/>';
  finalString+="------[Potential]------";
  finalString+='<br/>';
  finalString+='<br/>';
  finalString+=maybeError;
  res.send(finalString);
};
