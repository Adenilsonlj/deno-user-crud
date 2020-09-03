import User from "../model/user.ts";
import db from "../config/base.ts";

const database = db.getDatabase;
const collectionUsers = database.collection("users");

export default class UserBusiness {
  async getAll(): Promise<User[]> {
    const users = await collectionUsers.find();
    if (users) {
      const list = users.length
        ? users.map((i: any) => {
          const { _id: { $oid }, name } = i;
          return { id: $oid, name };
        })
        : [];
      return list;
    }
    return [];
  }

  async get(id: string): Promise<User> {
    if (id.length != 24) {
      return {} as User;
    }
    const user = await collectionUsers.findOne({ _id: { "$oid": id } });
    if (user) {
      const { _id: { $oid }, name } = user;
      const item: User = {
        id: $oid,
        name: name,
      };
      return item;
    }
    return {} as User;
  }

  async insert(name: string): Promise<object> {
    const user = await collectionUsers.insertOne({
      name,
    });
    const { $oid } = user;
    const item = {
      id: $oid,
    };
    return item;
  }

  async update(obj: User): Promise<string> {
    const { matchedCount } = await collectionUsers.updateOne(
      { _id: { "$oid": obj.id } },
      { $set: { name: obj.name } },
    );
    if (matchedCount) {
      return "User updated";
    }
    return "Unable to update user";
  }

  async delete(id: string): Promise<string> {
    const deleteCount = await collectionUsers.deleteOne(
      { _id: { "$oid": id } },
    );
    if (deleteCount) {
      return "User deleted";
    }
    return "Unable to delete user";
  }
}
