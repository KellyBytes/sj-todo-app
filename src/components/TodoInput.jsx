import { useState, useRef } from 'react';

const TodoInput = (props) => {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const hiddenInputRef = useRef(null);

  const handleOpenDatePicker = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.showPicker();
    }
  };

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
      <button type="button" onClick={handleOpenDatePicker}>
        <i className="fa-regular fa-calendar"></i>
      </button>
      <input
        type="date"
        ref={hiddenInputRef}
        style={{ display: 'none' }}
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
