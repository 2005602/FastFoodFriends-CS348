import React, {useState} from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function addUser() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    };
    fetch("/addUser", requestOptions);
    }

    function checkUser() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    };

    fetch("/checkUser", requestOptions).then(
        res => res.json()
    ).then(
        data => {
            console.log(data)
        }
    )
    }

    return (
    <div>
        <form>
        <label>
            Email:
            <input value="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            Password:
            <input value="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type="button" onClick={() => addUser()}>Sign Up</button>
        <button type="button" onClick={() => checkUser()}>Login</button>
        </form>
    </div>
    );
}

export default Login;