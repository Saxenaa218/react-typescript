export interface EachTodo {
    _id: string,
    value: string,
    isDone: boolean
}

export interface Action {
    type: 'add' | 'delete' | 'update',
    payload: EachTodo
}

// export interface ApiDataParameter {
//     data: Object,
// }

export type State = EachTodo[]
