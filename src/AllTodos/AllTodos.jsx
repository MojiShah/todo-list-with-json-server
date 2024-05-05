import React, { useState, useEffect } from 'react';
import './AllTodos.css';
import Todo from './todo/Todo';
import { FaPlus } from "react-icons/fa";
import Swal from 'sweetalert2';

export default function AllTodos() {
    const [todoInput, setTodoInput] = useState('');
    const [todoItems, setTodoItems] = useState([]);
    const [todoStatus, setTodoStatus] = useState('all');

    useEffect(() => {
        getAllTodo();
    }, []);

    // useEffect(()=>{
    //     setTodoStatus(todoStatus)
    // },[todoStatus]);

    const getAllTodo = async () => {
        await fetch('http://localhost:4000/todos')
            .then(res => res.json())
            .then(data => {
                console.log('datamoji', data);
                setTodoItems(data);
            })
    }


    const addTodo = async () => {
        console.log('addTodo loop');
        const newTodoItem = {
            id: (Math.floor(100 * Math.random())).toString(),
            isDone: false,
            title: todoInput
        };

        await fetch('http://localhost:4000/todos', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newTodoItem)
        }).then(res => console.log(res));

    }

    const checkTodoHandler = async id => {
        console.log('checkTodo loop');
        let targetTodo = todoItems.find(todoItem => todoItem.id == id);
        // console.log('targetTodo', { ...targetTodo, isDone : !targetTodo.isDone})
        await fetch(`http://localhost:4000/todos/${targetTodo.id}`,
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    ...targetTodo,
                    isDone: !targetTodo.isDone
                })
            }
        ).then(res => res.json())
            .then(data => console.log('data', data))

        getAllTodo();
    }

    const deleteTodoHandler = async id => {
        let targetTodo = todoItems.find(todoItem => todoItem.id == id);
        console.log('targetTodo', { ...targetTodo, isDone: !targetTodo.isDone })

        await fetch(`http://localhost:4000/todos/${targetTodo.id}`, {
            method: "DELETE"
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    title: "Todo removed successfully!",
                    icon: "success"
                });
            }
        });


        getAllTodo()
    }

    const changeTodoStatus = e => {
        let currentStatus = e.target.value;
        setTodoStatus(currentStatus);
    }

    return (
        <>
            <form className='form'>
                <div className="form-content">
                    <input
                        type="text"
                        className='form-input'
                        value={todoInput}
                        onChange={e => setTodoInput(e.target.value)}
                    />
                    <button
                        className='add-btn'
                        type='submit-btn'
                        onClick={addTodo}
                    >
                        <FaPlus className='add-btn__content' />
                    </button>
                    <div className='selection'>
                        <select
                            name='todos'
                            onChange={e => changeTodoStatus(e)}
                        >
                            <option value="all">All</option>
                            <option value="completed">Completed</option>
                            <option value="incompleted">Incompleted</option>
                        </select>
                    </div>
                </div>
            </form>

            <div className='todos'>
                <ul className="todo-items">

                    {todoStatus === 'all' &&
                        todoItems.map(todoItem => <Todo
                            key={todoItem.id}
                            todoContent={todoItem.title}
                            todoId={todoItem.id}
                            todoIsDone={todoItem.isDone}
                            checkTodo={checkTodoHandler}
                            deleteTodo={deleteTodoHandler}
                        />)
                    }

                    {todoStatus === 'completed' &&
                        todoItems.filter(todoItem => todoItem.isDone === true)
                            .map(todoItem => <Todo
                                key={todoItem.id}
                                todoContent={todoItem.title}
                                todoId={todoItem.id}
                                todoIsDone={todoItem.isDone}
                                checkTodo={checkTodoHandler}
                                deleteTodo={deleteTodoHandler}
                            />)
                    }
                    {todoStatus === 'incompleted' &&
                        todoItems.filter(todoItem => todoItem.isDone === false)
                            .map(todoItem => <Todo
                                key={todoItem.id}
                                todoContent={todoItem.title}
                                todoId={todoItem.id}
                                todoIsDone={todoItem.isDone}
                                checkTodo={checkTodoHandler}
                                deleteTodo={deleteTodoHandler}
                            />)
                    }
                </ul>
            </div>
        </>
    )
}
