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
  public static async updateUser(id: string, username: string, first_name: string, last_name:string): Promise<null>{
    const { data, error } = await supabase
      .from("users_data")
      .update({ username, first_name, last_name })
      .eq("id", id)
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async updateLastLogin(id: string): Promise<null>{
    const { data, error } = await supabase
      .from("users_data")
      .update({ last_login: new Date() })
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async setRole(id: string, is_admin: boolean): Promise<null>{
    const { data, error } = await supabase
      .from("users_data")
      .update({ is_admin: is_admin })
      .eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
