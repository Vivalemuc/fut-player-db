import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const allowedPlatforms = ["PC", "PS", "XB"];

  if (!req.query.squadId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid squadId and platform." });
    return;
  } 

  const { platform } = req.query;
  const sbcs = {};

  for (const squadId of (req.query.squadId as string).split(",")) {
    try {
      const { data: sbc } = await Axios.get(`
        https://futbin.org/futbin/api/getSquadByID?squadId=${squadId}&platform=PS
      `);

      sbcs[squadId] = sbc;
    } catch {
      sbcs[squadId] = { success: false };
    }
  }
  res.send(sbcs);
};
