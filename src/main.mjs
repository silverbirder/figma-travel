import dotenv from "dotenv";
import { parse } from "./cli.mjs";
import { getFile } from "./figma.mjs";
import { writeJson } from "./json.mjs";
dotenv.config();

const main = async () => {
  const { options } = parse();
  const { file } = options;
  if (file) {
    const data = await getFile(file);
    writeJson(`file_${file}`, data);
  }
};

main();
