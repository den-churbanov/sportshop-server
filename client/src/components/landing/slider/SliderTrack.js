import React from 'react';
import './styles.css';
import SliderItem from "./SliderItem";

function SliderTrack({items, style}) {
    console.log("renderSliderTrack");
    return (
        <div className="slider-track" style={style.trackStyle}>
            {items.map((item, idx) => {
                return <SliderItem key={idx} item={item} style = {style.itemStyle}/>
            })}
        </div>
    );
}

export default SliderTrack;