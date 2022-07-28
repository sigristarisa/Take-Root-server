import { allPlants } from "../domain/plant.js";

export const getAllPlants = async (req, res) => {
  const plants = await allPlants();

  res.json({ plants });
};
