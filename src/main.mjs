import dotenv from "dotenv";
import { parse } from "./cli.mjs";
import { getFile, getTeam, getProjectFiles } from "./figma.mjs";
import { readJson, writeJson } from "./json.mjs";
import { findTypeIsText, filterFont } from "./find.mjs";
dotenv.config();

const main = async () => {
  const { options } = parse();
  const { file, team } = options;
  if (team) {
    let data;
    try {
      data = readJson(`team_${team}`);
    } catch {
      console.log(`getTeam...`);
      const data = await getTeam(team);
      writeJson(`team_${team}`, data);
    }
    const { projects } = data;
    const data2 = await getProjectFiles(projects[0].id);
    writeJson(`project_${team}`, data2);
    const { files } = data2;
    const data3 = files[0].key;
    console.log({ data3 });
    const data4 = await getFile(data3);
    writeJson(`file_${data3}`, data4);
  }
  // if (file) {
  //   console.log(`getFile...`);
  //   const data = await getFile(file);
  //   console.log(`file writeJson...`);
  //   writeJson(`file_${file}`, data);
  //   const result = findTypeIsText(data.document).flat(Infinity);
  //   const font = filterFont(result);
  //   console.log(`font writeJson...`);
  //   writeJson(`font_${file}`, font);
  // }
};

main();
