// import React from 'react'
// import { updateTodo } from '../redux/actions/todoActions'
// import { connect } from 'react-redux'
// import { getTodoDataToUpdate } from '../redux/actions/todoActions';

// class EditTodo extends React.Component {
    
//     state = {
//         todo: {}
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
//         this.setState({
//             ...this.state.todo, [e.target.name]: e.target.value 
//         })
        
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
//                         value={this.props.todo.title}
//                         onChange={this.handleChange}
//                     />
//                     <label>Todo Description:</label>
//                     <textarea
//                         name="description"
//                         required
//                         value={this.props.todo.description}
//                         onChange={this.handleChange}
//                     >
//                     </textarea>
//                     <label>Todo Status:</label>
//                     <select
//                         name="isComplete"
//                         value={this.props.todo.isComplete}
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
//                         onChange={this.handleChange}

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
import {useParams , useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoDataToUpdate } from '../redux/actions/todoActions';

const EditTodo = () => {

    const { id } = useParams();
    const history = useHistory()
    const dispatch = useDispatch();
    let res = useSelector((state) => state.todoReducer.todo);
    let response = useSelector((state) => state.todoReducer.todos);
    console.log('Data coming from api for update todo:', response)
    const [data, setData] = useState({})
    // console.log("Blog data at edit:", data)

    const handleChange = ({ target }) => {
        console.log('Target:', target)
        const { name, value } = target;
        setData({ ...data, [name]: value });
    };

    useEffect(() => {
        dispatch(getTodoDataToUpdate(id))
        setData(res)
        // axios('http://192.168.100.44:3000/todo/' + id)
        //     .then((response) => {
        //         let data = response.data.data
        //         console.log('Data coming from bloglist, title', data)
        //         setData(data)
        //         return data
        //     }).catch((error) => {
        //         console.log("Error in catch body.", error)
        //     })

    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log('Updated data:', data)
        dispatch(updateTodo(id, data))
        history.push('/home')
        // axios.put('http://192.168.100.44:3000/todo/' + id, {
        //     // method: 'PUT',
        //     // headers: { 'Content-Type': 'application/json' },
        //     // body: JSON.stringify({
        //         ...data
        //         // id: id,
        //         // title: data.title,
        //         // body: data.body,
        //         // author: data.author
        //     // }),

        // })
        //     .then(() => {
        //         history.push('/')
        //     })
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
                    value={data.title}
                    onChange={handleChange}
                />
                <label>Todo Description:</label>
                <textarea
                    name="description"
                    required
                    value={data.description}
                    onChange={handleChange}
                >
                </textarea>
                <label>Todo Status:</label>
                <select
                    name="isComplete"
                    value={data.isComplete}
                    onChange={handleChange}

                >
                    <option value="true">Completed</option>
                    <option value="false">Not completed</option>
                </select>
                <label>Choose an image:</label>

                     <input 
                        type="file"
                        // name="image"
                        value={data.image}
                        // value={this.state.image}
                        accept="image/x-png,image/jpg,image/jpeg, image/png,"
                        onChange={handleChange}

                     />
                <button>Update Todo</button>

            </form>
        </div>
    );
}

export default EditTodo;