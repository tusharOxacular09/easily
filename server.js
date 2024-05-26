import { server } from "./index.js";
import "dotenv/config.js";

// Listening the server
server.listen(process.env.PORT, () => {
  console.log(`Hello Users, Server is running on port ${process.env.PORT} 🚀.`);
});
