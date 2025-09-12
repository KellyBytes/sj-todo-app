import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Tabs from './components/Tabs';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { v4 as uuidv4 } from 'uuid';

function App() {
  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: false },
  // ];

  const [todos, setTodos] = useState([
    {
      input: 'Hello! Add your first todo!',
      due: '',
      complete: true,
      editing: false,
    },
  ]);
  const [selectedTab, setSelectedTab] = useState('Open');
  const [ascendingSort, setAscendingSort] = useState(true);

  const handleAddTodo = (todo) => {
    let newTodoList = [
      ...todos,
      {
        id: uuidv4(),
        input: todo.input,
        due: todo.due,
        complete: false,
        editing: false,
      },
    ];
    newTodoList = sortTodosByDue(newTodoList, ascendingSort);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const sortTodosByDue = (todoList, ascendingSort = true) => {
    return [...todoList].sort((a, b) => {
      if (!a.due) {
        return ascendingSort ? -1 : 1;
      }
      if (!b.due) {
        return ascendingSort ? 1 : -1;
      }
      return new Date(a.due) - new Date(b.due);
    });
  };

  const toggleSort = () => {
    setAscendingSort((prev) => {
      const newSort = !prev;
      let newTodoList = sortTodosByDue(todos, newSort);

      setTodos(newTodoList);
      handleSaveData(newTodoList);

      return newSort;
    });
  };

  const handleCompleteTodo = (id) => {
    let newTodoList = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleEditTodo = (id) => {
    let newTodoList = todos.map((todo) =>
      todo.id === id ? { ...todo, editing: true } : todo
    );
    setTodos(newTodoList);
  };

  const handleSaveEditTodo = (id, newContent, newDue) => {
    let newTodoList = todos.map((todo) =>
      todo.id === id
        ? { ...todo, input: newContent, due: newDue, editing: false }
        : todo
    );
    newTodoList = sortTodosByDue(newTodoList, ascendingSort);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleCancelEditTodo = (id) => {
    let newTodoList = todos.map((todo) =>
      todo.id === id ? { ...todo, editing: false } : todo
    );
    setTodos(newTodoList);
  };

  const handleDeleteTodo = (id) => {
    let newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleSaveData = (currTodos) => {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }));
  };

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) return;
    let db = JSON.parse(localStorage.getItem('todo-app'));

    let updatedTodos = db.todos.map((todo) => {
      if (!todo.id) {
        return { ...todo, id: uuidv4() };
      }
      return todo;
    });

    localStorage.setItem(
      'todo-app',
      JSON.stringify({ ...db, todos: updatedTodos })
    );

    setTodos(updatedTodos);
  }, []);

  return (
    <>
      <ThemeProvider>
        <Header todos={todos} />
        <div className="grid-container">
          <Tabs
            todos={todos}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            toggleSort={toggleSort}
          />
          <TodoList
            todos={todos}
            selectedTab={selectedTab}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
            handleEditTodo={handleEditTodo}
            handleSaveEditTodo={handleSaveEditTodo}
            handleCancelEditTodo={handleCancelEditTodo}
          />
          <TodoInput handleAddTodo={handleAddTodo} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
