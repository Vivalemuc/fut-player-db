import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {

  if (!req.query.sbcId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid sbcId." });
    return;
  } 
 
  const sbcs = {};
  const body = {"id":req.query.sbcId,"hybrid":false,"untradeable":false,"excludePosModifiers":false};

 const response = await Axios.post(`https://5fmhq2i8rp.eu-west-1.awsapprunner.com/sbcs`, body);
 res.send(response.data);
};
