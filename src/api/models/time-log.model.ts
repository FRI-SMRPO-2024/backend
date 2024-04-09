export interface TimeLogModel {
    id: number;
    task_id: number;
    user_id: string;
    date: Date;
    time_from: Date;
    time_to: Date;
    description: string;
    created_at: Date;
}

export interface TimeLogCreateRequestModel {
    task_id: number;
    user_id: string;
    date: Date;
    time_from: Date;
    time_to: Date;
    description: string;
}

export interface TimeLogUpdateRequestModel {
    task_id: number;
    user_id: string;
    date: Date;
    time_from: Date;
    time_to: Date;
    description: string;
}