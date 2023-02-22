
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, get, child , set, remove} from "firebase/database";
import {useState, useContext, useEffect} from "react";

function CarInfo() {
    const id = localStorage.getItem("id");
    const database = ref(getDatabase());
    const [carData, setcarData] = useState("");
    const [newcarName, setNewCarName] = useState("");
    const [newSerial, setNewSerial] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async  function getCarData() {   
            get(child(database, `data/Users/` + id + "/cars/" + params.carnumber)).then((snapshot) => {
                if (snapshot.exists()) {
                    setcarData(snapshot.val());
                    console.log(carData);
                }
            })
           
        }
        getCarData();
    }, []);

    async  function getCarData() {   
        get(child(database, `data/Users/` + id + "/cars/" + params.carnumber)).then((snapshot) => {
            if (snapshot.exists()) {
                setcarData(snapshot.val());
            }
        })
       
    }
    getCarData();

    function updateInfo() {
        set(child(database, `data/Users/` + id + "/cars/" + params.carnumber), {
          carname: newcarName,
          carId: newSerial,
          brakes: carData.brakes,
          cartemp: carData.cartemp,
          gastank: carData.gastank,
          motor: carData.motor,
          radiatortemp: carData.radiatortemp,

        });
        closeModal();
      }
      function deleteCar() {
        const CartoDelete = child(database, `data/Users/` + id + "/cars/" + params.carnumber);

    remove(CartoDelete).then(() => {
    console.log("car removed");
    navigate("/")
});
      }

  function openModal() {
        document.getElementById("modal1").classList.add("is-active");
      }
      function closeModal() {
        document.getElementById("modal1").classList.remove("is-active");
      }
      function openModal2() {
        document.getElementById("modal2").classList.add("is-active");
      }
      function closeModal2() {
        document.getElementById("modal2").classList.remove("is-active");
      }
      function Goback() {
        navigate("/")
      }
      
    return (
        carData &&
        <div className="container is-fullhd has-text-centered">
        <div className="hero">
            <div className="hero-body">
                <h1 className="title has-text-centered is-size-2">Car Watcher</h1>
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="notification is-light">
                        <div className="field">
                            <>
                            <section class="section">
                                <h1 className="title has-text-centered is-size-2"> { carData.carname }</h1>
                            </section><section class="section">
                                <img src="https://www.jing.fm/clipimg/full/291-2915549_side-view-car-vector-png.png"></img>
                                         <h1> Serial number : { carData.carId }</h1>

                                        {carData.cartemp <= 0 &&
                                         <h1 className="has-text-link"> Car temperature : { carData.cartemp }</h1>
                                        }
                                        {carData.cartemp >= 0 && carData.cartemp < 10 &&
                                         <h1 className="has-text-info"> Car temperature : { carData.cartemp }</h1>
                                        }
                                        {carData.cartemp >= 10 && carData.cartemp < 20 &&
                                         <h1 className="has-text-warning"> Car temperature : { carData.cartemp }</h1>
                                        }
                                        {carData.cartemp > 20 &&
                                         <h1 className="has-text-danger"> Car temperature : { carData.cartemp }</h1>
                                        }

                                         {carData.gastank <= 50 &&
                                         <h1 className="has-text-danger"> Gas tank : { carData.gastank }</h1>
                                        }
                                        { carData.gastank > 50 && carData.gastank < 79 && 
                                         <h1 className="has-text-warning"> Gas tank : { carData.gastank }</h1>
                                        }
                                        { carData.gastank > 79 &&
                                         <h1 className="has-text-success"> Gas tank : { carData.gastank }</h1>
                                        }

                                        {carData.motor === "badly damaged" &&
                                         <h1 className="has-text-danger"> Car motor : { carData.motor }</h1>
                                        }
                                        {carData.motor === "damaged" &&
                                         <h1 className="has-text-warning"> Car motor : { carData.motor }</h1>
                                        }
                                        {carData.motor === "no damages" &&
                                        <><h1 className="has-text-success"> Car motor : {carData.motor}</h1></>
                                        }

                                        {carData.brakes === "badly damaged" &&
                                        <h1 className="has-text-danger"> Car brakes : { carData.brakes }</h1>
                                        }
                                        {carData.brakes === "damaged" &&
                                        <h1 className="has-text-warning"> Car brakes : { carData.brakes }</h1>
                                        }
                                        {carData.brakes === "no damages" &&
                                        <h1 className="has-text-success"> Car brakes : { carData.brakes }</h1>
                                        }

                                         {carData.radiatortemp <= 0 &&
                                         <h1 className="has-text-link"> Radiator temperature : { carData.radiatortemp }</h1>
                                        }
                                        {carData.radiatortemp >= 0 && carData.radiatortemp < 10 &&
                                         <h1 className="has-text-info"> Radiator temperature : { carData.radiatortemp }</h1>
                                        }
                                        {carData.radiatortemp >= 10 && carData.radiatortemp < 20 &&
                                         <h1 className="has-text-warning"> Radiator temperature : { carData.radiatortemp }</h1>
                                        }
                                        {carData.radiatortemp > 20 &&
                                         <h1 className="has-text-danger"> Radiator temperature : { carData.radiatortemp }</h1>
                                        }

                                         <div className="modal" id="modal1">
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                    <header className="modal-card-head">
                                    <h1 className="modal-card-title">
                                        <b>CarWatcher</b>
                                    </h1>
                                        <button className="delete"
                                            aria-label="close"onClick={closeModal}>
                                        </button>
                                    </header>
                                    <section className="modal-card-body has-text-centered">
                                        <p>Change your car's name and info</p>
                                    <input className="input is-rounded has-icons-left" type="text" placeholder="New car name" onChange={(e) => setNewCarName(e.target.value)} />
                                    &nbsp;
                                    <input className="input is-rounded has-icons-left" type="text" placeholder="New serial number" onChange={(e) => setNewSerial(e.target.value)}/>
                                    </section>
                                    <footer className="modal-card-foot">
                                                        <button className="button is-rounded is-light" onClick={updateInfo}>
                                                            Update Info
                                                        </button>
                                                        <button className="button is-rounded is-dark" onClick={closeModal}>
                                                            Cancel
                                                        </button>
                                                    </footer>
                                    </div>
                                    </div>
                                    <div className="modal" id="modal2">
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                    <header className="modal-card-head">
                                    <h1 className="modal-card-title">
                                        <b>CarWatcher</b>
                                    </h1>
                                        <button className="delete"
                                            aria-label="close"onClick={closeModal}>
                                        </button>
                                    </header>
                                    <section className="modal-card-body has-text-centered-danger">
                                        <p>WARNING: this will permanently remove your car from our data and your account. Are you sure you want to proceed?</p>
                                    </section>
                                    <footer className="modal-card-foot">
                                                        <button className="button is-rounded is-danger" onClick={deleteCar}>
                                                            Yes, remove the car
                                                        </button>
                                                        <button className="button is-rounded is-dark" onClick={closeModal2}>
                                                            Cancel
                                                        </button>
                                                    </footer>
                                    </div>
                                    </div>
                            </section>
                            <button className="button is-success is-rounded is-outlined is-medium" onClick={openModal}>
                                    Update info
                                </button>
                                <button className="button is-info is-rounded is-outlined is-medium" onClick={Goback}>
                                    Go back
                                </button></>
                                <button className="button is-danger is-rounded is-outlined is-medium" onClick={openModal2}>
                                    Remove this Car
                                </button>
                             </div>
        <footer class="footer">
    <p>
    Made by:
    Chéry, Stéphane André 
    Amzert, Karim
    </p>

</footer>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    )
}


export default CarInfo
