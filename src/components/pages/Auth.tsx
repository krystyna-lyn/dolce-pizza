import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";



const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<User | null>(null);

    //console.log(auth?.currentUser?.email)

    const navigate = useNavigate();

    const singnIn = async () => {
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password);
            console.log(createdUser);
            navigate('/home')
        } catch (err) {
            console.error(err);
            navigate('/notfound')
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update the user state when authentication state changes
        });
        return () => unsubscribe(); // Clean up the listener on component unmount
    }, []);


    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return (

        <div className="login-content">
            {user ? (
                <div>
                    <h1>Welcome, {user.email || "User"}!</h1>
                    <button className="button" onClick={logout}>Logout</button>
                </div>
            ) : (
                <>
                    <h1>Login</h1><form className='form'>
                        <input type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                        <input type="password"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)} />
                        <button className="button" onClick={singnIn}>Sign in</button>
                        <button className="button" onClick={googleSignIn}>with Google</button>
                    </form>
                </>
            )}

        </div>

    )
}

export default Auth