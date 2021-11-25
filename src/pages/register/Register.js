import axios from 'axios'
import {useState} from 'react'
import { useHistory } from 'react-router-dom';

const Register = () => {

    let history = useHistory()
    const [userName, setUserName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data =  { userName, email, password }
        console.log('Data coming at register page:', data)
        axios.post('http://192.168.100.44:3000/user/register', data)
        .then((response) => {
            alert('Data sent successfully.', response)
            console.log('User registration successful')
            setIsLoading(false)
            history.push('/')
        })
    }
    return ( 
        <div className="create">
            <h2>User Register</h2>
        <form onSubmit={handleSubmit}>
            <label>User Name:</label>
            <input 
            type="text"
            required
            value={userName}
            onChange={e => setUserName(e.target.value)}
            
            />
            <label>Email:</label>
            <input 
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input 
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            <button>Register</button>
            <div className=''>
                    Already have account?
                    <span onClick={() => history.push('/login')} style={{cursor: 'pointer'}}>
                        Login
                    </span>
                </div>
        </form>
        </div>
     );
}
 
export default Register;