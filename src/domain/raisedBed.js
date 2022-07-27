import dbClient from "../helpers/dbClient.js";

export const createRaisedBed = async (raisedBedName, userId) => {
  const newRaisedBed = await dbClient.raisedBed.create({
    data: {
      name: raisedBedName,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return newRaisedBed;
};
