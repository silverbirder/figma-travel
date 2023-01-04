import fs from "fs";

export const writeJson = (name, data) => {
  fs.writeFileSync(`./data/${name}.json`, JSON.stringify(data), "utf8");
};
export const writeCsv = (name, data) => {
  fs.writeFileSync(`./data/${name}.csv`, data);
};
export const readJson = (name) => {
  return JSON.parse(fs.readFileSync(`./data/${name}.json`, "utf8"));
};
