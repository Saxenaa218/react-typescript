export interface EachTodo {
    _id: string,
    value: string,
    isDone: boolean
}

export interface Action {
    type: 'add' | 'delete' | 'update',
    payload: EachTodo
}

export interface TodoProps{
    loading: boolean,
    todos: EachTodo[],
    updateTodos: (fieldChanged: string, updatedValue: boolean, object: EachTodo) => void,
    deleteTodos: (obj: EachTodo) => void
}

export interface TodoInputSectionProps {
    val: string,
    setVal: (e: string) => void,
    handleAdd: () => void
}

export type State = EachTodo[]
