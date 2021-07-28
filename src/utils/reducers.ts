import { EachTodo, State, Action } from './types'

export function todoReducer(state: State, action: Action) {
    switch(action.type) {
        case 'add':
            return [ ...state, action.payload ];
        case 'update':
            const tempState = [ ...state ]
            return tempState.map((itm: EachTodo) => {
                const tempItm: EachTodo = {...itm}
                if (itm._id === action.payload._id) {
                    tempItm.isDone = itm.isDone ? false : true;
                    return tempItm
                }
                else return tempItm
            })
        case 'delete':
            return [ ...state.filter((itm: EachTodo) => itm._id !== action.payload._id) ]
        default:
            return [ ...state ]
    }
}