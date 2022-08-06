import { Hono } from "hono";
import { MyDatabaseUsers } from "./db/db";
import { dbService as service } from "./service/db_service";

const app = new Hono();
const port = parseInt(process.env.PORT) || 3000;

const db = new MyDatabaseUsers("users.sqlite");
const dbService = new service(db);

const home = app.get("/users", (c) => {
  const allUsers = dbService.getUsers();
  return c.json({ users: allUsers.all() });
});

app.get("users/:id", (c) => {
  const idParam = c.req.param("id");
  const user = dbService.getUserById();
  const foundUser = user.get(idParam);
  if (foundUser === null) {
    c.status(404);
    return c.json({ userFound: false });
  }
  return c.json({ userFound: foundUser });
});

app.post("/newUser", async (c) => {
  const body = await c.req.parseBody();
  const name = body["name"];
  const surname = body["surname"];
  const newUser = dbService.addUser(name, surname);

  return c.json({ message: "Success", user: newUser });
});
console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: home.fetch,
};
