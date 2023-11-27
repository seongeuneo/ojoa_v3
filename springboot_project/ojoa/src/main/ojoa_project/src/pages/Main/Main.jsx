import React from 'react';
import '../../pages/Main/Main.css';
import SlideImg from '../../pages/Main/SlideImg';
import FlipRoom from './FlipRoom';
import MiniSection from './MiniSection';


const Main = () => {
    return (
        <div className="Main">
            <SlideImg />
            <FlipRoom/>
            <MiniSection/>
        </div>
    );
};

export default Main;