import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.futbinId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId." });
    return;
  }

const informations = {};

  for (const futbinId of (req.query.futbin as string).split(",")) {
    const { data: information } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${futbinId}`
    );
    informations[futbinId] = information.data[0];
  }

  res.send(informations);
};
