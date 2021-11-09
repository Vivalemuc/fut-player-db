import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
   
  Axios.get(
      `https://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=${req.query.platform}`
    ).then(function (response) {
    res.send(response);
     
  }).catch(function (error) {
    // handle error
    console.log(error);
       res.send({});

  });

};
