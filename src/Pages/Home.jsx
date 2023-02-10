import {Link} from "react-router-dom";

function Home(){
    return (
        <div className="container is-fullhd has-text-centered">
        <div className="hero">
            <div className="hero-body">
                <h1 className="title has-text-centered is-size-2">Welcome to Car Watcher</h1>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="notification is-light">
                            <div className="field">
                            <section class="section">
                                <h1>Watch your car and get notifications when an issue irises with your car's parts! Sign up now to register your car and watch over it from anywhere in the world.</h1>
                                <Link to="/signup" className="button">
                            Sign Up Now!
                        </Link>
                                </section>
                                <section class="section">
                                    <img src="https://www.jing.fm/clipimg/full/291-2915549_side-view-car-vector-png.png"></img>
                                <h1>Watch your car and get notifications when an issue irises with your car's parts! Login now to register your car and watch over it from anywhere in the world.</h1>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
    <p>
    Made by:
    Chéry, Stéphane André 
    Amzert, Karim
    </p>

</footer>
    </div>
    )
}

export default Home
