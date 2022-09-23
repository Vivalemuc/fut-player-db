import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {

  if (!req.query.resourceId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId." });
    return;
  }
    var  platform  = req.query.platform;
  if(platform === "XB"){
    platform="PS"; 
  }

      const { data: prices } = await Axios.get(`
        https://futbin.org/futbin/api/fetchDailyGraphInformation?platform=${platform}&playerresource=${req.query.resourceId}
      `);
  if(prices["data"].length > 5){
    res.send(prices["data"].slice(-5));
  }else
    res.send(prices["data"]);
};
