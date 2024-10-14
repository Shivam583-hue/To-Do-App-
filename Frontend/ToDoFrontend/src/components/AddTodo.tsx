import React, { useState } from 'react';
import axios from "axios";
import Bruh1 from '../Bruh1.png'
import Bruh4 from '../Bruh4.png'

function AddTodo() {
    const [todo, setTodo] = useState("");

    const handleAddTodo = async () => {
        if(todo.trim() === "") {return};
        try{
            const response = await axios.post('http://localhost:3110/api/todos',{title : todo, completed: false})
            console.log("To-do added",response.data);
            setTodo("")
        }catch(e){
            console.log("Error adding to-do",e);
        }
    };

    return (
        <div>
            <div className="flex pb-[60px]">
                <img src={Bruh4} style={{width : '50px'}}alt="Description of the image" />
                <img src={Bruh1} style={{width : '300px' , height: '40px'}}alt="Description of the image" />    
            </div> 
            <div className="flex justify-center items-center">
                <input 
                    style={{ width: "700px", height: "50px" }} 
                    type="text" 
                    placeholder="Add To-do" 
                    className="font-mono px-4 py-2 text-[#ecac6a] placeholder-gray-400 bg-gray-800 border-2 border-[#ecac6a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ecac6a] focus:border-[#ecac6a]"
                    value={todo} 
                    onChange={(e) => setTodo(e.target.value)} 
                />
                <button 
                    className="ml-2 p-2 bg-[#ecac6a] rounded-md" 
                    onClick={handleAddTodo} 
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        height="33px" 
                        viewBox="0 -960 960 960" 
                        width="33px" 
                        fill="#e8eaed"
                    >
                        <path d="M480.04-71.87q-84.95 0-159.38-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12 65 0 123 18.52t107.48 52.04l-66.37 67.37q-36.57-22.08-77.49-34.51-40.93-12.42-86.62-12.42-131.81 0-224.47 92.54-92.66 92.55-92.66 224.59 0 132.04 92.66 224.59 92.66 92.54 224.47 92.54 30.67 0 59.42-5.64t55.8-15.92l68.61 69.6q-41.96 20.48-87.8 31.72-45.83 11.24-95.99 11.24ZM754.5-154.5v-120h-120v-91h120v-120h91v120h120v91h-120v120h-91ZM423.28-291.22 249.7-464.8l62.45-62.7 111.13 111.13 402.15-403.15 62.7 62.69-464.85 465.61Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default AddTodo;

