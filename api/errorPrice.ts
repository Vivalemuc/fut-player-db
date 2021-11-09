import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
    const allowedPlatforms = ["ps", "xbox"];

  if (!req.query.platform) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid platform." });
    return;
  } 
var errorPrice = "";
var maybeError = "";
 const { data: information } = await Axios.get(
      `http://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=${req.query.platform}`
    );

  res.send(information);
};
