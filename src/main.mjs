import dotenv from "dotenv";
import { parse } from "./cli.mjs";
import { getFile } from "./figma.mjs";
import { writeJson } from "./json.mjs";
import { findTypeIsText, filterFont } from "./find.mjs";
dotenv.config();

const main = async () => {
  const { options } = parse();
  const { file } = options;
  if (file) {
    const data = await getFile(file);
    writeJson(`file_${file}`, data);
    const result = findTypeIsText(data.document).flat(Infinity);
    const font = filterFont(result);
    writeJson(`font_${file}`, font);
  }
};

main();
