import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const allowedPlatforms = ["PC", "PS", "XB"];

  if (!req.query.resourceId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId and platform." });
    return;
  } 

  const { platform } = req.query;
  const prices = {};

  for (const resourceId of (req.query.resourceId as string).split(",")) {
    const { data: price } = await Axios.get(
      `https://futbin.org/futbin/api/fetchPriceInformation?playerresource=${resourceId}&platform=PS`
    );

    prices[resourceId] = price;
  }

  res.send(prices);
};
