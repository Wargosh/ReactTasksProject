import { CreateTaskDTO } from "./dtos/create-task.dto"
import { DeleteTagFromTaskDTO } from "./dtos/delete-tag.dto"
import { TaskDTO, ResponseTasksDTO } from "./dtos/task.dto"
import { UpdateTaskDTO } from "./dtos/update-task.dto"

export class TaskAPI {
    // private static serverURI: string = 'http://localhost:3000'
    private static serverURI: string = 'https://project-notes-web.herokuapp.com'

    public static async getAll(): Promise<ResponseTasksDTO> {
        const resp = await fetch(`${this.serverURI}/tasks`, {
            method: 'GET',
        })

        const data = resp.json()
        return data
    }

    public static async getTasksFromStatus(status: boolean): Promise<ResponseTasksDTO> {
        const resp = await fetch(`${this.serverURI}/tasks/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ archived: status })
        })

        const data = resp.json()
        return data
    }

    public static async saveTask(task: CreateTaskDTO): Promise<TaskDTO> {
        console.log('saving');
        const resp = await fetch(`${this.serverURI}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        
        const data = resp.json()
        console.log('saved', data);
        return data
    }

    public static async updateTask(taskId: number, task: UpdateTaskDTO): Promise<TaskDTO> {
        const resp = await fetch(`${this.serverURI}/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = resp.json()
        return data
    }

    public static async deleteTask(taskId: number) {
        await fetch(`${this.serverURI}/tasks/${taskId}`, {
            method: 'DELETE',
        })
    }

    public static async deleteTagFromTask(task: DeleteTagFromTaskDTO) {
        const resp = await fetch(`${this.serverURI}/tasks/removetag`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = resp.json()
        return data
    }
}