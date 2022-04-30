import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

function Login() {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function addUser() {
        console.log("testing");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        };
        fetch("/addUser", requestOptions).then(
            res => res.json()
        ).then(
            data => {
                console.log(data)
                if (data.status == "Done") {
                    alert("Account successfully created")
                }
            }
        )
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
            if (data == true) {
                localStorage.setItem("user", email);
                history.push("/Home");
            } else {
                alert("Invalid Login")
            }
        }
    )
    }

    return (
    <div>
        <form>
        <label>
            Email:
            <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)}/>
            Password:
            <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button type="button" onClick={() => addUser()}>Sign Up</button>
        <button type="button" onClick={() => checkUser()}>Login</button>
        </form>
    </div>
    );
}

export default Login;