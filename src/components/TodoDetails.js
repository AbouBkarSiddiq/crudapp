import React from 'react';
import { Link } from 'react-router-dom'
import { getTodoDetail } from '../redux/actions/todoActions'
import { deleteTodo } from '../redux/actions/todoActions'
import { connect } from 'react-redux'
// import { apiUrl } from '../constants';
require('dotenv').config();

class TodoDetails extends React.Component {

    componentDidMount() {
        if (!this.props.todo?.length) {
            const id = this.props.match.params.id;
            this.props.getTodoDetail(id);
        }
    }

    handleDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteTodo(id)
        this.props.history.push('/home')

    }

    handleEdit = () => {
        this.props.history.push('/edit-blog')
    }

    render() {
        console.log('todo deatails array:', this.props.todo)
        return (
            <div className="blog-details">
                {
                    this.props.todo ? (
                        <article>
                        <h2>{this.props.todo.title}</h2>
                        <p>{this.props.todo.description}</p>
                        <h2>Todo Status:{this.props.todo.isComplete ? 'Completed' : 'Not Completed'}</h2>
                        <div >
                            <img style={{ width: '300px', height: '300px'}} src={`${process.env.REACT_APP_API_URL}uploads/${this.props.todo.image}`} alt="todo"/>
                        </div>
                        <button onClick={this.handleDelete}>Delete</button>
                        <Link to={`edit-todo/${this.props.todo._id}`}>
                            <button onClick={this.handleEdit} >Edit</button>
                        </Link>
                    </article>
                    ) : null
                }
                {/* {this.props.todo? (
                    <article>
                        <h2>{this.props.todo.title}</h2>
                        <p>{this.props.todo.description}</p>
                        <h2>Todo Status:{this.props.todo.isComplete ? 'Completed' : 'Not Completed'}</h2>
                        <div >
                            <img style={{ width: '300px', height: '300px'}} src={`${process.env.REACT_APP_API_URL}uploads/${this.props.todo.image}`} alt="todo"/>
                        </div>
                        <button onClick={this.handleDelete}>Delete</button>
                        <Link to={`edit-todo/${this.props.todo._id}`}>
                            <button onClick={this.handleEdit} >Edit</button>
                        </Link>
                    </article>
                ) : <h2>Not todo found</h2>} */}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTodoDetail: (id) => (
            dispatch(getTodoDetail(id))
        ),
        deleteTodo: (id) => (
            dispatch(deleteTodo(id))
        )    
    }
}

const mapStateToProps = state => {
    return {
        todo: state.todoReducer.todo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetails);
