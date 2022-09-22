import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {

  if (!req.query.challengeId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid challengeId." });
    return;
  }

      const { data: squads } = await Axios.get(`
        https://futbin.org/futbin/api/getStcSquads?challenge=${req.query.challengeId}
      `);

    
  res.send(squads);
};
