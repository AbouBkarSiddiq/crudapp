import React from 'react';
import { Link } from 'react-router-dom'
import { getTodoDetail } from '../redux/actions/todoActions'
import { deleteTodo } from '../redux/actions/todoActions'
import { connect } from 'react-redux'
require('dotenv').config();

class TodoDetails extends React.Component {
    
    state = {
        todo: {}
    }

    componentDidMount() {
        console.log('This.props.todo:', this.props)
        const id = this.props.match.params.id;
        console.log('id of todo:', id)
        this.props.getTodoDetail(id);
        this.setState({
            todo: this.props.todo
        })
    }
    static getDerivedStateFromProps(props, state) {
        const { todo } = props
        console.log('Props for single todo:', props)
        if (JSON.stringify(todo) !== JSON.stringify(state.todo)) {
            state.todo = todo
        }
        
        return state
    }
    
    handleDelete = () => {
        const id = this.props.match.params.id;
        console.log('Id of todo for delete action:', id)
        this.props.deleteTodo(id, this.props)
        // this.props.history.push('/home')
    }
    
    handleEdit = () => {
        this.props.history.push('/edit-blog')
    }
    
    render() {
        // console.log('Todo state at todo details:', this.state.todo.image)
        return (
            <div className="blog-details">
                {
                   this.props.todo && this.props.todo ? (
                        <article>
                        <h2>{this.props.todo.title}</h2>
                        <p>{this.props.todo.description}</p>
                        <h2>Todo Status:{this.props.todo.isComplete ? 'Completed' : 'Not Completed'}</h2>
                        <div>
                            <img style={{ width: '300px', height: '300px'}} src={this.props.todo.image} alt="todo"/>
                        </div>
                        <button onClick={this.handleDelete}>Delete</button>
                        <Link to={`edit-todo/${this.props.todo._id}`}>
                            <button onClick={this.handleEdit} style={{marginLeft: '10px', width: '55px'}}>Edit</button>
                        </Link>
                    </article>
                    ) : null
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getTodoDetail: (id) => (
            dispatch(getTodoDetail(id))
        ),
        deleteTodo: (id, ownProps) => (
            dispatch(deleteTodo(id, ownProps))
        )    
    }
}

const mapStateToProps = state => {
    return {
        todo: state.todoReducer.todo
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoDetails);

// import { useParams, useHistory, Link } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { getTodoDetail } from '../redux/actions/todoActions'
// import { deleteTodo } from '../redux/actions/todoActions'

// const TodoDetails = () => {

//     const dispatch = useDispatch();
//     const res = useSelector((state) => state.todoReducer.todo);
//     // const datas = useSelector((state) => state.todoReducer.todos);
//     console.log('Data coming from api at todoDetails:', res)
//     const { id } = useParams();
//     const history = useHistory()
//     const [data, setData] = useState({})
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState(false)

//     useEffect(() => {
//         setIsLoading(true)
//         setError(false)

//         if (!data.length) {
//             dispatch(getTodoDetail(id));
//             setData(res)
//           }
//         // axios('http://192.168.100.44:3000/todo/' + id)
//         //     .then((response) => {
//         //         let res= response.data.data
//         //         setData(res)
//         //         setIsLoading(false)
//         //         console.log('Data of single todo:', res)
//         //         // return data
//         //     }).catch((error) => {
//         //         setError(error)
//         //         console.log("Error in catch body.", error)
//         //     })
//         // setIsLoading(false)

//     }, [])

//     const handleDelete = () => {
//         dispatch(deleteTodo(id))
//         history.push('/home')
//         // axios.delete('http://192.168.100.44:3000/todo/' + id, {
//         //     // method: 'DELETE'
//         // })
//         //     .then(() => {
//         //         history.push('/')
//         //     })
//     }

//     const handleEdit = () => {
//         history.push('/edit-blog')
//     }
//     // console.log('data', data)

//     return (
//         <div className="blog-details">
//             {/* {isLoading && <div>Loading...</div>} */}
//             {/* {error.message && <div>{error.message}</div>} */}
//             {error ? error && <div>{error.message} </div> : data && (
//                 <article>
//                     <h2>{data.title}</h2>
//                     <p>{data.description}</p>
//                     <h2>Todo Status:{data.isComplete? 'Completed' : 'Not Completed'}</h2>
//                     <button onClick={handleDelete}>Delete</button>
//                     <Link to={`edit-todo/${data._id}`}>
//                         <button onClick={handleEdit} >Edit</button>
//                     </Link>
//                 </article>
//             )}

//         </div>
//     )
// }

// export default TodoDetails;

