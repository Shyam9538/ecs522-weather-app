import Header from './components/Header';
import Cover from './components/Cover';
import Hourly from './components/Hourly';
import 'bootstrap/dist/css/bootstrap.min.css';
import "weather-icons/css/weather-icons.css";
import React, {Component} from 'react';
import Geocode from "react-geocode";
// import componentDidUpdate;
import { useEffect } from 'react';

 
const apiKey="8bcf728dfda203129b2f723df9feb085";

class App extends React.Component{
    
    constructor(){
        super();
        this.state={
            city:undefined,
            country: undefined,
            icon:undefined,
            icon1:undefined,
            main:undefined,
            celcius:undefined,
            temp_max:undefined,
            temp_min:undefined,
            uv:undefined,
            cover:undefined,
            description:"",
            description2:"",
            description3:"",
            error:false,
            dt:undefined,
            city: "Chennai",
            lat:undefined,
            lng:undefined,
            hourly:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
        };
        
        
       
        
        // console.log(this.state)
        //     if (!typeof this.state.lat==="undefined"){
        //     this.getWeather2(this.state.lat, this.state.long);
        // }


        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain : "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere : "wi-fog",
            Clear : "wi-day-sunny",
            Clouds: "wi-day-fog"            
           };
        
        this.intensity = {
            Low: "Low",
            Medium: "Medium",
            High: "High",
            VeryHigh: "High",
            Unknown: "Unknown"
        }

   
    }

    //  async componentDidMount()
    // {
    //     Geocode.setApiKey("AIzaSyAIcIHaj9QikKJrHfntrG1KFwHGpdkahTs");
    //     // Get latitude & longitude from address.
    //     await Geocode.fromAddress(this.state.city).then(
    //         (response) => {
    //             this.setState({lat: response.results[0].geometry.location.lat, lng: response.results[0].geometry.location.lng})
    //             console.log(this.state.lat, this.state.lng);
    //             console.log(this.state)
    //         },
    //         (error) => {
    //             console.error(error);
    //         }
    //     );
    // }

  componentDidMount(){
      this.getWeather();
      console.log(this.state)
  }

    
    
    calCelsius(temp){
        let cell = Math.floor(temp - 273.15);
        return cell;
       }

    cloudCover(cover){
        switch (true) {
            case cover >= 0 && cover < 33:
                this.setState({ description2: this.intensity.Low});
                break;
            case cover >= 33 && cover < 66:
                this.setState({ description2: this.intensity.Medium });
                break;
            case cover >= 66 && cover <= 100:
                this.setState({ description2: this.intensity.High });
                break;
            default:
                this.setState({description2: this.intensity.Unknown});
       }
    }

    uvIntensity(uvIntense){
        switch (true) {
            case uvIntense >= 0 && uvIntense < 2:
                this.setState({ description3: this.intensity.Low});
                break;
            case uvIntense >= 2 && uvIntense <= 7:
                this.setState({ description3: this.intensity.Medium });
                break;
            case uvIntense >= 7 && uvIntense < 11:
                this.setState({ description3: this.intensity.High });
                break;
            case uvIntense > 11:
                this.setState({ description3: this.intensity.VeryHigh });
                break;
            default:
                this.setState({description3: this.intensity.Unknown});
       }
    }
       
    get_WeatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({ icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeId >= 300 && rangeId <= 321:
                return this.weatherIcon.Drizzle
            case rangeId >= 500 && rangeId <= 531:
                this.setState({ icon: this.weatherIcon.Rain });
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case rangeId == 800:
                this.setState({icon: this.weatherIcon.Clear});
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({icon: this.weatherIcon.Clouds});
                break;
            default:
                this.setState({icon: this.weatherIcon.Clouds});
        }
    }

    hourTemp(rangeId){
        for (let index = 1; index < 24; index++) {
            switch (true) {
                case rangeId >= 200 && rangeId <= 232:
                    return this.weatherIcon.Thunderstorm
                case rangeId >= 300 && rangeId <= 321:
                    return this.weatherIcon.Drizzle
                case rangeId >= 500 && rangeId <= 531:
                    return this.weatherIcon.Rain
                case rangeId >= 600 && rangeId <= 622:
                    return this.weatherIcon.Snow
                case rangeId >= 701 && rangeId <= 781:
                    return this.weatherIcon.Atmosphere
                case rangeId == 800:
                    return this.weatherIcon.Clear
                case rangeId >= 801 && rangeId <= 804:
                    return this.weatherIcon.Clouds;
                default:
                    return this.weatherIcon.Clouds;
            }
        }
    }

    getWeather=async()=>{
        const apiCall= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${apiKey}`);
        const response= await apiCall.json().then((response)=>{
            this.setState({
                city : response.name,
                country: response.sys.country,
                temp_max: this.calCelsius(response.main.temp_max),
                temp_min: this.calCelsius(response.main.temp_min),
                description: response.weather[0].description,
                lat:response.coord.lat,
                lng:response.coord.lon
                
                
               });
            this.getWeather2(response.coord.lat, response.coord.lon)
            this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

        })
        
        
           console.log(this.state.lat)
           
           
    };


    getWeather2=async(lat1, long1)=>{
        console.log(long1, lat1)

        const apiCall2= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat1}&lon=${long1}&exclude=minutely,daily&appid=${apiKey}`);
        const response2= await apiCall2.json();
        console.log(this.response2)
        this.setState({
            hourly:response2.hourly.slice(0,24)
        });
        console.log(this.state)
           this.uvIntensity(response2.current.uvi)
           this.cloudCover(response2.current.clouds)
           this.hourTemp(response2.hourly[0].weather[0].id);
           
    };

    render(){
        return(
            <div className='App'> 
            <style>{'body { background-color: #041562; }'}</style>
            <Header 
            city={this.state.city} 
            country={this.state.country}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            weatherIcon={this.state.icon}
            />
            <Cover
            uv={this.state.uv}
            description2={this.state.description2}
            description3={this.state.description3}
            cover={this.state.cover}
            />

            <Hourly
            hourly={this.state.hourly}
            weatherIcon={this.state.icon1}
            dt={this.state.dt}
            hourTemp={this.hourTemp}
            lat={this.state.lat}
            lng={this.state.lng}
            />
            
        </div> 
        );
    }
}


export default App;