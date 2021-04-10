import Todos from "./components/Todos"
import Todo from "./components/Todo"

import { useState, useEffect } from 'react';


function App() {
    const [thetodo, setTheTodo] = useState({id: -1, title: "", description: "", important: false})

    const [todos_list, setTodo] = useState([])

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await fetch("http://localhost:8000/gats")
            const data = await res.json()

            console.log(data);
        }

        fetchTodos()
    })

    const deleteTodo = (id) => {
        setTodo(todos_list.filter((todo) => todo.id !== id))
    }

    const viewTodo = (id) => {
        setTheTodo(todos_list.find((t) => t.id === id))
    }

    const saveTodo = (todo_data) => {
        if (!todo_data.title || !todo_data.description) return;

        if (todos_list.find((t) => t.id === todo_data.id)) {
            todos_list.forEach((item) => {
                if (item.id === todo_data.id) {
                    item.title = todo_data.title
                    item.description = todo_data.description
                    item.important = todo_data.important
                }
            })
            setTodo([...todos_list])
        } else {
            if (todos_list.length > 0) {
                todo_data.id = todos_list[todos_list.length - 1].id + 1
            } else {
                todo_data.id = 1
            }
            setTodo([...todos_list, todo_data])
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

export default App;