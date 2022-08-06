import { Database } from "bun:sqlite";

export class MyDatabaseUsers {
  private _db: Database;

  constructor(name: string) {
    this._db = new Database(name);
    this._db.run(
      `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, surname TEXT)`
    );
  }

  public get db(): Database {
    return this._db; //little weird cuz will be _db.db but no inspiration at that point
  }
}
