import { useEffect,useState } from 'react'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
import 'leaflet/dist/leaflet.css'
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import SideBar from '../SideBar';
import './index.css'

const ChartsAndMaps=()=>{
    const [cases,setCases]=useState([])
    const [countries,setCountries]=useState([])

    const customIcon=new Icon({
        iconUrl:'https://cdn-icons-png.flaticon.com/128/2642/2642502.png',
        iconSize:[38,38]
    })
    const markers=[
        {geocode:[33,65],countryName:"Afganisthan"}
    ]
    const getCases=async()=>{
        const response=await fetch('https://disease.sh/v3/covid-19/all')
        const data=await response.json()
        console.log('cases',data)
    }

    const getCountrySpecificCases=async()=>{
        const response=await fetch('https://disease.sh/v3/covid-19/countries')
        const data=await response.json()
        const formattedData=data.map(item=>({
            ...item,geoCode:[item.countryInfo.lat,item.countryInfo.long]
        }))
        setCountries(formattedData)
        console.log('country specific cases',formattedData)
    }

    const getCasesWithDate=async()=>{
        const response=await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
        const data=await response.json()
        const formattedCases=Object.entries(data.cases).map((e) => ( { "caseDate":e[0],"cases": e[1] } ))
        const formattedDeaths=Object.entries(data.deaths).map((e) => ( { "caseDate":e[0],"deaths": e[1] } ))
        const formattedRecovered=Object.entries(data.recovered).map((e) => ( { "caseDate":e[0],"recovered": e[1] } ))
       const resultArr= formattedCases.map((item, i) => Object.assign({}, item, formattedDeaths[i],formattedRecovered[i]));
       setCases(resultArr) 
       console.log('cases with date',resultArr)
    }

    useEffect(()=>{
        getCases()
        getCountrySpecificCases()
        getCasesWithDate()
    },[])

    return(
        <div className='display-column'>
            <div className='charts-maps-header'>
                <h2>Charts And Maps</h2>
            </div>  
        <div className='display-row'>
            <SideBar/>
            <div>
            <LineChart className='linechart-container' width={800} height={300}  data={cases}>
      <Line type="monotone" dataKey="cases" stroke="#2196F3" strokeWidth={1} />
      <Line
        type="monotone"
        dataKey="deaths"
        stroke="#F44236"
        strokeWidth={1}
      />
      <Line type="monotone" dataKey="recovered" stroke="#FFCA29" strokeWidth={1} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="caseDate" />
      <YAxis />
      <Tooltip />
      <Legend />
            </LineChart>
            <MapContainer center={[48.8566,42.3522]} zoom={13} className='leaflet-container' >
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
            countries.map(countryObj=><Marker key={countryObj.country} position={countryObj.geoCode} icon={customIcon}>
                <Popup>
                    <h2>Country Name: {countryObj.country}</h2>
                    <p>Active Cases: {countryObj.active}</p>
                    <p>Recovered Cases: {countryObj.recovered}</p>
                    <p>Deaths: {countryObj.deaths}</p>
                    </Popup>
            </Marker>)
            }
            </MapContainer>
            </div>
        </div>
    </div>
    )
}
export default ChartsAndMaps