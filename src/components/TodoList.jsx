import TodoCard from './TodoCard';

const TodoList = (props) => {
  const { todos, selectedTab } = props;
  // const tab = 'All';

  const filterTodosList =
    selectedTab === 'All'
      ? todos
      : selectedTab === 'Completed'
      ? todos.filter((val) => val.complete)
      : todos.filter((val) => !val.complete);

  return (
    <div
      className={`todo-container ${
        filterTodosList.length === 0 ? 'empty' : ''
      }`}
    >
      {filterTodosList.map((todo) => (
        <TodoCard key={todo.id} todo={todo} {...props} />
      ))}
    </div>
  );
};

export default TodoList;
