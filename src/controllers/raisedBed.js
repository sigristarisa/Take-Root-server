import dbClient from "../helpers/dbClient.js";

export const createRaisedBed = async (req, res, next) => {
  const { name } = req.body;

  const createdRaisedBed = await dbClient.raisedBed.create({
    data: {
      name: name,
    },
    include: {
      square: true,
    },
  });
  res.json({ data: createdRaisedBed });
  next();
};
