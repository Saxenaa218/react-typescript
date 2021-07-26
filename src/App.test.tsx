import { 
  fireEvent, 
  render, 
  screen,
  waitForDomChange,
  waitForElementToBeRemoved
} from '@testing-library/react';
import App from './App';

describe('testing elements', () => {
  test('heading is rendered', () => {
    render(<App/>)
    expect(screen.getByText(/Todos/i)).toBeInTheDocument() 
  })
  test('rendering add button', () => {
    render(<App/>)
    expect(screen.getByTestId('add-btn')).toBeInTheDocument() 
  })
  test('rendering input', () => {
    render(<App/>)
    expect(screen.getByTestId('input')).toBeInTheDocument() 
  })
})

describe('testing CRUD', () => {
  test('rendered successfully', () => {
    render(<App />);
    const linkElement = screen.getByText(/Todos/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  test('after fetching and rendering', async() => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const todoList = screen.getByTestId('elements');
    expect(todoList.children.length).toBeGreaterThanOrEqual(0);  
  })
  
  test('adding todo', async() => {
    render(<App/>)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const input = screen.getByTestId("input");
    const todoList = screen.getByTestId('elements');
    const prevTodoLength = todoList.children.length;

    fireEvent.change(input, { target: { value: 'text for test' } });
    fireEvent.click(screen.getByTestId('add-btn'));

    await waitForDomChange()

    const now = screen.getByTestId('elements').children.length
    expect(screen.getByTestId('input')).toHaveValue('')
    expect(now).toEqual(prevTodoLength+1);
  })

  test('deleting todo', async() => {
    render(<App/>)
    await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

    const deleteBtn = screen.getByTestId('delete-'+'0');
    const todoList = screen.getByTestId('elements');
    const prevTodoLength = todoList.children.length;

    fireEvent.click(deleteBtn);

    await waitForDomChange()

    const now = screen.getByTestId('elements').children.length
    expect(now).toEqual(prevTodoLength-1);
  })
})