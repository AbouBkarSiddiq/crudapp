import React from 'react';
import { createTodo } from '../redux/actions/todoActions'
import { connect } from 'react-redux'

class Create extends React.Component {

    state = {
        title: null,
        description: null,
        isComplete: false,
        image: '',
        preview: '',
        isLoading: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        if (e.target.files) {
            console.log('Image at create:', e.target.files[0])
            this.setState({
                image: e.target.files[0],
            })
            this.setState({
                preview: URL.createObjectURL(e.target.files[0]),
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('isComplete', this.state.isComplete);
        formData.append('image', this.state.image);
        this.props.createTodo(formData)
// to console formdata
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ' - ' + pair[1]); 
        }
        this.props.history.push('/home')
    }


    render() {
        return (
            <div className="create">
                <h2>Add New Todo</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Todo title:</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <label>Todo Body:</label>
                    <textarea
                        required
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    >
                    </textarea>
                    <label>Todo Status:</label>
                    <select
                        name="isComplete"
                        type="boolean"
                        value={this.state.isComplete}
                        onChange={this.handleChange}
                    >
                        <option value={!this.state.isComplete}>Completed</option>
                        <option value={this.state.isComplete}>Not completed</option>
                    </select>
                    <label>Choose an image:</label>

                    <input
                        type="file"
                        // name="image"
                        accept="image/x-png,image/jpg,image/jpeg, image/png,"
                        onChange={this.handleChange}

                    />
                    {
                        this.state.image ? <div>
                            <img style={{ width: '300px', height: '300px' }} src={this.state.preview} alt="todo" />
                        </div> : null
                    }
                    {!this.state.isLoading && <button>Add Todo</button>}
                    {this.state.isLoading && <button>Loading...</button>}

                </form>
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        createTodo: (formData) => (
            dispatch(createTodo(formData))
        )
    }

}

export default connect(null, mapDispatchToProps)(Create);