import React, { useState } from 'react'
import { useLocalStorage } from '../../hooks/UseLocalStorage'

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useLocalStorage('users', [])
    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', null)

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (username.trim() === '' || password.trim() === '') return
        const user = users.find( (user:{username:string, password:string}) => user.username === username && user.password === password)
        if (user) {
            setCurrentUser(user)
            setUsername('')
            setPassword('')
        } else {
            alert('Invalid username or password')
        }
    }

    return (
        <form onSubmit={handleLoginSubmit}>
            <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginForm