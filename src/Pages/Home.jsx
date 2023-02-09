import car from "../assets/car.mp4";



function Home(){
    return (
        <div className='main'>
            <div className="overlay"/>
            <video src={car} autoPlay loop muted />
            <div className="content">
                <h1 style={styles.textColor}>Welcome</h1>
            </div>
        </div>
    )
}

const styles  = {
    button : {
        cursor: "pointer"
    },
    textColor : {
        color : "white"
    }
}



export default Home
