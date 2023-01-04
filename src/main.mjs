import dotenv from "dotenv";
import { parse } from "./cli.mjs";
import { getFile, getTeamProjects, getProjectFiles } from "./figma.mjs";
import { writeJson } from "./json.mjs";

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
    const flatDocuments = flatten(result.document.children);
    const flatDocuments2 = flatDocuments.map((d) => {
      d[
        "url"
      ] = `https://www.figma.com/file/${file}/?node-id=${encodeURIComponent(
        d.id
      )}`;

      return d;
    });
    writeJson(`document_${file}`, flatDocuments2);
    return;
  }
};

function flatten(array, path = []) {
  return array.reduce(function (flattened, item) {
    const { children, ...other } = item;
    path = [...path, other.id];
    other["path"] = path;
    return flattened
      .concat([other])
      .concat(children ? flatten(children, path) : []);
  }, []);
}

main();
