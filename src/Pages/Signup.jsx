import {Link, useNavigate} from "react-router-dom";
import car from "../assets/car.mp4";
import {useState} from "react";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

function Signup () {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);


    //input verification
    const [emailVerification, setEmailVerification] = useState(true);
    const [passwordVerification, setPasswordVerification] = useState(false);


    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }

    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    async function signup(){
       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        try {
            console.log('Successfully registered');
            const user = userCredential.user;
            console.log(user);
            await navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container is-centered" style={styles.screen}>
            <div className="hero">
                <div className="hero-body">
                    <h1 className="title has-text-centered is-size-2" style={styles.textColor}>Sign up</h1>
                    <div className="columns is-centered">
                        <div className="column is-half">
                            <div className="notification is-light">
                                <video src={car} autoPlay loop muted/>
                                <div className="field">
                                    <label htmlFor="email" className="label">Email</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input id="email" className={emailVerification === false? "input is-danger" : "input"} type="email" placeholder="email"
                                               value={email} onChange={handleChangeEmail}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"/>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="password" className="label">Password:</label>
                                    <p className="control has-icons-left">
                                        <input id="password" className="input" type="password" placeholder="Password"
                                               value={password} onChange={handleChangePassword}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-lock"/>
                                        </span>
                                    </p>
                                </div>
                                <button className="button is-info is-rounded is-outlined is-medium"
                                        //disabled={buttonDisabled}
                                        onClick={signup}>
                                    Sign up
                                </button>
                                <div className="has-text-centered">
                                    <p>Already Have an account ?</p>
                                    <Link
                                        style={styles.help}
                                        to={"/login"}
                                        className="has-text-weight-bold">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    screen: {
        minHeight: "100%", minWidth: "100%", height: "130vh"
    }, textColor: {
        color: "black"
    },
    backgroundModal: {
        cursor: "pointer"
    },
    help : {
        fontFamily : "Arial"
    }
}

export default Signup
