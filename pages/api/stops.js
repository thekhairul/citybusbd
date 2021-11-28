const { join, resolve } = require("path");
const { readFileSync } = require("fs");

const dataDirectory = resolve(process.cwd(), "data");

export default async function handler(req, res) {
  const routes = readFileSync(join(dataDirectory, "dhakaRoutes.json"), "utf8");
  const stopMap = new Map();
  const stops = JSON.parse(routes).reduce((result, currentRoute) => {
    currentRoute.stops.forEach(({stop_en, stop_bn}) => {
      if(!stopMap.has(stop_en)) {
        stopMap.set(stop_en, true);
        result.push({stop_en, stop_bn});
      }
    })
    return result;
  }, []);
  res.status(200).json(stops);
}
