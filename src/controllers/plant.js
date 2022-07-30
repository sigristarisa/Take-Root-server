import {
  findAllPlants,
  findCompanionsByPlantId,
  findAllCompanions,
} from "../domain/plant.js";

export const getAllPlants = async (res) => {
  const plants = await findAllPlants();

  res.json({ plants });
};

export const getCompanionsByPlantId = async (req, res) => {
  const plantId = Number(req.params.plantId);
  const foundCompanions = await findCompanionsByPlantId(plantId);

  res.json({ companions: foundCompanions });
};

export const getAllCompanions = async (res) => {
  const companions = await findAllCompanions();

  res.json({ companions });
};
