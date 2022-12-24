import { program } from "commander";

export const parse = () => {
  program.option("-f, --file <char>");
  program.parse();
  const options = program.opts();
  return { options };
};
