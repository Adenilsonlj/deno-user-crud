import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  get,
  getAll,
  insert,
  update,
  remove,
} from "./controller/user-controller.ts";

const routes = new Router();

routes
  .get("/api/users", getAll)
  .get("/api/users/:id", get)
  .post("/api/users", insert)
  .put("/api/users/:id", update)
  .delete("/api/users/:id", remove);

export default routes;
