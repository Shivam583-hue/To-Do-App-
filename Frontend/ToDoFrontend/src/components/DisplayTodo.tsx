import React from 'react';
import axios from 'axios';

interface DisplayTodoProps {
  title: string;
}

const DisplayTodo: React.FC<DisplayTodoProps> = ({ title }) => {
  const handleClick = async () => {
    try {
      const response = await axios.put('http://localhost:3110/api/todos', { title,completed: true });
      console.log("To-do completed", response.data);
    } catch (e) {
      console.log("Error updating to-do", e);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-5">
        <div className="w-[760px] flex h-14 bg-gray-900 rounded-lg items-center">
          <div className="text-[#ecac6a] h-14 text-lg font-mono font-bold pl-5 pt-3.5 flex-grow">
            {title}
          </div>
          <div className="flex items-center pr-5">
            <button onClick={handleClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ecac6a"
              >
                <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayTodo;
