import { useState } from 'react';

const TodoInput = (props) => {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');

  return (
    // <div className="input-container">
    <form
      className="input-container"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputValue) return;
        handleAddTodo({
          input: inputValue,
          due: dueDate || '',
        });
        setInputValue('');
        setDueDate('');
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
    // </div>
  );
};

export default TodoInput;
