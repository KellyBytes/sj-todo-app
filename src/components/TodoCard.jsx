const TodoCard = (props) => {
  const { todo, todoIndex, handleDeleteTodo, handleCompleteTodo } = props;

  return (
    <div className="card todo-item">
      <p>{todo.input}</p>
      <div className="todo-buttons">
        <button
          disabled={todo.complete}
          onClick={() => {
            handleCompleteTodo(todoIndex);
          }}
        >
          <h6>Done</h6>
        </button>
        <button
          onClick={() => {
            handleDeleteTodo(todo.id);
          }}
        >
          <h6>Delete</h6>
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
