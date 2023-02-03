import car from "../assets/car.mp4";
import {Link} from "react-router-dom";

function Login () {
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

export default Login
