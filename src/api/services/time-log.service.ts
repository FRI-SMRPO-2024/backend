import logger from "../../utils/winston-logger";
import { supabase } from "../../supabase";
import { supabaseAdmin } from "../../supabase";
import { Session, User } from "@supabase/supabase-js";
import { StoryService } from "./story.service";
import { TaskService } from "./task.service";
// import { TimeLogModel } from "../models/time-log.model";

export interface TimeLogModel {
  id: number;
  task_id: number;
  user_id: string;
  date: Date;
  time_from: Date;
  time_to: Date;
  created_at: Date;
}

export class TimeLogService {
  public static async getTimeLogs(): Promise<TimeLogModel[] | null> {
    const { data, error } = await supabase.from("time_log").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getTimeLogsByStory(
    storyId: number
  ): Promise<TimeLogModel[] | null> {
    const tasks = await TaskService.getTasksByStory(storyId);
    if (tasks && tasks.length > 0) {
      const taskIds = tasks.map((task) => task.id);
      const { data, error } = await supabase
        .from("time_log")
        .select("*")
        .in("task_id", taskIds);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    } else {
      return null;
    }
  }
  public static async getTimeLogsByTask(
    taskId: number
  ): Promise<TimeLogModel[] | null> {
    const { data, error } = await supabase
      .from("time_log")
      .select("*")
      .eq("task_id", taskId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getTimeLogsByUser(
    userId: string
  ): Promise<TimeLogModel[] | null> {
    const { data, error } = await supabase
      .from("time_log")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  public static async getTimeLogById(
    timeLogId: number
  ): Promise<TimeLogModel | null> {
    const { data, error } = await supabase
      .from("time_log")
      .select("*")
      .eq("id", timeLogId);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  }
  public static async createTimeLog(
    timeLog: TimeLogModel
  ): Promise<TimeLogModel | null> {
    const { data, error } = await supabase
      .from("time_log")
      .insert([timeLog])
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data ? data[0] : null;
  }
  public static async updateTimeLog(
    timeLog: TimeLogModel
  ): Promise<TimeLogModel | null> {
    const { data, error } = await supabase
      .from("time_log")
      .update(timeLog)
      .eq("id", timeLog.id)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data ? data[0] : null;
  }
  public static async deleteTimeLog(
    timeLogId: number
  ): Promise<TimeLogModel | null> {
    const { data, error } = await supabase
      .from("time_log")
      .delete()
      .eq("id", timeLogId)
      .select();
    if (error) {
      throw new Error(error.message);
    }
    return data ? data[0] : null
  }
}
