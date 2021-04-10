import Button from './Button'

const TodoItem = ({ todo, deleteTodo, viewTodo }) => {
    return (
        <li style={todo.important ? {borderColor: "#51EAFF"}:{}} onClick={() => viewTodo(todo.id)} >
            <span>{todo.title}</span>
            <Button iconName="delete" onClick={() => deleteTodo(todo.id)} />
        </li>
    )
}

TodoItem.defaultProps = {
    todo: {id:-1, title:"", description:"", important:false}
}

export default TodoItem
