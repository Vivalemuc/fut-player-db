import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const allowedPlatforms = ["PC", "PS", "XB"];

  if (!req.query.futbinId || !req.query.platform) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid futbinId and platform." });
    return;
  } else if (!allowedPlatforms.includes(req.query.platform as string)) {
    res.statusCode = 400;
    res.send({ message: "Error, platform value is not valid try PC, PS or XB." });
    return;
  }
  var informations = "";

  for (const futbinId of (req.query.futbinId as string).split(",")) {
    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${futbinId}&platform=${req.query.platform}`
    );

    var player = information.data[0];
    if(player.ID == futbinId){
      informations+=`{"name": "${player.Player_Name}","defId": ${player.Player_Resource},"buyPrice": [BUY PRICE],"sellPrice": ${player.LCPrice},"sellBid":0,"level":"any","rarity":${player.Rare_Type},"style": -1,"position":"any","zone":-1, "maxPurchases":1,"buyIf":${player.Player_Rating}, "sellIf":${player.Player_Rating},"buyWithStyle":false, "minContract":0}`;
    }
    else{
      player = information.data[1];
      if(player != null && player.ID == futbinId){
        informations+=`{"name": "${player.Player_Name}","defId": ${player.Player_Resource},"buyPrice": [BUY PRICE],"sellPrice": ${player.LCPrice},"sellBid":0,"level":"any","rarity":${player.Rare_Type},"style": -1,"position":"any","zone":-1, "maxPurchases":1,"buyIf":${player.Player_Rating}, "sellIf":${player.Player_Rating},"buyWithStyle":false, "minContract":0}`;
      }
    }    
    
    
    informations+='<br/>';
  }

  res.send(informations);
};
