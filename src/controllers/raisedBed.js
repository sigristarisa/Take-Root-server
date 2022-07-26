import dbClient from "../helpers/dbClient.js";

export const createRaisedBed = async (req, res, next) => {
  const { name } = req.body;

  try {
    const createdRaisedBed = await dbClient.raisedBed.create({
      data: {
        name: name,
      },
      include: {
        square: true,
      },
    });
    res.json({ data: createdRaisedBed });
  } catch (error) {
    console.error("something went wrong", error.message);
    res.status(500).json({ error: "Unable to create new raised bed" });
  }
  next();
};
