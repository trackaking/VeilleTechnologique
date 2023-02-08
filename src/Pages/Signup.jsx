import {Link, useNavigate} from "react-router-dom";
import car from "../assets/car.mp4";
import {useState} from "react";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import { getDatabase, ref, set } from "firebase/database";

function Signup () {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);


    //input verification
    const [emailVerification, setEmailVerification] = useState(true);
    const [passwordVerification, setPasswordVerification] = useState(false);


    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleChangeUsername(event) {
        setUsername(event.target.value)
    }

    function handleChangePassword(event) {
        setPassword(event.target.value)
    }

    async function signup(){
       const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        try {
            console.log('Successfully registered');
            const user = userCredential.user;
            const db = getDatabase();
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            set(ref(db, 'data/Users/' + user.uid), {
              username: username,
              email: email,
              cars: [{
                carId:"sd432gdfh578hgj6",
                 brakes: "green",
                 carname: "carname",
                 cartemp: 10,
                 gastank: 100,
                 motor: "red (on fera un code couleur pour les dommages en vert jaune rouge",
                 radiatortemp: 14
             },
             {
               carId:"sofjg324hioifgj6",
                brakes: "green",
                carname: "carname",
                cartemp: -40,
                gastank: 54,
                motor: "yellow (on fera un code couleur pour les dommages en vert jaune rouge",
                radiatortemp: 10
            }],
              userId: user.uid,
              creationdate: `${year}-${month}-${date}`
            });
            console.log(user.uid);
            await navigate("/login");
        } catch (error) {
            console.log("error: " + error);
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
                                    <label htmlFor="username" className="label">Username:</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input id="username" className="input" type="text" placeholder="username"
                                               value={username} onChange={handleChangeUsername}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-profile"/>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="label">Email:</label>
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
