import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

function App() {
  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: false },
  // ];

  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true },
  ]);
  const [selectedTab, setSelectedTab] = useState('Open');

  const handleAddTodo = (newTodo) => {
    const newTodoList = [...todos, { input: newTodo, complete: false }];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleCompleteTodo = (index) => {
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['complete'] = true;
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleEditTodo = (index) => {
    // step 1 - create a duplicate array
    // step 2 - create a new variable and assign the current value of the todo that needs editing to it
    // step 3 - set the input value equal to the current value of the todo in question
    // step 4 - copy the delete functionality and filter out the todo @ index from the duplicate array
    // step 5 - set the todo state equal to the filtered duplicate array
    // step 6 - now the user can edit the todo and re-add it when satisfied
  };

  const handleDeleteTodo = (index) => {
    let newTodoList = todos.filter((_val, valIndex) => {
      return valIndex !== index; // 'index'以外を残す
    });
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleSaveData = (currTodos) => {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }));
  };

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) return;
    let db = JSON.parse(localStorage.getItem('todo-app'));
    console.log(db);
    setTodos(db.todos);
  }, []);

  return (
    <>
      <Header todos={todos} />
      <Tabs
        todos={todos}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <TodoList
        todos={todos}
        selectedTab={selectedTab}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  );
}

export default App;
