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
      {filterTodosList.map((todo, todoIndex) => {
        // mapのidを使用すると，allのときとfilterのときでidが異なるため内容でフィルタする
        const tempTodoIndex = todos.findIndex(
          (val) => val.input === todo.input
        );

        return (
          <TodoCard
            key={todoIndex}
            todoIndex={tempTodoIndex}
            todo={todo}
            {...props}
          />
        );
      })}
    </div>
  );
};

export default TodoList;
