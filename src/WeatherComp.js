import React, { Component, createRef } from 'react'


// console.dir(React.Component)

export default class WeatherComp extends Component {

    state={
        city:"Berlin",
        temp:7,
        maxTemp:14,
        minTemp:2,
        description:"it is rainy today",
        code:"10d",
      
        errorMessage:""

    }
    cityName= createRef()
    degree= createRef()

    componentDidMount() {
        console.log("`********* first render finished ************`")
        this.fetchWeatherData(this.state.city)
    }

    getCityName=(e)=> {
        this.setState({inputValue:e.target.value})
    }

    submitForm=(e)=>{
        e.preventDefault()
        console.log("submitted data");
        console.log(this.degree)

        if(this.cityName.current.value.trim()!==""){
            this.fetchWeatherData(this.cityName.current.value)
        } else {
            this.setState({errorMessage: "please enter city name in input field"})
    }
    

    }

    fetchWeatherData=(city)=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
        .then(res=>res.json())
        .then(data=>{
            if(data.cod===200){

                this.setState({
                city: data.name
                ,temp: data.main.temp
                ,maxTemp: data.main.temp_max
                ,minTemp: data.main.temp_min
                ,description: data.weather[0].description
                ,code: data.weather[0].icon
            })
            
            } else {
                this.setState({errorMessage:data.message})
            }
        })
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log("********** should component update*****************")
        if(JSON.stringify(nextState)===JSON.stringify(this.state)){
              return false;
        } else{
            return true
        }
    
}
    render() {

        console.log("*************** render ************************")
        const {city, temp, maxTemp, minTemp, description, code, errorMessage} =this.state

        return (
            <div>
                <h1 className="app">OpenWeather API &#x2601;</h1>

                <form onSubmit={this.submitForm}>

                    <input ref= {this.cityName} type="text" name="city" className="input" onFocus={()=>this.setState({errorMessage:""})}/>

                    <input type="submit" value="get weather" className="click" />
                </form>

                <h3 style={{color:"green"}}>{errorMessage}</h3>
                
                <div className="top">
                    <h2>{city}</h2>
                    <p>{description}</p>
                    <div className="image">
                        <img src={`https://openweathermap.org/img/wn/${code}@2x.png`} alt="" width="120" height="120" /> 
                    </div>
                    
                </div>
                    <div className="bottom"></div>
                    <div className="left" ref={this.degree}>
                        <p>Current:   {temp} C</p> 
                    </div>

                <div className="right">
                    <p>Max Temp: {maxTemp} C</p>
                    <p>Min Temp: {minTemp} C</p>
                   
                </div>
            </div>
        )
    }
}
