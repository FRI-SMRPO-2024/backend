import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";

export interface DocumentationModel {
  id: number;
  project_id: number;
  text: string;
  date: Date;
  created_at: Date;
}

export class DocumentationService {
  public static async getDocumentationByProject(
    projectId: number
  ): Promise<DocumentationModel[] | null> {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .eq("project_id", projectId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getDocumentationById(
    documentationId: number
  ): Promise<DocumentationModel | null> {
    const { data, error } = await supabase
      .from("documentation")
      .select("*")
      .eq("id", documentationId);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async createDocumentation(
    projectId: number,
    text: string,
    date: Date
  ): Promise<DocumentationModel | null> {
    const { data, error } = await supabase
      .from("documentation")
      .insert([
        {
          project_id: projectId,
          text: text,
          date: date,
        },
      ])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data ? data[0] : null;
  }
  public static async updateDocumentation(
    documentationId: number,
    project_id: number,
    text: string,
    date: Date
  ): Promise<DocumentationModel | null> {
    const { data, error } = await supabase
      .from("documentation")
      .update({ project_id, text, date })
      .eq("id", documentationId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data ? data[0] : null;
  }
  public static async deleteDocumentation(
    documentationId: number
  ): Promise<DocumentationModel | null> {
    const { data, error } = await supabase
      .from("documentation")
      .delete()
      .eq("id", documentationId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data ? data[0] : null;
  }
}
