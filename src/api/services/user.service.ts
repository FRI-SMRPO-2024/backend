import logger from "../../utils/winston-logger";
import supabase from "../../utils/supabase";
import { User } from "@supabase/supabase-js";
import { UserModel } from "../models/user.model";

export class UserService {
  public static async getUsers(): Promise<UserModel[] | null>{
    const { data, error } = await supabase
      .from("users_data")
      .select("*")
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getUser(id: string): Promise<UserModel | null>{
    const { data, error } = await supabase
      .from("users_data")
      .select("*")
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async updateUser(id: string, email: string): Promise<UserModel | null>{
    const { data, error } = await supabase
      .from("users_data")
      .update({ email })
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async deleteUser(id: string): Promise<UserModel | null>{
    const { data, error } = await supabase.from("users_data").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
