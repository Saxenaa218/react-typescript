import { useEffect, useReducer, useState } from 'react';
import { Action, State, EachTodo } from './types';
import { v4 as uuid } from 'uuid';
import './App.scss';

const baseUrl = 'http://localhost:3005/';

const App: React.FC = () => {
  
  const [val, setVal] = useState('');
  const [todos, setTodos] = useReducer(todoReducer, []);

  const askQuery = () => {
    fetch(baseUrl+'get-todos')
      .then(result => result.json())
      .then(json => json.data.forEach((each: EachTodo) => setTodos({ type: 'add', payload: each })))
      // .then(json => console.log(json.data))
      .catch(error => console.log(error))

    }
    
  useEffect(() => {
    askQuery()
  }, [])

  function todoReducer(state: State, action: Action) {
    switch(action.type) {
      // case 'setAll':
      //   return [ ...action.payload ];
      case 'add':
        return [ ...state, action.payload ];
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
    if (val === '') return;
    const id: string = uuid();
    setTodos({ type: 'add', payload: { id: id, value: val, isDone: false } })
    setVal('')
  }

  return (
    <div className="App">
      <header className="App-header">
        Todos
      </header>
      <div className="todo-input-section">
        <input 
          className="todo-input" 
          value={val} 
          placeholder="please add the task here" 
          onChange={e => setVal(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div className="todo-elements">
        {todos.map((each: EachTodo) => 
          <div className="todo-element" key={each.id}>
            <input 
              type="checkbox" 
              className="checkbox"
              onClick={() => setTodos({ type: 'update', payload: { ...each } })}
            />
            <span
              key={each.id} 
              style={ each.isDone ? { textDecoration: 'line-through', color: 'lightgray' } : {} }
            >
              {each.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
