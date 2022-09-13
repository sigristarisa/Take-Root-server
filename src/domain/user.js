const dbClient = require("../helpers/dbClient");

const findUser = async (key, value) => {
  const foundUser = await dbClient.user.findUnique({
    where: {
      [key]: value,
    },
  });
  return foundUser;
};

const createUser = async (userName, email, password, userImage) => {
  const createdUser = await dbClient.user.create({
    data: { userName, email, password, userImage },
  });
  return createdUser;
};

module.exports = {
  findUser,
  createUser,
};
