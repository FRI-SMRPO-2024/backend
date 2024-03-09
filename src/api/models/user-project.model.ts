export interface UserProjectModel{
    id: number;
    project_id: number;
    user_id: string;
    role: ProjectRole;
    created_at: Date;
}

export enum ProjectRole {
    NULL = 'NULL',
    DEVELOPER = 'DEVELOPER',
    SCRUM_MASTER = 'SCRUM_MASTER',
    PRODUCT_OWNER = 'PRODUCT_OWNER'
}
