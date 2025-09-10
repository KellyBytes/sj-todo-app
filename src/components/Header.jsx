import { useTheme } from '../context/ThemeContext';

const Header = (props) => {
  const { todos } = props;
  const { darkMode, toggleDarkMode } = useTheme();

  const todosLength = todos.length;
  const isTasksPlural = todosLength != 1;
  const taskOrTasks = isTasksPlural ? 'tasks' : 'task';

  return (
    <header className="header">
      <div className="header-top">
        <i
          className={`mode-icon bx bx-${darkMode ? 'sun' : 'moon'}`}
          onClick={toggleDarkMode}
        ></i>
      </div>
      <h1 className="text-gradient">
        You have {todosLength} open {taskOrTasks}.
      </h1>
    </header>
  );
};

export default Header;
