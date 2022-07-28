import dbClient from "../helpers/dbClient.js";

export const allPlants = async () => {
  const plants = await dbClient.plant.findMany();
  return plants;
};
