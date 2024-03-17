export interface TaskModel {
    id: number;
    story_id: number;
    asignee_id: string;
    status: TaskStatus;
    description: string;
    time_estimation: number;
    time_needed: number;
    created_at: Date;
}

export interface TaskCreateModel {
    story_id: number;
    assignee_id: string;
    description: string;
    time_estimation: number;
}

export interface TaskUpdateModel {
    time_estimation: number;
    time_needed: number;
    description: string;
    status: TaskStatus;
    assignee_id: string;
}

export enum TaskStatus {
    NULL = 'NULL',
    ACCEPTED = 'ACCEPTED',
    COMPLETED = 'COMPLETED',
    CREATED = 'CREATED',
    PENDING = 'PENDING'
}

