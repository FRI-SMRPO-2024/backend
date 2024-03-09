import logger from "../../utils/winston-logger";
import supabase from "../../utils/supabase";
import supabaseAdmin from "../../utils/supabase-admin";
import { Session } from "@supabase/supabase-js";
import { UserModel } from "../models/user.model";


export class AuthService {

  public static async signUp(email: string, password: string): Promise<any | null>{
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async login(email: string, password: string): Promise<any | null>{
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
    public static async logout(): Promise<void>{
        const { error } = await supabase.auth.signOut();
        if (error) {
        throw new Error(error.message);
        }
    }
    public static async changePassword(newPassword: string): Promise<void>{
        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) {
            throw new Error(error.message);
        }
    }
    public static async deleteUser(id:string): Promise<void>{
        const { error } = await supabaseAdmin.auth.admin.deleteUser(id)
        if (error) {
            throw new Error(error.message);
        }
    }
}
