import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime, { async } from "regenerator-runtime";

import Todos from "./Todos"
import Todo from "./Todo"

var csrf_token = document.currentScript.getAttribute("csrf_token");

function App() {
    const [thetodo, setTheTodo] = useState({id: -1, title: "", description: "", important: false})

    const [todos_list, setTodos] = useState([])

    useEffect(() => {
        const getTodos = async () => {
            const todosFS = await fetchTodos()
            setTodos(todosFS.data)
        }

        getTodos()
    }, [])

    const fetchTodos = async () => {
        const res = await fetch("/api/gats/")
        const data = await res.json()

        return data
    }

    const deleteTodo = async (id) => {
        await fetch("/api/dt/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrf_token
            },
            body: JSON.stringify({
                tid: id
            })
        })
        setTodos(todos_list.filter((todo) => todo.id !== id))
    }

    const viewTodo = (id) => {
        setTheTodo(todos_list.find((t) => t.id === id))
    }

    const saveTodo = async (todo_data) => {
        if (!todo_data.title || !todo_data.description) return;

        if (todos_list.find((t) => t.id === todo_data.id)) {
            todos_list.forEach((item) => {
                if (item.id === todo_data.id) {
                    item.title = todo_data.title
                    item.description = todo_data.description
                    item.important = todo_data.important
                }
            })

            await fetch("/api/st/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrf_token
                },
                body: JSON.stringify({
                    tid: todo_data.id,
                    title: todo_data.title,
                    description: todo_data.description,
                    important: todo_data.important
                })
            })

            setTodos([...todos_list])
        } else {
            const res = await fetch("/api/st/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrf_token
                },
                body: JSON.stringify({
                    title: todo_data.title,
                    description: todo_data.description,
                    important: todo_data.important
                })
            })

            const data = await res.json()
            if (data.todo) {
                setTodos([...todos_list, data.todo])
            }
        }

        setTheTodo({id: -1, title: "", description: "", important: false})
    }

    return (
        <div className="app">
            <Todos todo_list={todos_list} deleteTodo={deleteTodo} viewTodo={viewTodo} />
            <Todo todo={thetodo} saveTodo={saveTodo} />
        </div>
    );
}

export default App

ReactDOM.render(<App/>, document.getElementById("root"))