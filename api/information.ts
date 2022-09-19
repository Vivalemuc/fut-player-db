import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";
import futbinPlayerIds from "./futbin-playerids.json";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.resourceId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId." });
    return;
  }

  const informations = {};

  for (const resourceId of (req.query.resourceId as string).split(",")) {
    const ids = futbinPlayerIds.find((p) => p.player_id === parseInt(resourceId));

    if (!ids) {
      res.statusCode = 404;
      res.send({ message: `Player with resourceId = ${resourceId}, not found.` });
      return;
    }

    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/23/fetchPlayerInformation?ID=${ids.futbin_id}`
    );
    informations[resourceId] = information.data[0];
  }

  res.send(informations);
};
