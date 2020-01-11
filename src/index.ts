import { startServer } from "./server";
import { syncDB } from "./orm";

async function startApp() {
  await syncDB();
  // await connectToBus();
  startServer();
}

startApp();
