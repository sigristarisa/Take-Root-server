import dbClient from "../helpers/dbClient.js";

export const findAllPlants = async () => {
  const plants = await dbClient.plant.findMany();
  return plants;
};

export const findCompanionsByPlantId = async (plantId) => {
  const foundCompanions = await dbClient.companion.findMany({
    where: { plantId },
    include: {
      plant: true,
      companion: true,
    },
  });

  return foundCompanions;
};

export const findAllCompanions = async () => {
  const companions = await dbClient.companion.findMany();
  return companions;
};
