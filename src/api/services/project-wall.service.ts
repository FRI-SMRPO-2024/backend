import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { ProjectWallModel } from "../models/project-wall.model";

export class ProjectWallService {
    public static async getProjectWall(projectId: number): Promise<ProjectWallModel[] | null> {
        const { data, error } = await supabase
            .from("project_wall")
            .select("*")
            .eq("project_id", projectId)
            .order('created_at', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    public static async getProjectWallById(projectWallId: number): Promise<ProjectWallModel | null> {
        const { data, error } = await supabase
            .from("project_wall")
            .select("*")
            .eq("id", projectWallId);
        if (error) {
            throw new Error(error.message);
        }
        return data ? data[0] : null;
    }
    public static async addToProjectWall(projectId: number, userId: string, content: string): Promise<ProjectWallModel | null> {
        const { data, error } = await supabase
            .from("project_wall")
            .insert([{ project_id: projectId, user_id: userId, content: content }])
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data ? data[0] : null;
    }
    public static async deleteFromProjectWall(projectWallId: number): Promise<ProjectWallModel | null> {
        const { data, error } = await supabase
            .from("project_wall")
            .delete()
            .eq("id", projectWallId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data ? data[0] : null;
    }
    public static async updateProjectWall(projectWallId: number, content: string): Promise<ProjectWallModel | null> {
        const { data, error } = await supabase
            .from("project_wall")
            .update({ content: content })
            .eq("id", projectWallId)
            .select();
        if (error) {
            throw new Error(error.message);
        }
        return data ? data[0] : null;
    }
}