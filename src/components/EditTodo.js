// import React from 'react'
// import { updateTodo } from '../redux/actions/todoActions'
// import { connect } from 'react-redux'
// import { getTodoDataToUpdate } from '../redux/actions/todoActions';

// class EditTodo extends React.Component {

//     state = {
//         todo: {},
//         image: null
//     }

//     // handleChange = ({ target }) => {
//     //     console.log('Target:', target)
//     //     const { name, value } = target;
//     //     this.setState({
//     //         ...this.props.todo,
//     //         [name]: value
//     //     });
//     // };
//     handleChange = (e) => {
//         console.log('Todo at Edit:', this.props.todo)
//         this.setState({
//             todo: this.props.todo,
//             ...this.state.todo, [e.target.name]: e.target.value 
//         })   

//     } 
//     handleFileChange = (e) => {
//         if(e.target.files) {
//             this.setState({
//                 image: e.target.files
//             })
//         }
//     }

//     componentDidMount() {
//         const id = this.props.match.params.id;
//         // if (!this.props.todo?.length) {
//             this.props.getTodoDataToUpdate(id);
//              this.setState({
//                 // ...todo, this.props.todo
//              })
//         // }
//     }

//     handleUpdate = (e) => {
//         e.preventDefault()
//         const id = this.props.match.params.id;
//         updateTodo(id, this.props.todo)
//         this.props.history.push('/home')
//     }

//     render() { 
//         return (
//             <div className="create">
//                 <h2>Update Todo</h2>
//                 <form onSubmit={this.handleUpdate}>
//                     <label>Todo title:</label>
//                     <input
//                         name="title"
//                         type="text"
//                         required
//                         value={this.state.todo.title}
//                         onChange={this.handleChange}
//                     />
//                     <label>Todo Description:</label>
//                     <textarea
//                         name="description"
//                         required
//                         value={this.state.todo.description}
//                         onChange={this.handleChange}
//                     >
//                     </textarea>
//                     <label>Todo Status:</label>
//                     <select
//                         name="isComplete"
//                         value={this.state.todo.isComplete}
//                         onChange={this.handleChange}

//                     >
//                         <option value="true">Completed</option>
//                         <option value="false">Not completed</option>
//                     </select>
//                     <label>Choose an image:</label>

//                     <input 
//                         type="file"
//                         // name="image"
//                         // value={this.state.image}
//                         accept="image/x-png,image/jpg,image/jpeg, image/png,"
//                         onChange={this.handleFileChange}

//                     />
//                     <button>Update Todo</button>

//                 </form>
//             </div>
//         );;
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getTodoDataToUpdate: (id) => (
//             dispatch(getTodoDataToUpdate(id))
//         ),
//         updateTodo: (id, data) => (
//             dispatch(updateTodo(id, data))
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         todo: state.todoReducer.todo
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);

import { updateTodo } from '../redux/actions/todoActions'
import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoDataToUpdate } from '../redux/actions/todoActions';

const EditTodo = () => {

    const { id } = useParams();
    const history = useHistory()
    const dispatch = useDispatch()
    let res = useSelector((state) => state.todoReducer.todo);
    // console.log('Response of single todo at Edit:', res)
    const [todo, setTodo] = useState({})
    // const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')

    const handleChange = ({ target }) => {
        console.log('Target:', target)
        const { name, value } = target;
        setTodo({
            ...todo, [name]: value,
        });
    };

    const handleFileChange = (e) => {
        let files = e.target.files[0]
        if (files) {
            console.log('Files', files)
            // setImage(files)
            // console.log("Try to update image::::", setImage(files))
            setTodo({
                ...todo, image : files,
            });
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    };

    useEffect(() => {
        dispatch(getTodoDataToUpdate(id))
        setTodo(res)
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', todo.title);
        formData.append('description', todo.description);
        formData.append('isComplete', todo.isComplete);
        formData.append('image', todo.image);
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ' - ' + pair[1]); 
        }
        // console.log('Updated todo data:', todo)
        dispatch(updateTodo(id, formData))
        history.push('/home')
    }

    return (
        <div className="create">
            <h2>Update Todo</h2>
            <form onSubmit={handleUpdate}>
                <label>Todo title:</label>
                <input
                    name="title"
                    type="text"
                    required
                    value={todo.title}
                    onChange={handleChange}
                />
                <label>Todo Description:</label>
                <textarea
                    name="description"
                    required
                    value={todo.description}
                    onChange={handleChange}
                >
                </textarea>
                <label>Todo Status:</label>
                <select
                    name="isComplete"
                    value={todo.isComplete}
                    onChange={handleChange}

                >
                    <option value="true">Completed</option>
                    <option value="false">Not completed</option>
                </select>
                {
                    preview ? <div>
                        <img style={{ width: '300px', height: '300px' }} src={preview} alt="todo" />
                    </div> : !preview ? <div>
                        <img style={{ width: '300px', height: '300px' }} src={todo.image} alt="todo" />
                    </div> : null
                }
                <label>Choose an image to update:</label>
                <input
                    type="file"
                    name="image"
                    accept="image/x-png,image/jpg,image/jpeg, image/png,"
                    onChange={handleFileChange}

                />
                <button>Update Todo</button>
            </form>
        </div>
    );
}

export default EditTodo;