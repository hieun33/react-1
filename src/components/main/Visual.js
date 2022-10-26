import Anime from '../../asset/Anime';
import React, { useRef } from "react"



const btn = {
    position : 'absolute',
    top : 120,
    left : 100,
};


export default function Visual() {


    return (
        <figure id="visual" className='myScroll'>
            <h1>Upgrade Your Skin Care Routine</h1>    
            <p>We introduce the first Face Mask For men. Made to depply recharge your skin, with a sheet<br /> soaked with all active ingredients you need.</p>    
            <ul>
                <a href="#" className="get">GET STARTED</a>
                <a href="#" className="order">ORDER NOW</a>
            </ul> 
            <img src={process.env.PUBLIC_URL + '/img/p1.png'} alt="제품사진" />
            
        </figure>
    )
}

// 스크롤 리사이즈는 윈도우 영역

