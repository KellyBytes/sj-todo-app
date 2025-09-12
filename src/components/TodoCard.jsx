import { useState, useEffect, useRef, forwardRef } from 'react';
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

  // wrap editing area with ref
  const editRef = useRef(null);

  const CalendarButton = forwardRef(({ value, onClick }, ref) => (
    <button type="button" onClick={onClick} ref={ref} aria-label="Pick date">
      <i className="fa-regular fa-calendar" />
    </button>
  ));

  const isOverDue = (due) => {
    if (!due) return false;

    const today = new Date().toISOString().slice(0, 10);

    if (due === today) {
      return 'today';
    } else if (due < today) {
      return 'overdue';
    } else {
      return '';
    }
    // return due <= today;
  };

  // detect click outside
  useEffect(() => {
    if (!todo.editing) return;

    const handleClickOutside = (e) => {
      if (editRef.current && !editRef.current.contains(e.target)) {
        // cancel except Save button
        if (!e.target.closest('.save-btn')) {
          handleCancelEditTodo(todo.id);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [todo.editing, todo.id, handleCancelEditTodo]);

  return (
    <div className="card todo-item">
      {todo.editing ? (
        <div className="ref" ref={editRef}>
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
              className="save-btn"
              onClick={() => handleSaveEditTodo(todo.id, editValue, editDue)}
            >
              <h6>Save</h6>
            </button>
            {/* <button onClick={() => handleCancelEditTodo(todo.id)}>
              <h6>Cancel</h6>
            </button> */}
          </div>
        </div>
      ) : (
        <>
          <p
            onClick={() => {
              handleEditTodo(todo.id);
            }}
          >
            {todo.input}
          </p>
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
              className={isOverDue(todo.due)}
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
