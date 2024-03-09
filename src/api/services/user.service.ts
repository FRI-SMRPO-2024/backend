import logger from "../../utils/winston-logger";
import supabase from "../../utils/supabase";
import { User } from "@supabase/supabase-js";
import { UserModel } from "../models/user.model";

export class UserService {
  public static async addUser(user: UserModel): Promise<User | null>{
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: user.id,
          email: user.email,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          is_admin: user.is_admin,
        },
      ]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getUser(id: string): Promise<User | null>{
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async updateUser(id: string, email: string): Promise<User | null>{
    const { data, error } = await supabase
      .from("users")
      .update({ email })
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async deleteUser(id: string): Promise<User | null>{
    const { data, error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
