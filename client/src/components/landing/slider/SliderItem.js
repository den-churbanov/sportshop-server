import React from 'react';
import './item.css';
import {useWeather} from "./WeatherContext";

function SliderItem({item, style}) {

    const {months, condition} = useWeather();
    console.log("renderSliderItem");
    let weatherClass;
    switch (item.condition) {
        case condition[0]:
            weatherClass = "clearNoRain";
            break;
        case condition[1]:
            weatherClass = "cloudyLightRain";
            break;
        case condition[2]:
            weatherClass = "cloudyWithoutRain";
            break;
        case condition[3]:
            weatherClass = "partlyCloudy";
            break;
        case condition[4]:
            weatherClass = "fog";
            break;
        case condition[5]:
            weatherClass = "thunderstorm";
            break;
    }

    return (
        <div className="slider-item" style={style}>
            <h4>{item.dayweek}</h4>
            <h3>{item.date.getDate() + " " + months[item.date.getMonth()]}</h3>
            <div className="image-div">
                <div className={"image " + weatherClass}/>
            </div>
            <h3 className="day-temp">{"днём  " + item.tempDay + " °С"}</h3>
            <h4 className="night-temp">{"ночью  " + item.tempNight + " °С"}</h4>
            <p>{item.condition}</p>

        </div>
    );
}

export default SliderItem;