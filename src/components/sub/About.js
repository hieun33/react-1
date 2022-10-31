//npm i axios
import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import Popup from "../common/Popup";

export default function About() {
    
    const path = process.env.PUBLIC_URL;
    const [Members, setMembers] = useState([]);
    ;


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
                    
                     <article key={index}>
                        
                         <div className="inner">
                             
                             <div className="pic">
                                 <img src={`${path}/img/${data.pic}`} alt={data.name} />
                             </div>
                             <h3>{data.name}</h3>
                             <p>{data.positon}</p>
                             
                         </div>
                         <h4>The members had various experiences. There are people who have tried to start a business, and there are people who were customers and then joined because they fell in love with the product. Thanks to such a colorful background, a free culture was formed. Meet the charming members who are making the company.</h4>
                     </article>
                 );
             })}
        
        
         </Layout>
        
        
       </>

        
    );
}