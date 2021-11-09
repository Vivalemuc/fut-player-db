import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
   
   
    const { data: information } = await Axios.get(
         `https://smp-ar.com/api/futbinPricesErrors?key=za3dh5u4da52si34a2fiezohih$zae&platform=${req.query.platform}`
    );    
   
   res.send(information);
};
