import { useState } from 'react'

import './App.css'

function App() {
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();

  const [userAddress,setUserAddress] = useState()

//real time location
const[GPSLatitude,setGPSLatitude] = useState();
const[GPSLongitude,setGPSLongitude] = useState();

  const geo = navigator.geolocation

  // Get User Current Location
  geo.getCurrentPosition(userCoords) //write this code with function & show the web-browser give the permission 
  function userCoords(position){ 
    let userLatitude = position.coords.latitude;
    let userLongitude = position.coords.longitude;
    // console.log("Latitude :", userLatitude);
    // console.log("Longitude :", userLongitude);
    setLatitude(userLatitude);
    setLongitude(userLongitude);
  }
    // Api Fetch with async
    const getUserAddress = async () =>{
      let Url = `https://api.opencagedata.com/geocode/v1/json?key=50275cfd0e9949ce911efb904f6a1329&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
      const loc = await fetch(Url)
      const data = await loc.json()
      console.log("User Address:",data);
      // console.log("User City:",data.results[0].components.city);
      setUserAddress(data.results[0].formatted)
    }
  
    //button concept
    const handleGetUserAddress = async()=>{
     await getUserAddress();
    }

      // Get User GPS Current position/Location Logic
  const watchID = geo.watchPosition(userGPSCoords) //write this code with function & show the web-browser give the permission 
  function userGPSCoords(position){ 
    let userGPSLatitude = position.coords.latitude;
    let userGPSLongitude = position.coords.longitude;
    // console.log("GPSLatitude :", userGPSLatitude);
    // console.log("GPSLongitude :", userGPSLongitude);
    setGPSLatitude(userGPSLatitude);
    setGPSLongitude(userGPSLongitude);
  }

  //for watching Id
  const stopWatch = () =>{
    geo.clearWatch(watchID)
    console.log(stopWatch)
  }


  return (
    <>
      <h1>Location</h1>
      <h2>Latitude : {latitude}</h2>
      <h2>Longitude : {longitude}</h2>
      <h2>User Address: {userAddress}</h2>
      <button onClick={handleGetUserAddress}>Get User Address</button>
      <hr/>
      {/* <h2>GPSLatitude : {GPSLatitude}</h2> */}
      {/* <h2>GPSLongitude : {GPSLongitude}</h2> */}
    </>
  )
}

export default App
