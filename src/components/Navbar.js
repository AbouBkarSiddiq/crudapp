import React from 'react';
import { Link } from 'react-router-dom'


class Navbar extends React.Component {

    handleLogout = () => {
        localStorage.clear();
        this.props.history.push('/')
    }

    render() {
        return (
            <nav className="navbar">
                <Link to="/home">
                    <h1>Todo App</h1>
                </Link>
                <div className="links">
                    <Link to="/home">Home</Link>
                    <Link to="/create">Create Todo</Link>
                    <button onClick={this.handleLogout}>Log out</button>
                </div>
            </nav>
        );
    }
}

export default Navbar;


// import { Link } from 'react-router-dom'
// import { useHistory } from 'react-router-dom'

// const Navbar = () => {
//     let history = useHistory()
//     const handleLogout = () => {
//         localStorage.clear();
//         history.push('/')
//         alert('User logout successfully...')
//     }
//     return (
//         <nav className="navbar">
//             <Link to="/home">
//                 <h1>Todo App</h1>
//             </Link>
//             <div className="links">
//                 <Link to="/home">Home</Link>
//                 <Link to="/create">Create Todo</Link>
//                 <button onClick={handleLogout}>Log out</button>
//             </div>
//         </nav>
//     );
// }

// export default Navbar;