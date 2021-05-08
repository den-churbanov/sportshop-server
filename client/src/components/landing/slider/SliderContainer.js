import React, {useState} from 'react';
import './styles.css';
import SliderTrack from "./SliderTrack";
import  {useWeather} from './WeatherContext';

function SliderContainer() {
    const itemMargin = 5;
    const wrapperWidth = 830;
    const  {weather} = useWeather();

    const [sliderState, setSliderState] = useState({
        position: 0,
        slidesToShow: 4,
        slidesToScroll: 1
    });

    const btnPrevClick = (e) => {
        if (sliderState.position == 0) return;
        setSliderState(prevState => {
            return {
                ...prevState,
                position: prevState.position + prevState.slidesToScroll,
            }
        });
    }

    const btnNextClick = (e) => {
        if (Math.abs(sliderState.position) == weather.length - sliderState.slidesToShow) return;
        setSliderState(prevState => {
            return {
                ...prevState,
                position: prevState.position - prevState.slidesToScroll,
            }
        });
    }

    const itemWidth = (wrapperWidth - (sliderState.slidesToShow * 2 - 2) * itemMargin) / sliderState.slidesToShow;
    const scrollX = itemWidth + 2 * itemMargin;
    const styles = {
        trackStyle:{
            transform: `translateX(${sliderState.position * scrollX}px)`,
        },
        itemStyle:{
            minWidth: `${itemWidth}px`
        }
    }

    console.log("renderSliderContainer");
    return (
        <div className="wrapper" style={{width: `${wrapperWidth}px`}}>
            <div className="slider-container">
                <SliderTrack items={weather} style={styles}/>
            </div>
            <div className="slider-buttons">
                <input type="button" value="Назад" onClick={btnPrevClick}/>
                <input type="button" value="Вперёд" onClick={btnNextClick}/>
            </div>
        </div>


    );
}

export default SliderContainer;