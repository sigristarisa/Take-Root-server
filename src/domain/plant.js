import dbClient from "../helpers/dbClient.js";

export const findAllPlants = async () => {
  const plants = await dbClient.plant.findMany();
  return plants;
};

export const findCompanionsByPlantId = async (plantIdArr) => {
  const companionArr = [];

  for (const plantId of plantIdArr) {
    const foundCompanions = await dbClient.companion.findMany({
      where: { plantId },
    });
    companionArr.push(foundCompanions);
  }
  return companionArr.flat();
};

export const findAllCompanions = async () => {
  const companions = await dbClient.companion.findMany();
  return companions;
};
