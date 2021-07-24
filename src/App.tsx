import { useReducer, useState } from 'react';
import { Action, State, EachTodo } from './types';
import { v4 as uuid } from 'uuid';
import './App.scss';

const initialState = [
  {
    id: "1",
    value: 'work1',
    isDone: false
  },
  {
    id: "2",
    value: 'work2',
    isDone: false
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useReducer(todoReducer, initialState);
  const [val, setVal] = useState('');

  function todoReducer(state: State, action: Action) {
    switch(action.type) {
      case 'add':
        return [ ...state, action.payload ]
      case 'update':
        const tempState = [ ...state ]
        return tempState.map((itm: EachTodo) => {
          const tempItm: EachTodo = {...itm}
          if (itm.id === action.payload.id) {
            tempItm.isDone = itm.isDone ? false : true;
            return tempItm
          }
          else return tempItm
        })
      case 'remove':
        return [ ...state.filter((itm: EachTodo) => itm.id === action.payload.id) ]
      default:
        return [ ...state ]
    }
  }

  const handleAdd = () => {
    const id: string = uuid();
    setTodos({ type: 'add', payload: { id: id, value: val, isDone: false } })
    setVal('')
  }

  return (
    <div className="App">
      <header className="App-header">
        Todos
      </header>
      <input value={val} placeholder="please add the task here" onChange={e => setVal(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <div>
        {todos.map((each: EachTodo) => 
          <p 
            key={each.id} 
            style={{ textDecoration: each.isDone ? 'line-through' : '' }}
            onClick={() => setTodos({ type: 'update', payload: { ...each } })}
          >
            {each.value}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
