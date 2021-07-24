export interface EachTodo {
    id: string,
    value: string,
    isDone: boolean
}

export interface Action {
    type: string,
    payload: EachTodo
}

export type State = EachTodo[]
