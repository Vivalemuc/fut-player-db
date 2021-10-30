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
  var profit = 1000;
  if(req.query.profit){
    profit = parseInt(req.query.profit);
  }
  var sellPrice = 0;
  if(req.query.sellPrice){
    sellPrice = parseInt(req.query.sellPrice);
  }
  for (const futbinId of (req.query.futbinId as string).split(",")) {
    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${futbinId}&platform=${req.query.platform}`
    );    
    var player;
    for(var i=0; i<information.data.length;i++){
       var tmp = information.data[i];
        if(tmp.ID == futbinId){
          player = information.data[i];
        }
    }
    if(player!=null && parseInt(player.LCPrice) != 0){
      var price = parseInt(player.LCPrice);
      price = price * 0.95 - parseInt(profit);
      var buyPrice = 0;
      if (price <= 1000) {
            buyPrice= Math.floor(price / 50.0) * 50;
        } else if (price <= 10000) {
            buyPrice= Math.floor(price / 100.0) * 100;
        } else if (price <= 50000) {
            buyPrice =  Math.floor(price / 250.0) * 250;
        } else if (price <= 100000) {
            buyPrice =  Math.floor(price / 500.0) * 500;
        } else {
            buyPrice =  Math.floor(price / 1000.0) * 1000;
        }
      var sellP = 0;
      if(sellPrice != 0){
        sellP = sellPrice; 
      }else{
        sellP = parseInt(player.LCPrice);
      }
      
      if(player.Player_ID == player.Player_Resource){
        informations+=`{"name": "${player.Player_Name}","maskedDefId": ${player.Player_Resource},"buyPrice": ${buyPrice},"sellPrice": ${sellP},"sellBid":0,"level":"any","rarity":${player.Rare_Type},"style": -1,"position":"any","zone":-1, "maxPurchases":1,"buyIf":${player.Player_Rating}, "sellIf":${player.Player_Rating},"buyWithStyle":false, "minContract":0}`;
      }else{
        informations+=`{"name": "${player.Player_Name}","defId": ${player.Player_Resource},"buyPrice":${buyPrice},"sellPrice": ${sellP},"sellBid":0,"level":"any","rarity":${player.Rare_Type},"style": -1,"position":"any","zone":-1, "maxPurchases":1,"buyIf":${player.Player_Rating}, "sellIf":${player.Player_Rating},"buyWithStyle":false, "minContract":0}`;
      }
      
    } 
    
    informations+='<br/>';
  }

  res.send(informations);
};
