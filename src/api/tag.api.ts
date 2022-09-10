import { CreateTagDTO } from "./dtos/create-tag.dto"
import { TagDTO, ResponseTagsDTO } from "./dtos/tag.dto"

export class TagAPI {
    // private static serverURI: string = 'http://localhost:3000'
    private static serverURI: string = 'https://project-notes-web.herokuapp.com'

    public static async getAllTags(): Promise<ResponseTagsDTO> {
        const resp = await fetch(`${this.serverURI}/tags`, {
            method: 'GET',
        })

        const data = resp.json()
        return data
    }

    public static async saveTag(tag: CreateTagDTO): Promise<TagDTO> {
        const resp = await fetch(`${this.serverURI}/tags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tag)
        })

        const data = resp.json()
        return data
    }

    public static async deleteTagFromTask(tagId: number) {
        await fetch(`${this.serverURI}/tags/${tagId}`, {
            method: 'DELETE',
        })
    }
}