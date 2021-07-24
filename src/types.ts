export interface EachTodo {
    id: string,
    value: string,
    isDone: boolean
}

export interface Action {
    type: 'add' | 'remove' | 'update',
    payload: EachTodo
}

export type State = EachTodo[]
