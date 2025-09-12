import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoCard = (props) => {
  const {
    todo,
    handleDeleteTodo,
    handleCompleteTodo,
    handleEditTodo,
    handleSaveEditTodo,
    handleCancelEditTodo,
  } = props;
  const [editValue, setEditValue] = useState(todo.input);
  const [editDue, setEditDue] = useState(todo.due);

  const CalendarButton = forwardRef(({ value, onClick }, ref) => (
    <button type="button" onClick={onClick} ref={ref} aria-label="Pick date">
      <i className="fa-regular fa-calendar" />
    </button>
  ));

  return (
    <div className="card todo-item">
      {todo.editing ? (
        <>
          <div className="todo-content">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <DatePicker
              selected={editDue}
              onChange={(date) => setEditDue(date.toISOString().slice(0, 10))}
              customInput={<CalendarButton />}
              popperPlacement="bottom-start"
            />
          </div>
          <div className="todo-buttons">
            <button
              onClick={() => handleSaveEditTodo(todo.id, editValue, editDue)}
            >
              <h6>Save</h6>
            </button>
            <button onClick={() => handleCancelEditTodo(todo.id)}>
              <h6>Cancel</h6>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="todo-content">
            <p
              onClick={() => {
                handleEditTodo(todo.id);
              }}
            >
              {todo.input}
            </p>
          </div>
          <div className="todo-grid">
            <div className="todo-buttons">
              <button
                // disabled={todo.complete}
                className={todo.complete ? 'completed' : ''}
                onClick={() => {
                  handleCompleteTodo(todo.id);
                }}
              >
                <h6>{todo.complete ? 'Reopen' : 'Done'}</h6>
              </button>
              <button
                onClick={() => {
                  handleDeleteTodo(todo.id);
                }}
              >
                <h6>Delete</h6>
              </button>
            </div>
            <span
              onClick={() => {
                handleEditTodo(todo.id);
              }}
            >
              {todo.due}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoCard;
