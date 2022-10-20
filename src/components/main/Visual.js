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
           <button
            style={btn}
            onClick={()=>{
                new Anime(window,{
                    prop: 'scroll',
                    value: 954,
                    duration : 500,
                });
            }}
            >button</button>
            
        </figure>
    )
}

// 스크롤 리사이즈는 윈도우 영역
