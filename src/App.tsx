import { useEffect, useReducer, useState } from 'react';
import { Action, State, EachTodo } from './types';
import axios from 'axios';
import { Icon } from '@mdi/react'
import { mdiCloseCircle } from '@mdi/js'
import './App.scss';

const baseUrl = 'http://localhost:3005/';

const App: React.FC = () => {
  
  const [val, setVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useReducer(todoReducer, []);
  
  const fetchTodos = () => {
    setLoading(true)
    axios.get(baseUrl+'get-todos')
      .then((json: any) => {
        if (!json.data.data.error) json.data.data.forEach((each: EachTodo) => setTodos({ type: 'add', payload: each }))
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  const addTodos = (data: any) => {
    axios.post(baseUrl+'add-todos', { ...data })
      .then(json => {
        const { isDone, value, _id } = json.data.data
        setTodos({ type: 'add', payload: { isDone, value, _id } })
        setVal('')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const updateTodos = (fieldChanged: string, updatedValue: boolean, object: EachTodo) => {
    const updateObject: any = { ...object };
    updateObject[fieldChanged] = updatedValue;
    axios.put(baseUrl+'update-todos', { ...updateObject })
      .then((json: Object) => setTodos({ type: 'update', payload: updateObject }))
      .catch(error => console.log(error))
  }

  const deteleTodos = (obj: EachTodo) => {
    axios.delete(baseUrl+'delete-todos', { data: {_id: obj._id} })
    .then((json: any) => {
      setTodos({ type: 'delete', payload: obj })
    })
    .catch(error => console.log(error))
  }
  
  useEffect(() => {
    fetchTodos()
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

  const handleAdd = () => {
    if (val === '') return;
    // const id: string = uuid();
    addTodos({ value: val, isDone: false })
    // setTodos({ type: 'add', payload: { id: id, value: val, isDone: false } })
    // setVal('')
  }

  return (
    <div className="App">
      <header className="App-header">
        Todos
      </header>
      <div className="todo-input-section">
        <input 
          className="todo-input" 
          data-testid="input"
          value={val} 
          placeholder="please add the task here" 
          onChange={e => setVal(e.target.value)} 
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd} data-testid="add-btn">Add</button>
      </div>
      <div className="todo-elements" data-testid="elements">
        {loading ? 'loading...' : todos.map((each: EachTodo, index: number) => 
          <div className="todo-element" key={each._id}>
            <input 
              defaultChecked={each.isDone}
              type="checkbox" 
              className="checkbox"
              onChange={(e: any) => updateTodos('isDone', e.target.checked, each)}
              data-testid="checkbox"
              // onClick={() => setTodos({ type: 'update', payload: { ...each } })}
            />
            <span
              key={each._id} 
              style={ each.isDone ? { textDecoration: 'line-through', color: 'lightgray' } : {} }
            >
              {each.value}
            </span>
            <span className="delete-todo" data-testid={`delete-${index}`} onClick={() => deteleTodos(each)}>
              <Icon path={mdiCloseCircle} size="1.3rem" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
