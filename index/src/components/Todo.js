import Button from './Button'
var todo_data = {id:-1, title:"", description:"", important:false}


const Todo = ({ todo, saveTodo }) => {
    const changeEl = () => {
        document.getElementById("header").innerHTML = (todo_data.id !== -1 ? "Edit" : "Add") + " Todo"
        document.getElementById("title").value = todo_data.title
        document.getElementById("description").value = todo_data.description
        document.getElementById("important").classList = todo_data.important ? "checkbox checked" : "checkbox"
    }

    if (todo.id !== todo_data.id) {
        todo_data = {id: todo.id, title: todo.title, description: todo.description, important: todo.important}
        changeEl()
    }

    const onClick = () => {
        todo_data.important = !todo_data.important
        document.getElementById("important").classList = todo_data.important ? "checkbox checked" : "checkbox"
    }

    const onClaer = () => {
        todo_data = {id: -1, title: "", description: "", important: false}
        changeEl()
    }
 
    return (
        <div className="cev-todo">
            <h2 id="header">{todo_data.id !== -1 ? "Edit" : "Add"} Todo</h2>
            <div>
                <span>Title:</span>
                <input id="title" type="text" maxLength="50" defaultValue={todo_data.title} onChange={(e) => todo_data.title = e.target.value} />
            </div>
            <div>
                <span>description:</span>
                <textarea id="description" maxLength="300" defaultValue={todo_data.description} onChange={(e) => todo_data.description = e.target.value} ></textarea>
            </div>
            <div>
                <span>Important:</span>
                <button id="important" className={todo_data.important ? "checkbox checked" : "checkbox"} onClick={onClick} ></button>
            </div>
            <div>
                <Button name="Save" onClick={() => saveTodo(todo_data)} />
                <Button name="Clear" onClick={onClaer} />
            </div>
        </div>
    )
}


Todo.defaultProps = {
    todo: {id:-1, title:"", description:"", important:false}
}

export default Todo