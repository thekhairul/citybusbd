const { join, resolve } = require("path");
const { readFileSync } = require("fs");

const dataDirectory = resolve(process.cwd(), "stops");

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }
    const stopsJson = readFileSync(join(dataDirectory, "dhaka.json"), "utf8");
    const stops = JSON.parse(stopsJson).map(stop => ({ ...stop, label: `${stop.en} | ${stop.bn}`, value: stop.id }));
    res.status(200).json(stops);
}
