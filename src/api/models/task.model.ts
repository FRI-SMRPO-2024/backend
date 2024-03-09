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

export enum TaskStatus {
    NULL = 'NULL',
    ACCEPTED = 'ACCEPTED',
    COMPLETED = 'COMPLETED',
    CREATED = 'CREATED',
    PENDING = 'PENDING'
}

