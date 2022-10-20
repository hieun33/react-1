import { useEffect, useState } from "react";

function News(){
 
    
    //getLocalData의 주요기능 초기데이터 로딩을 여기서 해줌.
    const getLocalData = () =>{
        const dummyPosts = [
                {title : 'hello5', content: 'here comes description in details'},
                {title : 'hello4', content: 'here comes description in details'},
                {title : 'hello3', content: 'here comes description in details'}, // enableUpdate :true
                {title : 'hello2', content: 'here comes description in details'},
                {title : 'hello1', content: 'here comes description in details'},
                
            ];
        const data = localStorage.getItem('post');
        
        //만약 데이타가 있으면
        if(data){
            return JSON.parse(data);
        //데이타를 제이슨형태로 묶어서 가져온다.
        }else{ //데이타가 없으면 더미 가져온다.
            return dummyPosts;
        }
        
     } ;
    // const [Posts, setPosts] = useState([]);
    const [Posts] = useState(getLocalData());
    //더미데이터만 가저오는거라 셋함수 필요없고 초기데이터로 getLocalData넣어야함.

   

    //로컬스토라지에 있는 값을 가져올것임
    useEffect(()=>{
        localStorage.setItem('post',JSON.stringify(Posts));
    },[]);
    //처음한번만 가져올거라[]빈배열 , 초기마운트가 될때 딱 한번만


    return(
        <main id="news" className='myScroll'>
            <h1>News</h1>
            {Posts.map((post,idx)=>{
                if (idx >=5) return; //5개의 인덱스만 가져다 달라는 의미

                return(
                    <article key={idx}> 
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </article>
                );

            })}


        </main>
    );
}

export default News;