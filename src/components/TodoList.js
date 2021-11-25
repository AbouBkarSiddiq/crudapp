import React from 'react';
import {Link} from 'react-router-dom'

class TodoList extends React.Component {
    
    
    render() { 
        return (
            <div className="blog-list">
                <h2>{this.props.title}</h2>
                {this.props.todos.map((todo) => (
                    <div className="blog-preview" key={todo._id}>
                        <Link to={`todo/${todo._id}`}>
                            <h2>{todo.title}</h2>
                            <p>{todo.description}</p>
                            <div>{todo.isCompleted}</div>
                            <div>{todo.image}</div>
                        </Link>
                    </div>
                ))}
            </div>
        );;
    }
}
 
export default TodoList;
