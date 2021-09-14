import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";
import futbinPlayerIds from "./futbin-playerids.json";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.resourceId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide resourceId." });
    return;
  }

  const resourceId = parseInt(req.query.resourceId as string);
  const ids = futbinPlayerIds.find((p) => p.player_id === resourceId);

  if (!ids) {
    res.statusCode = 404;
    res.send({ message: `Player with resourceId = ${resourceId}, not found.` });
    return;
  }

  const response = await Axios.get(
    `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${ids.futbin_id}`
  );

  res.send(response.data.data[0]);
};
