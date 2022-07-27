import dbClient from "../helpers/dbClient.js";

export const findUser = async (key, value) => {
  const foundUser = await dbClient.user.findUnique({
    where: {
      [key]: value,
    },
  });
  return foundUser;
};

export const createUser = async (userName, email, password, userImage) => {
  const createdUser = await dbClient.user.create({
    data: { userName, email, password, userImage },
  });
  return createdUser;
};
