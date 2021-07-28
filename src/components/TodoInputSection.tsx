import React from 'react';
import { TodoInputSectionProps } from '../utils/types';

const TodoInputSection: React.FC<TodoInputSectionProps> = (props: TodoInputSectionProps): JSX.Element => {
    const { val, setVal, handleAdd } = props
    return (
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
    )
}

export default React.memo(TodoInputSection);