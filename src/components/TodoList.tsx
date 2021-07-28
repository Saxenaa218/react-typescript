import React from 'react';
import { Icon } from '@mdi/react'
import { mdiCloseCircle } from '@mdi/js'
import { EachTodo, TodoProps } from '../utils/types';

const TodoLists: React.FC<TodoProps> = (props: TodoProps): JSX.Element => {
    const { loading, todos, updateTodos, deleteTodos } = props;
    return (
        <div className="todo-elements" data-testid="elements">
            {loading ? 
                'loading...' 
                : 
                todos.map((each: EachTodo, index: number) => 
                    <div className="todo-element" key={each._id}>
                        <input 
                            defaultChecked={each.isDone}
                            type="checkbox" 
                            className="checkbox"
                            onChange={(e: any) => updateTodos('isDone', e.target.checked, each)}
                            data-testid="checkbox"
                        />
                        <span
                            key={each._id} 
                            style={ each.isDone ? { textDecoration: 'line-through', color: 'lightgray' } : {} }
                        >
                            {each.value}
                        </span>
                        <span className="delete-todo" data-testid={`delete-${index}`} onClick={() => deleteTodos(each)}>
                            <Icon path={mdiCloseCircle} size="1.3rem" />
                        </span>
                    </div>
                )
            }
        </div>
    )
}

export default React.memo(TodoLists);