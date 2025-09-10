import { useState } from 'react';

const TodoCard = (props) => {
  const {
    todo,
    todoIndex,
    handleDeleteTodo,
    handleCompleteTodo,
    handleEditTodo,
    handleSaveEditTodo,
    handleCancelEditTodo,
  } = props;
  const [editValue, setEditValue] = useState(todo.input);

  return (
    <div className="card todo-item">
      {todo.editing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <div className="todo-buttons">
            <button onClick={() => handleSaveEditTodo(todoIndex, editValue)}>
              <h6>Save</h6>
            </button>
            <button onClick={() => handleCancelEditTodo(todoIndex)}>
              <h6>Cancel</h6>
            </button>
          </div>
        </>
      ) : (
        <>
          <p
            onClick={() => {
              handleEditTodo(todoIndex);
            }}
          >
            {todo.input}
          </p>
          <div className="todo-buttons">
            <button
              // disabled={todo.complete}
              className={todo.complete ? 'completed' : ''}
              onClick={() => {
                handleCompleteTodo(todoIndex);
              }}
            >
              <h6>{todo.complete ? 'Reopen' : 'Done'}</h6>
            </button>
            <button
              onClick={() => {
                handleDeleteTodo(todoIndex);
              }}
            >
              <h6>Delete</h6>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoCard;
