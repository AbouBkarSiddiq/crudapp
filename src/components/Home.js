import React from 'react';
import { getTodos } from '../redux/actions/todoActions'
import TodoList from './TodoList';
import { connect } from 'react-redux'

class Home extends React.Component {

    state = {
        todos: [],
    }

    componentDidMount() {
        // const userId = localStorage.getItem('userId')
        // const token = localStorage.getItem('token')
        if (!this.props.todos?.length) {
            this.props.getTodos();
        }
    }

    // static getDerivedStateFromProps(props, state) {
    // }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.hist) {
    //         if (props.match.url !== props.hist.url) {
    //             props.changematch();
    //             props.history.push(props.hist.url);
    //         }
    //     }
    //     const { todos } = props
    //     if (JSON.stringify(todos) !== JSON.stringify(state.todos)) {
    //         state.todos = todos
    //     }
        
    //     return state
    // }

    render() {
        return (
            <div className="home">
                {/* {error && <div>{error.message}</div>} */}
                {/* {isLoading ? <div>Loading...</div> : ''} */}
                {this.props.todos?.length && this.props.todos ? < TodoList todos={this.props.todos} title="All Todos" /> : <div>Loading...</div>}
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