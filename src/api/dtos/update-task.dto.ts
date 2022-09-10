export interface UpdateTaskDTO {
    id: number;
    title?: string;
    description?: string;
    archived?: boolean;
    tags?: number[];
}