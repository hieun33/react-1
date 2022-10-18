//npm i axios
import Layout from "../common/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Department() {
    const path = process.env.PUBLIC_URL;
    const [Members, setMembers] = useState([]);


    useEffect(() => {
        axios.get(`${path}/DB/members.json`).then((json) => {
            setMembers(json.data.members);
        })
    }, []);


    useEffect(() => {
        console.log(Members);
    }, [Members]);




    return (
        <Layout name={'Department'}>
            {Members.map((data, index) => {
                return (
                    <article key={index}>
                        <div className="inner">
                            <div className="pic">
                                <img src={`${path}/img/${data.pic}`} alt={data.name} />
                            </div>
                            <h3>{data.name}</h3>
                            <p>{data.position}</p>
                        </div>
                    </article>
                );
            })}


        </Layout>
    );
}