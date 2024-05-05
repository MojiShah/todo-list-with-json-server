import React from 'react';
import './Todo.css';
import { MdDelete } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";


export default function Todo(props) {

    function checkTodo(id) {
        props.checkTodo(id);
    }

    return (
        <div className={`${props.todoIsDone ? 'todo completed' : 'todo'}`}>
            <li className='todo-item'>
                {props.todoContent}
            </li>
            <button
                className="complete-btn"
                onClick={() => checkTodo(props.todoId)}
            >
                <FaCheckSquare className='checked-icon' />
            </button>
            <button
                className="trash-btn"
                onClick={() => props.deleteTodo(props.todoId)}
            >
                <MdDelete className='trash-icon' />
            </button>
        </div>
    )
}
