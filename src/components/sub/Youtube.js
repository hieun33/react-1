import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Popup from "../common/Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {faFacebookF, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";


export default function Youtube() {

    const pop = useRef(null);
    const [Vids, setVids] = useState([]);
    // const [Open, setOpen] = useState(false); //처음값false;오픈해야 true되게
    const [Index, setIndex] = useState(0);
    

    useEffect(() => {
        const key = 'AIzaSyAKqZ1Dx9awi1lCS84qziASeQYZJqLxLSM';
        const playlist = "PLcwo0_Iyc0sv6RPe5ZBKAKeLe6kBTN7bF";
        const num = 6;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

        axios.get(url).then((json) => {
            //console.log(json.data);
            setVids(json.data.items);
        })
    }, []);

   
    return (
        <>
        <Layout name={"Youtube"}>
        

            {Vids.map((data, index) => {

                const tit = data.snippet.title;
                const desc = data.snippet.description;
                const date = data.snippet.publishedAt;

                return (
                   
                    
                    <article key={index}>
                    
                        <h3>{tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h3>
                        <div className="txt">
                            <p>{desc.length > 100 ? desc.substr(0, 100) : desc}</p>
                            <span>{date.split('T')[0]}</span>
                        </div>
                        {/* setOpen사용 변화를감지하고 재랜더링 그래고 오픈 */}
                        <div className="pic" onClick={()=>{ 
                            pop.current.open();
                            // setOpen(true)
                            setIndex(index)}}>
                            <img
                                src={data.snippet.thumbnails.standard.url}
                                alt={data.snippet.title} />
                        </div>
                        <a><FontAwesomeIcon icon={faHeart} />
                        </a>
                    </article>
                    
                    
                );
            })}

        </Layout>

         {/* {Open && <Popup setOpen={setOpen}>
                <iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameBorder='0' ></iframe>
            </Popup>}
        {/* setOpen 되어 팝업 */} 
         <Popup ref={pop}>
            {Vids.length !== 0 && (  
            <iframe src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`} frameBorder='0' ></iframe>)}
            </Popup>
        </>

        
    );
}