import rawPlants from "./rawPlants.js";
import rawCompanions from "./rawCompanions.js";
import rawNonCompanions from "./rawNonCompanions.js";
import dbClient from "../../src/helpers/dbClient.js";

const seed = async () => {
  await createPlants();
  await createCompanions();
  await createNonCompanions();
  process.exit(0);
};

const createPlants = async () => {
  const plants = [];

  for (const rawplant of rawPlants) {
    const plant = await dbClient.plant.create({ data: rawplant });
    plants.push(plant);
  }

  return plants;
};

const createCompanions = async () => {
  const companions = [];

  for (const rawCompanion of rawCompanions) {
    const companion = await dbClient.companion.create({
      data: {
        plant: {
          connect: { id: rawCompanion.plantId },
        },
        companion: {
          connect: { id: rawCompanion.companionId },
        },
      },
    });
    companions.push(companion);
  }
  return companions;
};

const createNonCompanions = async () => {
  const nonCompanions = [];

  for (const rawNonCompanion of rawNonCompanions) {
    const nonCompanion = await dbClient.nonCompanion.create({
      data: {
        plant: {
          connect: { id: rawNonCompanion.plantId },
        },
        nonCompanion: {
          connect: { id: rawNonCompanion.nonCompanionId },
        },
      },
    });
    nonCompanions.push(nonCompanion);
  }
  return nonCompanions;
};

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
