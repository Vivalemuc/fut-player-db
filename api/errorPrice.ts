import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
   
      
   
   Axios({
  method: 'get',
  url:  `https://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=${req.query.platform}`})
  .then(function (response) {
         res.send(response.data);

  }).catch(function (error){
       if (error.response) {
      
          res.send(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
                 res.send(error.request);

    } else {
      // Something happened in setting up the request that triggered an Error
                        res.send(error.message);

    }
   });
   
};
