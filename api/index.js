import app from "./src/server.js";

// configs
import config from "./src/config/config.js";
import connectMongo from "./src/config/db.config.js";

// port
const PORT = config.port || 5000;

// Database connection
connectMongo().then(() => {
  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
