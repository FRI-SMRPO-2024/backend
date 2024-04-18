import { UserModel } from "./user.model";

export interface ProjectWallModel {
    id: number;
    project_id: number;
    user_id: string;
    content: string;
    created_at: Date;
}
export interface ProjectWallReturnModel {
    id: number;
    project_id: number;
    content: string;
    created_at: Date;
    user: UserModel;
}