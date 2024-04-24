export interface TimeLogModel {
    id: number;
    task_id: number;
    user_id: string;
    date: Date;
    time_from: string;
    time_to: string;
    estimated_time_left: number;
    description: string;
    created_at: Date;
}

export interface TimeLogCreateRequestModel {
    task_id: number;
    user_id: string;
    date: Date;
    time_from: string;
    time_to: string;
    estimated_time_left: number;
    description: string;
}

export interface TimeLogUpdateRequestModel {
    task_id: number;
    user_id: string;
    date: Date;
    time_from: string;
    time_to: string;
    estimated_time_left: number;
    description: string;
}