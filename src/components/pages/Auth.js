import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";



const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const singnIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
    }


    return (
        <div class="login-content">
            <h1>Login</h1>
            <form class='form'>
                <input type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button class="button" onClick={singnIn}>Go</button>
            </form>
        </div>
    )
}

export default Auth