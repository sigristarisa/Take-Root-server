const { findAllPlants, findAllCompanions } = require("../domain/plant");

const getAllPlants = async (req, res) => {
  try {
    const plants = await findAllPlants();
    res.json({ plants });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

const getAllCompanions = async (req, res) => {
  try {
    const companions = await findAllCompanions();
    res.json({ companions });
  } catch (error) {
    console.error("What happened?: ", error.message);
    res.status(500).json({ error: "ERROR – Something went wrong" });
  }
};

module.exports = {
  getAllPlants,
  getAllCompanions,
};
