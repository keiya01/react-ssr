import path from "path";
import dotenv from "dotenv";
import cluster from "cluster";
import os from "os";
import { runServer } from "./server";

const isProd = process.env.NODE_ENV === "production";

dotenv.config({
  path: isProd
    ? path.join(__dirname, "../../../.env.prod")
    : path.join(__dirname, "../../../.env.dev")
});

const allocateWorker = () => {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
};

const registerErrorHandling = () => {
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      // eslint-disable-next-line no-console
      console.log(
        `Worker is restarted. pid: ${worker.process.pid} code: ${code}, signal: ${signal}`
      );
      cluster.fork();
    }
  });
};

const setup = () => {
  if (cluster.isMaster) {
    allocateWorker();
    registerErrorHandling();
  } else {
    runServer();
  }
};

if (isProd) {
  setup();
} else {
  runServer();
}

process.on("unhandledRejection", (reason, p) => {
  // eslint-disable-next-line no-console
  console.log("Unhandled Rejection at:", p, "reason:", reason);
});
