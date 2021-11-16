import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
   
  let res = await fetch("https://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=ps");
     
        if (res.ok) {
            let json = await res.json();
            res.send(json);
        } else {
            res.send("Error retrieve error");
        }
};
