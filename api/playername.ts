import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {

  if (!req.query.playerName) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid playerName." });
    return;
  }

      const { data: players } = await Axios.get(`
        https://futbin.org/futbin/api/searchPlayersByName?playername=${req.query.playerName}
      `);

    
  res.send(players);
};
