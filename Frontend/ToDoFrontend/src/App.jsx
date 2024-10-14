import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import DisplayTodo from "./components/DisplayTodo";
import CompletedTodo from "./components/CompletedTodo";
import axios from "axios";

function App() {
  const [toDo, setToDo] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:3110/api/todos");
        console.log("To-do pulled", response.data);
        setToDo(response.data);
      } catch (e) {
        console.log("Error getting to-do", e);
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    function updatePendingTodos(todos) {
      const pending = todos.filter((todo) => !todo.completed).map((todo) => todo.title);
      setPendingTodos(pending);
    }

  
    function updateCompletedTodos(todos) {
      const completed = todos.filter((todo) => todo.completed).map((todo) => todo.title);
      setCompletedTodos(completed);
    }

    updatePendingTodos(toDo);
    updateCompletedTodos(toDo);
  }, [toDo]);

  return (
    <div className="bg-[#2c2e34] min-h-screen pt-4 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-20">
      <div className="flex justify-center">
        <AddTodo />
      </div>
      <div className="pl-[390px] pt-[30px] ">
        <h1 className="text-gray-400 font-black font-mono text-[40px]">PENDING TASKS</h1>
      </div>
      <div>
        {pendingTodos.map((title) => (
          <DisplayTodo key={title} title={title} />
        ))}
      </div>
      <div className="pl-[390px] pt-[80px] ">
        <h1 className="text-gray-400 font-black font-mono text-[40px]">COMPLETED TASKS</h1>
      </div>
      <div>
        {completedTodos.map((title) => (
          <CompletedTodo key={title} title={title} />
        ))}
      </div>
    </div>
  );
}

export default App;
