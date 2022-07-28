import dbClient from "../helpers/dbClient.js";

export const createRaisedBed = async (userId) => {
  const newRaisedBed = await dbClient.raisedBed.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return newRaisedBed;
};

export const findRaisedBedById = async (raisedBedId) => {
  const foundRaisedBed = await dbClient.raisedBed.findFirst({
    where: { id: raisedBedId },
  });

  return foundRaisedBed;
};
