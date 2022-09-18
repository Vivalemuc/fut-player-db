import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const allowedPlatforms = ["PC", "PS", "XB"];

  if (!req.query.resourceId || !req.query.platform) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId and platform." });
    return;
  } else if (!allowedPlatforms.includes(req.query.platform as string)) {
    res.statusCode = 400;
    res.send({ message: "Error, platform value is not valid try PC, PS or XB." });
    return;
  }

  const { platform } = req.query;
  const prices = {};

  for (const resourceId of (req.query.resourceId as string).split(",")) {
    const { data: price } = await Axios.get(
      `https://futbin.org/futbin/api/23/fetchPriceInformation?playerresource=${resourceId}&platform=${platform}`
    );

    prices[resourceId] = price;
  }

  res.send(prices);
};
