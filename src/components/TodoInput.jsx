import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarButton = forwardRef(({ value, onClick }, ref) => (
  <button type="button" onClick={onClick} ref={ref} aria-label="Pick date">
    <i className="fa-regular fa-calendar" />
  </button>
));

const TodoInput = ({ handleAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState(null);

  return (
    <form
      className="input-container"
      onSubmit={(e) => {
        e.preventDefault();
        if (!inputValue) return;
        handleAddTodo({
          input: inputValue,
          due: dueDate ? dueDate.toISOString().slice(0, 10) : '',
        });
        setInputValue('');
        setDueDate(null);
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add task"
      />
      <DatePicker
        selected={dueDate}
        onChange={(date) => setDueDate(date)}
        customInput={<CalendarButton />}
        popperPlacement="bottom-start"
      />
      <button type="submit">
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
};

export default TodoInput;
