import dbInit from "./adapters/output/db/init";
import { startExpressApp } from "./adapters/input/rest";
import { seedDB } from "./adapters/output/db/seed";


// Initialize database
(async () => {
  await dbInit();
  await seedDB();
})();

// Start express server
startExpressApp();
