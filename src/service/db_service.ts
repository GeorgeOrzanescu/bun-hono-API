import { MyDatabaseUsers } from "../db/db";

export class dbService {
  private _db: MyDatabaseUsers;

  constructor(db: MyDatabaseUsers) {
    this._db = db;
  }

  public getUsers() {
    const statement = this._db.db.prepare("SELECT * FROM users");
    return statement;
  }

  public addUser(name: string, surname: string) {
    const statement = this._db.db.exec(
      "INSERT INTO users (name, surname) VALUES ($name, $surname)",
      {
        $name: name,
        $surname: surname,
      }
    );
    return { name: name, surname: surname };
  }

  public getUserById() {
    const query = this._db.db.query("SELECT * FROM users WHERE id = ?");
    return query;
  }
}
