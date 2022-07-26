import dbClient from "./dbClient.js";

export const findUser = async (key, value) => {
  const foundUser = await dbClient.user.findUnique({
    where: {
      [key]: value,
    },
  });
  return foundUser;
};
