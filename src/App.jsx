import { useState, useEffect } from 'react';
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

  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Open');

  const handleAddTodo = (newTodo) => {
    const newTodoList = [
      ...todos,
      { id: uuidv4(), input: newTodo, complete: false },
    ];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleCompleteTodo = (index) => {
    // update/edit/modify
    let newTodoList = [...todos];
    let completedTodo = todos.find((todo) => todo.id === index);
    completedTodo['complete'] = !completedTodo['complete'];
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleDeleteTodo = (index) => {
    // let newTodoList = todos.filter((_val, valIndex) => {
    let newTodoList = todos.filter((todo) => {
      return todo.id !== index; // 'index'以外を残す
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
