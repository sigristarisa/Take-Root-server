import dbClient from "./dbClient.js";

export const findUserByEmail = async (email) => {
  const foundUser = await dbClient.user.findUnique({
    where: {
      email,
    },
  });
  return foundUser;
};
