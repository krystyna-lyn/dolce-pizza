import React from 'react'

const Auth = () => {
    return (
        <div class="login-content">
            <h1>Login</h1>
            <form class='form'>
                <input type="email"
                    placeholder="Email"
                    required
                />
                <input type="password"
                    placeholder="Password"
                    required
                />
                <button class="button">Go</button>
            </form>
        </div>
    )
}

export default Auth