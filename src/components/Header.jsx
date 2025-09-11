import { useTheme } from '../context/ThemeContext';

const Header = (props) => {
  const { todos } = props;
  const { toggleDarkMode, theme, setTheme } = useTheme();

  const todosLength = todos.length;
  const isTasksPlural = todosLength != 1;
  const taskOrTasks = isTasksPlural ? 'tasks' : 'task';

  return (
    <header className="header">
      <div className="header-top">
        <div className="mode-icons">
          <i
            className={`mode-icon bx bx-${theme === 'dark' ? 'sun' : 'moon'}`}
            onClick={toggleDarkMode}
          ></i>
          <i
            className="mode-icon bx bx-laptop"
            onClick={() => setTheme('system')}
          ></i>
        </div>
      </div>
      <h1 className="text-gradient">
        You have {todosLength} open {taskOrTasks}.
      </h1>
    </header>
  );
};

export default Header;
