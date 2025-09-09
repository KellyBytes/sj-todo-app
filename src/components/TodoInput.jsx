import { useState } from 'react';

const TodoInput = (props) => {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState('');

  return (
    // <div className="input-container">
    <form
      className="input-container"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputValue) return;
        handleAddTodo(inputValue);
        setInputValue('');
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add task"
      />
      <button type="submit">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
    // </div>
  );
};

export default TodoInput;
