import { Application } from "https://deno.land/x/oak/mod.ts";
import routes from "./routes.ts" 

const app = new Application();

app.use(routes.routes());

app.use(routes.allowedMethods());

console.log("Server running on port 5000");

await app.listen({ port: 5000 });
