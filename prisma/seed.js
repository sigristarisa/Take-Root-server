const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seed = async () => {
  await createPlants();
  process.exit(0);
};

const createPlants = async () => {
  const plants = [];

  const rawPlants = [
    {
      name: "blueberry",
      type: "fruit",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/blueberry.png",
      imagePerSquare: "/assets/plant-image/blueberry-perSquare.png",
    },
    {
      name: "raspberry",
      type: "fruit",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/raspberry.png",
      imagePerSquare: "/assets/plant-image/raspberry-perSquare.png",
    },
    {
      name: "strawberry",
      type: "fruit",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/strawberry.png",
      imagePerSquare: "/assets/plant-image/strawberry-perSquare.png",
    },
    {
      name: "basil",
      type: "herb",
      seedlingPerSquare: 4,
      image: "/assets/plant-image/basil.png",
      imagePerSquare: "/assets/plant-image/basil-perSquare.png",
    },
    {
      name: "chive",
      type: "herb",
      seedlingPerSquare: 9,
      image: "/assets/plant-image/chive.png",
      imagePerSquare: "/assets/plant-image/chive-perSquare.png",
    },
    {
      name: "cilantro",
      type: "herb",
      seedlingPerSquare: 9,
      image: "/assets/plant-image/cilantro.png",
      imagePerSquare: "/assets/plant-image/cilantro-perSquare.png",
    },
    {
      name: "dill",
      type: "herb",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/dill.png",
      imagePerSquare: "/assets/plant-image/dill-perSquare.png",
    },
    {
      name: "lavender",
      type: "herb",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/lavender.png",
      imagePerSquare: "/assets/plant-image/lavender-perSquare.png",
    },
    {
      name: "mint",
      type: "herb",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/mint.png",
      imagePerSquare: "/assets/plant-image/mint-perSquare.png",
    },
    {
      name: "oregano",
      type: "herb",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/oregano.png",
      imagePerSquare: "/assets/plant-image/oregano-perSquare.png",
    },
    {
      name: "parsley",
      type: "herb",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/parsley.png",
      imagePerSquare: "/assets/plant-image/parsley-perSquare.png",
    },
    {
      name: "rosemary",
      type: "herb",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/rosemary.png",
      imagePerSquare: "/assets/plant-image/rosemary-perSquare.png",
    },
    {
      name: "thyme",
      type: "herb",
      seedlingPerSquare: 4,
      image: "/assets/plant-image/thyme.png",
      imagePerSquare: "/assets/plant-image/thyme-perSquare.png",
    },
    {
      name: "beans",
      type: "vegetable",
      seedlingPerSquare: 4,
      image: "/assets/plant-image/beans.png",
      imagePerSquare: "/assets/plant-image/beans-perSquare.png",
    },
    {
      name: "beet",
      type: "vegetable",
      seedlingPerSquare: 9,
      image: "/assets/plant-image/beet.png",
      imagePerSquare: "/assets/plant-image/beet-perSquare.png",
    },
    {
      name: "broccoli",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/broccoli.png",
      imagePerSquare: "/assets/plant-image/broccoli-perSquare.png",
    },
    {
      name: "brussel sprout",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/brussel-sprout.png",
      imagePerSquare: "/assets/plant-image/brussel-sprout-perSquare.png",
    },
    {
      name: "cabbage",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/cabbage.png",
      imagePerSquare: "/assets/plant-image/cabbage-perSquare.png",
    },
    {
      name: "carrot",
      type: "vegetable",
      seedlingPerSquare: 9,
      image: "/assets/plant-image/carrot.png",
      imagePerSquare: "/assets/plant-image/carrot-perSquare.png",
    },
    {
      name: "cauliflower",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/cauliflower.png",
      imagePerSquare: "/assets/plant-image/cauliflower-perSquare.png",
    },
    {
      name: "corn",
      type: "vegetable",
      seedlingPerSquare: 4,
      image: "/assets/plant-image/corn.png",
      imagePerSquare: "/assets/plant-image/corn-perSquare.png",
    },
    {
      name: "cucumber",
      type: "vegetable",
      seedlingPerSquare: 2,
      image: "/assets/plant-image/cucumber.png",
      imagePerSquare: "/assets/plant-image/cucumber-perSquare.png",
    },
    {
      name: "eggplant",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/eggplant.png",
      imagePerSquare: "/assets/plant-image/eggplant-perSquare.png",
    },
    {
      name: "garlic",
      type: "vegetable",
      seedlingPerSquare: 4,
      image: "/assets/plant-image/garlic.png",
      imagePerSquare: "/assets/plant-image/garlic-perSquare.png",
    },
    {
      name: "kale",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/kale.png",
      imagePerSquare: "/assets/plant-image/kale-perSquare.png",
    },
    {
      name: "lettuce",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/lettuce.png",
      imagePerSquare: "/assets/plant-image/lettuce-perSquare.png",
    },
    {
      name: "onion",
      type: "vegetable",
      seedlingPerSquare: 4,
      image: "/assets/plant-image/onion.png",
      imagePerSquare: "/assets/plant-image/onion-perSquare.png",
    },
    {
      name: "peas",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/peas.png",
      imagePerSquare: "/assets/plant-image/peas-perSquare.png",
    },
    {
      name: "pepper",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/pepper.png",
      imagePerSquare: "/assets/plant-image/pepper-perSquare.png",
    },
    {
      name: "potato",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/potato.png",
      imagePerSquare: "/assets/plant-image/potato-perSquare.png",
    },
    {
      name: "pumpkin",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/pumpkin.png",
      imagePerSquare: "/assets/plant-image/pumpkin-perSquare.png",
    },
    {
      name: "radish",
      type: "vegetable",
      seedlingPerSquare: 9,
      image: "/assets/plant-image/radish.png",
      imagePerSquare: "/assets/plant-image/radish-perSquare.png",
    },
    {
      name: "spinach",
      type: "vegetable",
      seedlingPerSquare: 9,
      image: "/assets/plant-image/spinach.png",
      imagePerSquare: "/assets/plant-image/spinach-perSquare.png",
    },
    {
      name: "sweet potato",
      type: "vegetable",
      seedlingPerSquare: 2,
      image: "/assets/plant-image/sweet-potato.png",
      imagePerSquare: "/assets/plant-image/sweet-potato-perSquare.png",
    },
    {
      name: "tomato",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/tomato.png",
      imagePerSquare: "/assets/plant-image/tomato-perSquare.png",
    },
    {
      name: "zucchini",
      type: "vegetable",
      seedlingPerSquare: 1,
      image: "/assets/plant-image/zucchini.png",
      imagePerSquare: "/assets/plant-image/zucchini-perSquare.png",
    },
  ];

  for (const rawplant of rawPlants) {
    const plant = await prisma.plant.create({ data: rawplant });
    plants.push(plant);
  }

  console.log("how many plants", plants.length);

  return plants;
};

seed()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  })
  .finally(() => process.exit(1));
