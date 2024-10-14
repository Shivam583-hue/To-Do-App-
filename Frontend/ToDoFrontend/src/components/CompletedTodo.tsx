import React from 'react';
import axios from 'axios';

interface CompletedTodoProps {
  title: string;
}

const CompletedTodo: React.FC<CompletedTodoProps> = ({ title }) => {
  const handleClick = async () => {
    try {
      const response = await axios.delete('http://localhost:3110/api/todos', {
        data: { title },
      });
      console.log("Todo deleted:", response.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <div className="w-[760px] flex h-14 bg-gray-900 rounded-lg items-center">
        <div className="text-[#ecac6a] h-14 text-lg font-mono line-through font-bold pl-5 pt-3.5 flex-grow">
          {title}
        </div>
        <div className="flex items-center pr-5">
          <button onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ecac6a"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompletedTodo;
