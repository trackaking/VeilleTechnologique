import {Link} from "react-router-dom";
import { getDatabase, ref, get, child } from "firebase/database";
import { auth } from '../firebase';
import {useState, useContext, useEffect} from "react";

function Home(){
    const success = localStorage.getItem("isConnected")
    const id = localStorage.getItem("id");
    const database = ref(getDatabase());
    const [user, setuser] = useState("");

        useEffect(() => {
            async  function getUser() {
                get(child(database, `data/Users/` + id )).then((snapshot) => {
                    if (snapshot.exists()) {
                        setuser(snapshot.val());
                        console.log(user);
                    }
                })

            }
            getUser();
        }, []);

        async  function getUser() {
            get(child(database, `data/Users/` + id )).then((snapshot) => {
                if (snapshot.exists()) {
                    setuser(snapshot.val());
                }
            })

        }
        getUser();

    return (
        
        <div className="container is-fullhd has-text-centered">
        <div className="hero">
            <div className="hero-body">
                <h1 className="title has-text-centered is-size-2">Car Watcher</h1>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="notification is-light">
                            <div className="field">
                            {
                                success !== "true" &&
                            <>
                            <section class="section">
                                <h1>Watch your car and get notifications when an issue irises with your car's parts! Sign up now to register your car and watch over it from anywhere in the world.</h1>
                                    <Link to="/signup" className="button">
                                            Sign Up Now!
                                    </Link>
                            </section><section class="section">
                                <img src="https://www.jing.fm/clipimg/full/291-2915549_side-view-car-vector-png.png"></img>
                                         <h1>Watch your car and get notifications when an issue irises with your car's parts! Login now to register your car and watch over it from anywhere in the world.</h1>
                            </section></>
                                  }
                                      {
                                success == "true" &&
                                user &&    
                            <>
                       
                            <section class="section">
                                <h1>Welcome, { user.username } </h1>
                            </section><section class="section">
                                <img src="https://tse4.mm.bing.net/th?id=OIP.ql72JZ9z0LhaJ6kjOShcyQHaEK&pid=Api&P=0"></img>
                                         <h1>Your cars</h1>
                                         <ul>
                                         {user.cars.length !== 0 &&
                                            <li>{user.cars.map(car=>(
                                                <>
                                                    <Link to={`/carInfo/${user.cars.indexOf(car)}`}><li><strong>{car.carname}</strong></li></Link></>
                                                ))}</li>
                                        }
                                        </ul>
                            </section></>
                                  }
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
