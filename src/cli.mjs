import { program } from "commander";

export const parse = () => {
  program.option("-f, --file <char>");
  program.option("-t, --team <char>");
  program.option("-p, --project <char>");
  program.parse();
  const options = program.opts();
  return { options };
};
