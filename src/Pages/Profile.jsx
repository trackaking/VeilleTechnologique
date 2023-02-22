import {onAuthStateChanged,updateProfile} from "firebase/auth";
import {auth} from "../firebase.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import * as constants from "constants";

function Profile (){
    const [email, setEmail] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState("");

    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }

    function handleChangeFirstName(event) {
        setFirstname(event.target.value)
    }

    function handleChangeLastName(event) {
        setLastName(event.target.value)
    }

    function handleChangeUsername(event) {
        setUsername(event.target.value)
    }



    onAuthStateChanged(auth,function(user) {
            if (user) {
                // User is signed in.
                //let test = user.displayName;
                //console.log(test)
                setEmail(user.email);
                setProfilePicture(user.photoURL);
                setUsername(user.displayName)
                //var isAnonymous = user.isAnonymous;
                //var uid = user.uid;
                //var providerData = user.providerData;
            } else {
                // User is signed out.
                // ...
            }
        });

   async function updateUserData(){
        let user = await updateProfile({
            displayName: "Jane Q. User",
            photoURL: "https://example.com/jane-q-user/profile.jpg"
        })

        try{
            //var userNow = currentUser;
            console.log('Successfully connected');
            console.log(user)
        } catch(error){
            console.log("error")
        }

    }


        return (
        <div className="container is-centered" style={styles.screen}>
            <div className="hero">
                <div className="hero-body">
                    <h1 className="title has-text-centered is-size-2" style={styles.textColor}>Profile</h1>
                    <div className="columns is-centered">
                        <div className={"column has-text-centered"}>
                            <figure className={"image is-10by5 is-inline-block"}>
                                <img style={styles.centerImage}
                                     src={profilePicture} />
                            </figure>
                        </div>
                        <div className="column is-half">
                            <div className="notification is-light">
                                <div className="field">
                                    <label htmlFor="username" className="label">Username</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input id="username" className="input" type="text" placeholder="username"
                                               value={username} onChange={handleChangeUsername}/>
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"/>
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="email" className="label">Email</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input value={email} onChange={handleChangeEmail}
                                               id="email" className="input"
                                               type="email" placeholder="email"/>
                                        <span className="icon is-small is-left">
                                    <i><FontAwesomeIcon icon={faEnvelope}/></i>
                                    </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="firstName" className="label">First name:</label>
                                    <p className="control has-icons-left">
                                        <input id="firstName" className="input" type="text" placeholder="First name"
                                               value={firstName} onChange={handleChangeFirstName}/>
                                        <span className="icon is-small is-left">
                                        </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="lastName" className="label">Last name:</label>
                                    <p className="control has-icons-left">
                                        <input id="lastName" className="input" type="text"

                                               placeholder="Last name"
                                               value={lastName} onChange={handleChangeLastName}/>
                                        <span className="icon is-small is-left">
                                    </span>
                                    </p>
                                </div>
                                <button onClick={updateUserData}
                                    className="button is-black is-outlined is-medium">
                                    Update
                                </button>
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
        minHeight: "100%",
        minWidth: "100%",
        height: "120vh"
    },
    textColor: {
        color: "white",
    },
    imageBorder : {
        border: "3px solid #FFF",
        margin: "20px",
        borderRadius: "50%",
        objectFit : "cover",
    },
    centerImage : {
        height: "auto",
        width: "100%",
        display : "flex",
        flexDirection: "column",
    },
    figure: {
        cursor: "pointer"
    },
}

export default Profile
