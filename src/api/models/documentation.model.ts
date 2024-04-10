export interface DocumentationModel {
    id: number;
    project_id: number;
    text: string;
    date: Date;
    created_at: Date;
}

export interface DocumentationCreateRequestModel {
    project_id: number;
    text: string;
    date: Date;
}

export interface DocumentationUpdateRequestModel {
    id: number;
    project_id: number;
    text: string;
    date: Date;
}