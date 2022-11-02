//npm i axios
import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Popup from "../common/Popup";

﻿//웹폰트 아이콘을 연결한 컴포넌트 파일 상단에 import구문 입력 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

//컴포넌트 함수으 리턴문 안쪽에 아이콘 컴포넌트 추가 
//크기와 색상은 font-size, color값으로 변경가능



export default function About() {
    
    const path = process.env.PUBLIC_URL;
    const [Members, setMembers] = useState([]);
    const icon = useRef


    useEffect(() => {
        axios.get(`${path}/DB/members.json`).then((json) => {
            setMembers(json.data.members);
        })
    }, []);

    useEffect(() => {
        console.log(Members);
    }, [Members]);


 
    return (
       <>
         <Layout name={'About'}>
             {Members.map((data, index) => {
                 return (
                
                    <>
                    <article key={index}>         
                            
                        
                        <div className="inner">   
                        
                            <div className="pic">
                                <img src={`${path}/img/${data.pic}`} alt={data.name} />
                            </div>
                            <h3>{data.name}</h3>
                            <p>{data.positon}</p>
                            <ul className='icon-list'>
                            <li><a href="" ><FontAwesomeIcon icon={faFacebookF} /></a></li>
                            <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                            <li><a href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                            </ul>  
                            <br />
                            {data.scr}  
                             
                            
                             
                        </div>

                    </article>
                    
                    
                    </>
                 );
             })}
        
        
         </Layout>
        
        
       </>

        
    );
}