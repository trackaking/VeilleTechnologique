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
                <h1 className="title has-text-centered is-size-2" style={styles.textColor}>Car Watcher</h1>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="notification is-light">
                            <div className="field">
                            {
                                success !== "true" &&
                            <>
                            <section className="section">
                                <h1>Watch your car and get notifications when an issue irises with your car's parts! Sign up now to register your car and watch over it from anywhere in the world.</h1>
                                    <Link to="/signup" className="button">
                                            Sign Up Now!
                                    </Link>
                            </section><section className="section">
                                <img src="https://www.jing.fm/clipimg/full/291-2915549_side-view-car-vector-png.png" alt={"random img"}/>
                                         <h1>Watch your car and get notifications when an issue irises with your car's parts! Login now to register your car and watch over it from anywhere in the world.</h1>
                            </section></>
                                  }
                                      {
                                success === "true" &&
                                          user &&
                            <>
                            <section className="section">
                                <h1>Welcome, { user.username } </h1>
                            </section><section className="section">
                                <img src="https://tse4.mm.bing.net/th?id=OIP.ql72JZ9z0LhaJ6kjOShcyQHaEK&pid=Api&P=0" alt={"car image"}/>
                                         <h1 class="title is-4 is centered">Your cars</h1>
                                         <Link to={`/addnewcar`}>
                                         <button className="button is-rounded is-dark">Add new car</button>
                                         </Link>
                                         <div className="column is-16">
                                         {user.cars.length !== 0 &&
                                           <div> {user.cars.map(car=>(
                                                <>
                                                    <Link to={`/carInfo/${user.cars.indexOf(car)}`}>
                                                    <div class="card  is-centered has-text-centered">
  <div class="card-image">
    <figure class="image ">
      <img src={car.carImage} alt="Placeholder image"/>
    </figure>
  </div>
  <div class="card-content">
  <p class="title is-4 is centered">{car.carname}</p>
    <div class="media">
      </div>
      </div>
      </div>
    </Link>
    &nbsp;
    &nbsp;</>
        ))}
                                                </div>
                                        }
                                        </div>
                            </section></>
                                  }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="footer">
    <p>
    Made by:
    Chéry, Stéphane André
    Amzert, Karim
    </p>

</footer>
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

export default Home
