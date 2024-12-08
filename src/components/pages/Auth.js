import React from 'react'

const Auth = () => {
    return (
        <div className="d-flex flex-column justify-center align-center">
            <h1>Login</h1>
            <form className="form d-flex flex-column justify-center align-center"
            >

                <input type="email"
                    placeholder="Email"
                    required
                />
                <input type="password"
                    placeholder="Password"
                    required
                />
                <button className="greenButton">Login</button>
            </form>
        </div>
    )
}

export default Auth