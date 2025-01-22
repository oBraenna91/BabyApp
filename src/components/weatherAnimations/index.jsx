import React from 'react';
import Sun from '../../animations/sun.json';
import Lottie from 'lottie-react';

export default function WeatherAnimation() {
    return(
        <div>
            <Lottie animationData={Sun}/>
        </div>
    )
}