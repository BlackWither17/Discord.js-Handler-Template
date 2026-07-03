/* eslint-disable no-console */
import chalk from "chalk";

const timestamp = () => chalk.gray(`[${new Date().toISOString()}]`);

const logger = {
  info: (...args) => console.log(timestamp(), chalk.blue("INFO:"), ...args),
  warn: (...args) => console.log(timestamp(), chalk.yellow("WARN:"), ...args),
  error: (...args) => console.log(timestamp(), chalk.red("ERROR:"), ...args),
  success: (...args) => console.log(timestamp(), chalk.green("SUCCESS:"), ...args),
  log: (...args) => console.log(...args),
};

export default logger;
