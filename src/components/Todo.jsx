import { useState } from 'react'
import './css/Todo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import TodoItems from './TodoItems';
import header_icon from './assets/icon.png';
let count = 0;

const Todo = () => {
    
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        if (inputRef.current.value === "")
            return;
        setTodos([...todos,{
            no: ++count,
            text: inputRef.current.value,
            display: ""
        }]);
        inputRef.current.value = "";
        localStorage.setItem("todos_count", count);
    }

    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todos")));
        count = localStorage.getItem("todos_count");
    },[])

    useEffect(()=>{
        setTimeout(() => {
            localStorage.setItem("todos", JSON.stringify(todos));
        }, 100);
    },[todos])

    const handleEnter = async (e) => {
        if (e.key === 'Enter') await add();
    }

    return (
        <div className="todo">
            <div className="todo-header">To-Do List<img src={header_icon}/></div>
            <div className="todo-add">
                <input type="text" className="todo-input" ref={inputRef} placeholder="Add your task" onKeyDown={handleEnter}/>
                <div className="todo-add-btn" onClick={()=>{add()}}>ADD</div>
            </div>
            <div className="todo-list">
                {todos.map((item,index)=>{
                    return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
                })}
            </div>
        </div>
    )
}

export default Todo
