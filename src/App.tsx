import { useEffect, useReducer, useState, useCallback } from 'react';
import axios from 'axios';
import ReactGA from 'react-ga';
import { EachTodo, State, Action } from './utils/types';
import TodoList from './components/TodoList'
import TodoInputSection from './components/TodoInputSection'
import { todoReducer } from './utils/reducers'
import { GET_TODOS, ADD_TODOS, UPDATE_TODOS, DELETE_TODOS, GOOGLE_TRACKING_ID } from './utils/constants'
import './App.scss';

ReactGA.initialize(GOOGLE_TRACKING_ID, { testMode: process.env.NODE_ENV === 'test' });
ReactGA.pageview(window.location.pathname + window.location.search);

const App: React.FC = () => {
  
  const [val, setVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useReducer(todoReducerWrapper, []);

  function todoReducerWrapper(state: State, action: Action) {
    ReactGA.event({ category: 'usability', action: action.type, label: JSON.stringify(action) })
    return todoReducer(state, action)
  }
  
  const fetchTodos = (): void => {
    setLoading(true)
    axios.get(GET_TODOS)
      .then((json: any) => {
        if (!json.data.data.error) json.data.data.forEach((each: EachTodo) => setTodos({ type: 'add', payload: each }))
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }

  const addTodos = (data: any): void => {
    axios.post(ADD_TODOS, { ...data })
      .then(json => {
        const { isDone, value, _id } = json.data.data
        setTodos({ type: 'add', payload: { isDone, value, _id } })
        setVal('')
      })
      .catch(error => {
        console.error(error)
      })
  }

  const updateTodos = (fieldChanged: string, updatedValue: boolean, object: EachTodo): void => {
    const updateObject: any = { ...object };
    updateObject[fieldChanged] = updatedValue;
    axios.put(UPDATE_TODOS, { ...updateObject })
      .then((json: any) => setTodos({ type: 'update', payload: updateObject }))
      .catch(error => console.error(error))
  }

  const deteleTodos = (obj: EachTodo): void => {
    axios.delete(DELETE_TODOS, { data: {_id: obj._id} })
    .then((json: any) => setTodos({ type: 'delete', payload: obj }))
    .catch(error => console.error(error))
  }
  
  useEffect((): void => {
    fetchTodos()
  }, [])

  const handleAdd = (): void => {
    if (val === '') return;
    addTodos({ value: val, isDone: false })
  }

  return (
    <div className="App">
      <header className="App-header">Todos</header>
      <TodoInputSection val={val} setVal={setVal} handleAdd={useCallback(handleAdd, [val])} />
      <TodoList loading={loading} todos={todos} updateTodos={useCallback(updateTodos, [])} deleteTodos={useCallback(deteleTodos, [])} />
    </div>
  );
}

export default App;