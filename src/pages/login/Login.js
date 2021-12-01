import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../redux/actions/authActions'

class Login extends React.Component {

    state = {
        email: null,
        password: null,
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        if (userId) {
            // console.log('component did mount works')
            this.props.history.push('/home')
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,

        }
        this.props.login(data);
        console.log("this gets executed...")
        this.props.history.push('/home');

        // const userId = localStorage.getItem('userId')
        // if (userId) {
        //     console.log('component did mount works')
        //     this.props.history.push('/home')
        // }

    }

    render() {
        return (
            <div className="create">
                <h2>User Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        required
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label>Password:</label>
                    <input
                        type="password"
                        required
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button type="submit" >Login</button>
                    <div className=''>
                        Didn't have account?
                        <span onClick={() => this.props.history.push('/register')} style={{ cursor: 'pointer' }}>
                            Sign up
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => (
            dispatch(login(data))
        )
    }

}

export default withRouter(connect(null, mapDispatchToProps)(Login));





// import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from "react-redux";
// import { login } from '../../redux/actions/authActions'


// const Login = () => {

//     const dispatch = useDispatch();
//     // let user = useSelector((state) => state.authReducer.user);

//     let history = useHistory()
//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState()
//     const [isLoading, setIsLoading] = useState(false)

    // let userId = localStorage.getItem('userId')

//     useEffect(() => {
//         if(userId) {
//             history.push('/home')
//         }
//     },)


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setIsLoading(true)
//         const data = { email, password }
//         dispatch(login(data))
//         // alert('User login successfully...')

//     }

    // return (
    //     <div className="create">
    //         <h2>User Login</h2>
    //         <form onSubmit={handleSubmit}>
    //             <label className="label">Email:</label>
    //             <input
    //                 type="email"
    //                 required
    //                 value={email}
    //                 onChange={e => setEmail(e.target.value)}
    //             />
    //             <label>Password:</label>
    //             <input
    //                 type="password"
    //                 required
    //                 value={password}
    //                 onChange={e => setPassword(e.target.value)}
    //             />
    //             <button type="submit">Login</button>
    //             <div className=''>
    //                 Didn't have account?
    //                 <span onClick={() => history.push('/register')} style={{ cursor: 'pointer' }}>
    //                     Sign up
    //                 </span>
    //             </div>
    //         </form>
    //     </div>
    // );
// }

// export default Login;