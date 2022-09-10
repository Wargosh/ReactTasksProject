export interface TagDTO {
    id: number;
    name: string;
}

export interface ResponseTagsDTO {
    message: string;
    data: TagDTO[];
}