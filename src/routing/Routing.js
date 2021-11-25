import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Create from '../components/Create';
import TodoDetails from '../components/TodoDetails';
import EditTodo from '../components/EditTodo';
import NotFound from '../components/NotFound';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';

const Routing = () => {
    const PrivateRoute = ({ component: Component, ...rest }) => {
        let userId = localStorage.getItem('userId');
        if (userId && userId !== '') {
            return <Route  {...rest} render={(props) => (<div className="">
                <Navbar />
                <div className="content"><Component {...props} /></div></div>)} />
        } else {
            return <Redirect to='/' />
        }
    }
    
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/home" component={Home} />
                <PrivateRoute path="/create" component={Create} />
                <PrivateRoute path="/todo/:id" component={TodoDetails} />
                <PrivateRoute path="/edit-todo/:id" component={EditTodo} />
                <PrivateRoute path="*" component={NotFound} />
            </Switch>
        </Router>
    );
}



export default Routing;