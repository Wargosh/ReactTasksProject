export interface CreateTaskDTO {
    title: string;
    description: string;
    archived: boolean;
    tags?: number[];
}