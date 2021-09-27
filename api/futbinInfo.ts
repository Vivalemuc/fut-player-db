import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";
import futbinPlayerIds from "./futbin-playerids.json";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.futbinId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId." });
    return;
  }

  const informations = "";

  for (const futbinId of (req.query.futbinId as string).split(",")) {

    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${futbinId}`
    );
     var player = information.data[0];
    
    informations+='{"name": "${player.Player_Name}","defId": ${player.Player_Resource},"buyPrice": [BUY PRICE],"sellPrice": ${player.LCPrice},"sellBid":0,"level":"any","rarity":${player.Rare_Type}+',"style": -1,"position":"any","zone":-1, "maxPurchases":1,"buyIf":${player.Player_Rating}, "sellIf":${player.Player_Rating},"buyWithStyle":false, "minContract":0}';
  }

  res.send(informations);
};
