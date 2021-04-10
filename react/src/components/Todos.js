import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem'

const Todos = ({ todo_list, deleteTodo, viewTodo }) => {
    const tl = todo_list.map((t) => <TodoItem key={t.id} todo={t} deleteTodo={deleteTodo} viewTodo={viewTodo} />)

    return (
        <div className="todos">
            <h2>All Todo's</h2>
            <ul>
                {tl}
            </ul>
        </div>
    )
}

Todos.defaultProps = {
    todo_list: []
}

export default Todos
