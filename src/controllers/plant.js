import { findAllPlants, findAllCompanions } from "../domain/plant.js";

export const getAllPlants = async (req, res) => {
  const plants = await findAllPlants();

  res.json({ plants });
};

export const getAllCompanions = async (req, res) => {
  const companions = await findAllCompanions();

  res.json({ companions });
};
