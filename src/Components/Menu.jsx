import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signOut} from "firebase/auth";
import {faPlay, faRightFromBracket, faStop, faUser} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {auth} from "../firebase.js";



function Menu() {
    const [musicOn, setMusicOn] = useState(false);
    const [randomMusic, setRandomMusic] = useState(0)
    const navigate = useNavigate();
    const success = localStorage.getItem("isConnected")
    //const success = true;



    /*
        const video = document.getElementById('audio');
        console.log(video)

        if(musicOn === true){
            video.onended = (event) => {
                console.log('Video stopped either because 1) it was over, ' +
                 'or 2) no further data is available.');
                };
        }
    */


    //navbar control mobile
    const [shownav, setshowNav] = useState(false);

    function activateNavbar() {
        setshowNav(!shownav);
    }

    async function logout(){
        const user = await signOut(auth);
        try {
            console.log('Successfully signed out');
            //const user = user.user;
            console.log(user);
            await navigate("/login");
            localStorage.removeItem('id')
            localStorage.removeItem('isConnected');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <nav aria-label="main navigation" className={"navbar"} role="navigation" style={styles.menu}>
                <div className="navbar-brand">
                    <a aria-expanded="false" onClick={activateNavbar} onKeyDown={activateNavbar}
                       aria-label="menu" className={shownav === false ? "navbar-burger" : "navbar-burger is-active"}
                       data-target="navbarBasicExample"
                       role="button">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>
                <div id="navbarBasicExample" className={shownav === true ? "navbar-menu is-active" : "navbar-menu"}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home Page
                        </Link>

                        {
                            musicOn === true &&
                            <audio id={"audio"} src={musics[randomMusic]} autoPlay loop/>
                        }
                        {
                            success === "true" &&
                            <Link
                                to="/cars"
                                className="navbar-item">
                                cars search
                            </Link>
                        }
                        <div className={"navbar-item"}>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                {
                                    success !== "true" &&
                                    <Link
                                        to="/login"
                                        className="navbar-item">
                                        Login
                                    </Link>
                                }
                                {
                                    success !== "true" &&
                                    <Link
                                        to="/signup"
                                        className="navbar-item">
                                        Sign up
                                    </Link>
                                }
                                {
                                    success !== "true" &&
                                    <img src="https://tse3.mm.bing.net/th?id=OIP.5U6XKTb8Zl_OeCAVHNeyQgHaHA&pid=Api&P=0" alt="userPic" className="user-pic" />
                                }
                                {
                                    success === "true" &&
                                    <Link
                                        to="/profile"
                                        className="button is-rounded is-info is-light is-outlined">
                                        <span><i><FontAwesomeIcon icon={faUser}/></i> </span>
                                    </Link>
                                }
                                {
                                    success === "true" &&
                                    <button onClick={logout}
                                            className="button is-danger">
                                        <p className="control has-icons-left">
                                            <span>
                                                <i><FontAwesomeIcon icon={faRightFromBracket}/></i>
                                            </span></p>
                                        Log out
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

const styles = {
    menu: {
        backgroundColor: "#cccccc",
    },
    button: {
        cursor: "pointer",
        color: "black"
    },
    image : {
        border: "3px solid #999",
        marginTop: "20px",
        width: "60%",
        borderRadius: "50%",
        height: "auto",
        objectFit : "cover",
}
}


export default Menu;
