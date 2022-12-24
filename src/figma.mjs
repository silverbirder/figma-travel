import * as Figma from "figma-api";
import { readJson, writeJson } from "./json.mjs";

const instance = () => {
  const { FIGMA_API_PAT: personalAccessToken } = process.env;
  if (!personalAccessToken) {
    throw new Error("Not Found FIGMA_API_PAT");
  }
  return new Figma.Api({
    personalAccessToken,
  });
};

const cache = async (key, getFn) => {
  let data;
  try {
    console.log(`read with ${key}...`);
    data = readJson(key);
    console.log(`cache hit ${key}`);
  } catch {
    console.log(`getFn with ${key}...`);
    data = await getFn();
    writeJson(key, data);
  }
  return data;
};

export const getFile = async (file) => {
  const api = instance();
  const getFn = async () => {
    return await api.getFile(file);
  };
  return await cache(`file_${file}`, getFn);
};

export const getTeamProjects = async (team) => {
  const api = instance();
  const getFn = async () => {
    return await api.getTeamProjects(team);
  };
  return await cache(`team-projects_${team}`, getFn);
};

export const getProjectFiles = async (project) => {
  const api = instance();
  const getFn = async () => {
    return await api.getProjectFiles(project);
  };
  return await cache(`project-files_${project}`, getFn);
};
