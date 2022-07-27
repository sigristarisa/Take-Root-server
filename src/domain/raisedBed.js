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
