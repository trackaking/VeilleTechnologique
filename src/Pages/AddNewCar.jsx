import { getDatabase, ref, get, child , remove, set, update} from "firebase/database";
import {useState} from "react";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {useEffect} from "react";

function AddNewCar (){
    const [carname, setCarname] = useState("");
    const [serial, setSerial] = useState("");
    const id = localStorage.getItem("id");
    const database = ref(getDatabase());
    const [carData, setcarData] = useState("");
    const [carnumber, setcarnumber] = useState("");
    const [images, setImages] = useState( [] );
    const [imageURLs, setImageURLs] = useState([]);

    function handleChangeCarname(event) {
        setCarname(event.target.value)
    }

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    function handleChangeSerial(event) {
        setSerial(event.target.value)
    }
    useEffect(() => {
        async  function getUser() {
            get(child(database, `data/Users/` + id )).then((snapshot) => {
                if (snapshot.exists()) {
                    setcarData(snapshot.val());
                    console.log(carData.cars.length);
                    setcarnumber(carData.cars.length);
                    
                }
            })

        }
        getUser();
    }, []);
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
      }, [images]);

      async function addCar() {
        const storage = getStorage();
          const storageRef = sRef(storage, `Users/${id}/cars/${serial}`);
          const uploadTask = uploadBytes(storageRef, images[0]);
          uploadTask.then(() => {
            getDownloadURL(storageRef).then((url) => {
              console.log(url);
              const db = getDatabase();
              const carData = {
                carImage: url,
                carname: carname,
                carId: serial,
                brakes: "no damages",
                cartemp: 40,
                gastank: 10,
                motor: "no damages",
                radiatortemp: 100
              }
              const carRef = child(ref(db), `data/Users/${id}/cars/${carnumber}`);
              update(carRef, carData);
      })})
      }
      async  function getUser() {
        get(child(database, `data/Users/` + id )).then((snapshot) => {
            if (snapshot.exists()) {
                setcarData(snapshot.val());
                setcarnumber(carData.cars.length);
            }
        })

    }
    getUser()
        return (
        <div className="container is-centered" style={styles.screen}>
            <div className="hero">
                <div className="hero-body">
                    <h1 className="title has-text-centered is-size-2" style={styles.textColor}>Add a new Car</h1>
                    <div className="columns is-centered">
                        <div className={"column has-text-centered"}>
                        </div>
                        
                        <div className="column is-half">
                              <div className="notification is-light">
                                <div className="field">
                                <input type="file" multiple accept="image/jpeg, image/png" onChange={onImageChange}/>
                {imageURLs.map(imageSrc => <img src={imageSrc}/>) }
                                </div>
                                </div>
                        </div>


                        <div className="column is-half">
                            <div className="notification is-light">
                                <div className="field">
                                    <label htmlFor="ucarname" className="label">Car Name</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input id="carname" className="input" type="text" placeholder="Car Name"
                                                onChange={handleChangeCarname}/>
                                    </p>
                                </div>
                                <div className="field">
                                    <label htmlFor="serial" className="label">Car Serial Number</label>
                                    <p className="control has-icons-left has-icons-right">
                                        <input onChange={handleChangeSerial}
                                               id="serial" className="input"
                                               type="text" placeholder="Serial Number"/>
                                    </p>
                                </div>
                                <button
                                    className="button is-black is-outlined is-medium" onClick={addCar}>
                                    Add new Car
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

export default AddNewCar
