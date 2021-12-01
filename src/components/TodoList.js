import React from 'react';
import {Link} from 'react-router-dom'

class TodoList extends React.Component {
    
    render() { 
        const { todos, title } = this.props
        return (
            <div className="blog-list">
                <h2>{title}</h2>
                {todos.map((todo) => (
                    <div className="blog-preview" key={todo._id}>
                        <Link to={`todo/${todo._id}`}>
                            <h2>{todo.title}</h2>
                            <p>{todo.description}</p>
                            <span>Todo Status:{todo.isCompleted ? 'Completed' : 'Completed'}</span>
                            <div>{todo.image}</div>
                        </Link>
                    </div>
                ))}
            </div>
        );;
    }
}
 
export default TodoList;
