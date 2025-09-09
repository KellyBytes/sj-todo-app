import TodoCard from './TodoCard';

const TodoList = ({
  todos,
  selectedTab,
  handleDeleteTodo,
  handleCompleteTodo,
}) => {
  // const tab = 'All';
  const filterTodosList =
    selectedTab === 'All'
      ? todos
      : selectedTab === 'Completed'
      ? todos.filter((val) => val.complete)
      : todos.filter((val) => !val.complete);

  return (
    <>
      {/* {filterTodosList.map((todo, todoIndex) => { */}
      {filterTodosList.map((todo) => {
        return (
          <TodoCard
            // key={todoIndex}
            key={todo.id}
            // todoIndex={todoIndex}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
          />
        );
      })}
    </>
  );
};

export default TodoList;
