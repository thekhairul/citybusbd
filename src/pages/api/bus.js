import findBus from "@/lib/busFinder";
import connectDB from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await connectDB;
  const db = client.db('citybus_bd');
  const collection = db.collection('dhaka');
  switch (req.method) {
    case 'GET':
      const { from, to } = req.query;
      const fromTo = [from, to].filter(Boolean);
      if (fromTo.length === 1) res.status(500).send({ message: 'Bad request. Please provide both from and to locations.' });
      // const filter = { stopages: { $all: [{ $elemMatch: { id: from } }, { $elemMatch: { id: to } }] } };
      // const buses = await collection.find(filter).toArray();
      const buses = findBus(from, to, fromTo.length === 0);
      res.status(200).json(buses);
      break;
    case 'POST':
      const result = await collection.insertOne(req.body);
      res.status(201).json(result.insertedId);
      break;
    default:
      res.status(405).send({ message: 'Only GET and POST requests allowed' });
      break;
  }
}