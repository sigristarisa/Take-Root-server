const dbClient = require("../helpers/dbClient");

const createRaisedBed = async (userId, row, column) => {
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

const findRaisedBedById = async (raisedBedId) => {
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

const changeRaisedBedNameById = async (raisedBedId, name) => {
  const updatedRaisedBed = await dbClient.raisedBed.update({
    where: { id: raisedBedId },
    data: { name },
  });

  return updatedRaisedBed;
};

const findAllRaisedBedByUserId = async (userId) => {
  const foundRaisedBed = await dbClient.raisedBed.findMany({
    where: { userId },
    include: {
      square: {
        include: { plant: true },
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return foundRaisedBed;
};

const removeRaisedBedById = async (raisedBedId) => {
  const deletingRaisedBed = await dbClient.raisedBed.deleteMany({
    where: { id: raisedBedId },
  });

  return deletingRaisedBed;
};

const findOtherRaisedBeds = async (userId) => {
  const otherRaisedBeds = await dbClient.raisedBed.findMany({
    where: {
      userId: {
        not: userId,
      },
    },
    include: {
      user: true,
      square: {
        include: { plant: true },
      },
    },
  });

  return otherRaisedBeds;
};

module.exports = {
  createRaisedBed,
  findRaisedBedById,
  changeRaisedBedNameById,
  findAllRaisedBedByUserId,
  removeRaisedBedById,
  findOtherRaisedBeds,
};
