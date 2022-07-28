import dbClient from "../helpers/dbClient.js";

export const createRaisedBed = async (userId, row, column) => {
  const newRaisedBed = await dbClient.raisedBed.create({
    data: {
      rows: Number(row),
      columns: Number(column),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  console.log("is this new?: ", newRaisedBed);
  return newRaisedBed;
};

export const findRaisedBedById = async (raisedBedId) => {
  const foundRaisedBed = await dbClient.raisedBed.findFirst({
    where: { id: raisedBedId },
  });

  return foundRaisedBed;
};
