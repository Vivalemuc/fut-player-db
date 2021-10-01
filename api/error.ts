import { VercelRequest, VercelResponse } from "@vercel/node";
import Axios from "axios";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query.futbinId) {
    res.statusCode = 400;
    res.send({ message: "Error, you must provide a valid resourceId." });
    return;
  }

  const informations = {};
  var promises = [];
  
  function getInfo(id) {
      Axios.get(
      `https://futbin.org/futbin/api/fetchPlayerInformation?ID=${id}`
      ).then(function (response) {
          informations[id] = response.data[0];
        })
    }
  
  for (const futbinId of (req.query.futbinId as string).split(",")) {
    promises.push(getInfo(futbinId));
  }
  
  await Promise.all(promises);

  res.send(informations);
};
