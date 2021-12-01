import React from 'react';
import { getTodos } from '../redux/actions/todoActions'
import TodoList from './TodoList';
import { connect } from 'react-redux'

class Home extends React.Component {

    state = {
        todos: [],
    }

    componentDidMount() {

        this.props.getTodos();
        this.setState({
            todos : this.props.todos,
            // todos: [],
        })
        
    }

    static getDerivedStateFromProps(props, state) {
        const { todos } = props
        console.log('Props', props)
        if (JSON.stringify(todos) !== JSON.stringify(state.todos)) {
            state.todos = todos
        }
        
        return state
    }

    render() {
        return (
            <div className="home">
                {
                this.state.todos?.length && this.state.todos ? 
                < TodoList todos={this.state.todos} title="All Todos" /> 
                : null // : <div>Loading...</div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTodos: () => (
            dispatch(getTodos())
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todoReducer.todos
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);