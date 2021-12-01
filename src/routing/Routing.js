import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { fetchUser, setIsFetchingUser } from "../redux/actions/authActions";
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Create from '../components/Create';
import TodoDetails from '../components/TodoDetails';
import EditTodo from '../components/EditTodo';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';

class Routing extends React.Component {
    
    componentDidMount() {
        let userId = localStorage.getItem('userId');
            if(userId) {
                this.props.fetchUser();
            } else {
                this.props.setIsFetchingUser(false);
            }
    }

    PrivateRoute = ({ component: Component, ...rest }) => {
        if (this.props.user) {
            return <Route  {...rest} render={(props) => (
                <div className="content"><Component {...props} /></div>)} />
        } else {
            return <Redirect to='/' />
        }
    }
    render() {
        return (
            <Router>
                {this.props.user && <Navbar />}
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    {
                        !this.props.isLoading
                            &&
                                <>
                                    <this.PrivateRoute path="/home" component={Home} />
                                    <this.PrivateRoute path="/create" component={Create} />
                                    <this.PrivateRoute path="/todo/:id" component={TodoDetails} />
                                    <this.PrivateRoute path="/edit-todo/:id" component={EditTodo} />
                                    {/* <this.PrivateRoute path="*" component={NotFound} /> */}
                                </>
                    }
                </Switch>
            </Router>
        );
    }
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => (
            dispatch(fetchUser())
        ),
        setIsFetchingUser: (status) => (
            dispatch(setIsFetchingUser(status))
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
        isLoading: state.authReducer.isFetchingUser
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Routing);

