import * as Figma from "figma-api";

const instance = () => {
  const { FIGMA_API_PAT: personalAccessToken } = process.env;
  if (!personalAccessToken) {
    throw new Error("Not Found FIGMA_API_PAT");
  }
  return new Figma.Api({
    personalAccessToken,
  });
};

export const getFile = async (file) => {
  const api = instance();
  return await api.getFile(file);
};
