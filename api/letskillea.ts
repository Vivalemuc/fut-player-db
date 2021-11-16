import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
    console.log('Testing')
  fetch("https://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=ps",{headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}, mode: 'cors'}).then(function(errors){
      if (errors.ok) {
            errors.json().then(function(json){
            res.send(json);
            });
        } else {
           res.send("Error retrieve error");
        }
      }).catch(function(e){
           res.send("Error retrieve error");

      });
   
};
