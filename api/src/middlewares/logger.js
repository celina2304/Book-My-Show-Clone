import fs from "fs";
import path from "path";
import morgan from "morgan";

// create logs folder if not exists
const logsPath = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsPath)) {
  fs.mkdirSync(logsPath);
}
// write stream for production logs
const logStream = fs.createWriteStream(path.join(logsPath, "access.log"), { flags: "a" });

const loggerMiddleware =
  process.env.NODE_ENV === "production"
    ? morgan("combined", { stream: logStream }) // detailed logs to file
    : morgan("dev"); // colored console logs

export default loggerMiddleware;
