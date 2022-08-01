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
    include: {
      square: { include: { plant: true } },
    },
  });
  return newRaisedBed;
};

export const findRaisedBedById = async (raisedBedId) => {
  const foundRaisedBed = await dbClient.raisedBed.findFirst({
    where: { id: raisedBedId },
    include: {
      square: {
        include: { plant: true },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
  return foundRaisedBed;
};

export const deleteAllSquaresById = async (raisedBedId) => {
  const deletingRaisedBed = await dbClient.raisedBed.update({
    where: { id: raisedBedId },
    data: {
      square: {
        deleteMany: {},
      },
    },
    include: {
      square: true,
    },
  });

  return deletingRaisedBed;
};
