export interface TaskDTO {
    id: number;
    title: string;
    description: string;
    archived: boolean;
    tags: number[];
}

export interface ResponseTasksDTO {
    message: string;
    data: TaskDTO[];
}