const { join, resolve } = require("path");
const { readFileSync } = require("fs");

const dataDirectory = resolve(process.cwd(), "buses");

export default function findBus(from, to, all = false) {
    const busesJson = readFileSync(join(dataDirectory, "dhaka.json"), "utf8");
    const buses = JSON.parse(busesJson);
    if (all) return buses;
    const filteredBuses = buses.filter(bus => {
        const fromIndex = bus.stopages.findIndex(stop => stop.id === from);
        const toIndex = bus.stopages.findIndex(stop => stop.id === to);
        if (fromIndex === -1 || toIndex === -1) return false;
        return true;
    });
    return filteredBuses;
}