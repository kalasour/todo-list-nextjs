export interface Task {
    id: number
    type: TaskType
    name: string
    description: string
    isDone: boolean
}

export enum TaskType {
    High,
    Normal,
}