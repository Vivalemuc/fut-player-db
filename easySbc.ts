import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {

  if (!req.query.sbcId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid sbcId." });
    return;
  } 

  const sbcs = {};

 const { players: sbc } = await Axios.post(`https://5fmhq2i8rp.eu-west-1.awsapprunner.com/sbcs`, {"id":"`${sbcId}`","hybrid":4,"untradeable":false,"excludePosModifiers":false});
 res.send(sbc);
};
