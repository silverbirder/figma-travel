import dotenv from "dotenv";
import { parse } from "./cli.mjs";
import { getFile, getTeamProjects, getProjectFiles } from "./figma.mjs";
import { findTypeIsText, filterFont } from "./find.mjs";
import { Parser } from "json2csv";
import fs from "fs";

dotenv.config();

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number);
  return new Array(length)
    .fill()
    .map((_, i) => array.slice(i * number, (i + 1) * number));
};

const main = async () => {
  const { options } = parse();
  const { file, team, project } = options;

  if (team) {
    const { projects } = await getTeamProjects(team);
    const projectFiles = await Promise.all(
      projects.map(async (p) => await getProjectFiles(p.id))
    );
    const files = projectFiles.map((projectFile) => projectFile.files).flat();
    // const fields = ["id", "name"];
    // const opts = { fields };
    // const parser = new Parser(opts);
    // const csv = parser.parse(projects);
    // fs.writeFileSync(`./data/${team}.csv`, csv, "utf8");
    // const fields = ["key", "name", "thumbnail_url", "last_modified"];
    // const opts = { fields };
    // const parser = new Parser(opts);
    // const csv = parser.parse(files);
    // fs.writeFileSync(`./data/projects.csv`, csv, "utf8");
    // const sliceFiles = sliceByNumber(files, 3);
    const sliceFiles = sliceByNumber(files, 3).slice(0, 1);
    let result = [];
    for (let i = 0; i < sliceFiles.length; i++) {
      const files = sliceFiles[i];
      const data = await Promise.all(
        files.map(async (file) => await getFile(file.key))
      );
      result.push(data);
    }
    const flatResult = result.flat();
    console.log({ flatResult });
    return;
  }

  if (project) {
    const { files } = await getProjectFiles(project);
    // const sliceFiles = sliceByNumber(files, 3);
    const sliceFiles = sliceByNumber(files, 3).slice(0, 1);
    let result = [];
    for (let i = 0; i < sliceFiles.length; i++) {
      const files = sliceFiles[i];
      const data = await Promise.all(
        files.map(async (file) => await getFile(file.key))
      );
      result.push(data);
    }
    const flatResult = result.flat();
    console.log({ flatResult });
    return;
  }

  if (file) {
    const result = await getFile(file);
    const data = findTypeIsText(result.document).flat(Infinity);
    const font = filterFont(data);
    console.log({ font });
    return;
  }
};

main();
