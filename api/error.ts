import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.futbinId || !req.query.platform) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid futbinId and platform." });
    return;
  } else if (!allowedPlatforms.includes(req.query.platform as string)) {
    res.statusCode = 400;
    res.send({ message: "Error, platform value is not valid try PC, PS or XB." });
    return;
  }
var errorPrice = "";
var maybeError = "";

  for (const futbinId of (req.query.futbinId as string).split(",")) {
    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${futbinId}&platform=${req.query.platform}`
    );
    var playerPrice;
    for(var i=0; i<information.data.length;i++){
       var player = information.data[i];
        if(player.ID == futbinId){
          playerPrice = information.data[i];
        }
    }
    if(playerPrice != null){
      var firstPrice = playerPrice.LCPrice;
      var fifthPrice = playerPrice.LCPrice5;
      var fourthPrice = playerPrice.LCPrice4;
      var thirdPrice = playerPrice.LCPrice3;
    
      var priceToCheck = fifthPrice;
      if(parseInt(fifthPrice)==0){
        priceToCheck = fourthPrice;
        if(parseInt(fourthPrice)==0){
          priceToCheck = thirdPrice;
        }
    }

    if(parseInt(priceToCheck)*0.95 > parseInt(firstPrice) && ((parseInt(priceToCheck)*0.95)-parseInt(firstPrice))>=500){
        errorPrice+="Name : "+ playerPrice.Player_Name+" ---  Prix achat : "+firstPrice+" --- Prix revente : "+priceToCheck + " --- Benefits : "+(parseInt(priceToCheck)*0.95-parseInt(firstPrice));
        errorPrice+='<br/>';
    }
    if(parseInt(priceToCheck)==0){
        maybeError+="Name : "+ playerPrice.Player_Name+" ---  Prix achat : "+firstPrice+" --- Prix revente : "+priceToCheck;
        maybeError+='<br/>';
    }
      
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
