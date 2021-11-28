const { join, resolve } = require("path");
const { readFileSync } = require("fs");

const dataDirectory = resolve(process.cwd(), "data");

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const routes = readFileSync(join(dataDirectory, "dhakaRoutes.json"), "utf8");
  const {from, to} = req.body;
  const matchedRoutes = [];
  JSON.parse(routes).forEach(route => {
    const fromStop = route.stops.find(({stop_en}) => from === stop_en);
    const toStop = route.stops.find(({stop_en}) => to === stop_en);
    if (fromStop && toStop) {
      // is a matched route
      const distance = Math.abs(toStop.kiloFromZero - fromStop.kiloFromZero);
      const price = distance > 0 ? Math.ceil(distance*2.15) : 0;
      matchedRoutes.push({
        route: route.id,
        buses: route.buses,
        price: price < 10 ? 10 : price,
        distance: distance.toPrecision(2),
        stops: route.stops.map(({stop_en}) => stop_en)
      })
    }
  })
  res.status(200).json(matchedRoutes);
}