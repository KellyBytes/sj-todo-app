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
    { input: 'Hello! Add your first todo!', complete: true, editing: false },
  ]);
  const [selectedTab, setSelectedTab] = useState('Open');

  const handleAddTodo = (content) => {
    const newTodoList = [
      ...todos,
      { input: content, complete: false, editing: false },
    ];
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleCompleteTodo = (index) => {
    let newTodoList = [...todos];
    let completedTodo = todos[index];
    completedTodo['complete'] = !completedTodo['complete'];
    newTodoList[index] = completedTodo;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleEditTodo = (index) => {
    let newTodoList = [...todos];
    newTodoList[index].editing = true;
    setTodos(newTodoList);
  };

  const handleSaveEditTodo = (index, newContent) => {
    let newTodoList = [...todos];
    newTodoList[index].input = newContent;
    newTodoList[index].editing = false;
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  };

  const handleCancelEditTodo = (index) => {
    let newTodoList = [...todos];
    newTodoList[index].editing = false;
    setTodos(newTodoList);
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
      <div className="grid-container">
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
          handleEditTodo={handleEditTodo}
          handleSaveEditTodo={handleSaveEditTodo}
          handleCancelEditTodo={handleCancelEditTodo}
        />
        <TodoInput handleAddTodo={handleAddTodo} />
      </div>
    </>
  );
}

export default App;
