import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
   
   Axios({
    method: 'get',
    url:  'https://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=ps'})
  .then(function (response) {
    res.send(response.data);
  }).catch(function (error){
      if (error.response) {
          res.send(error.response);
      } else if (error.request) {
          res.send(error.request);
      } else {
        res.send(error.message);
    }
   });
};
