import Layout from "../common/Layout";
import Popup from "../common/Popup";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Masonry from 'react-masonry-component'



export default function Gallery() {
    
    /*
    masonryOptions ; 정렬되는 모양?
    https://www.npmjs.com/package/react-masonry-component 여기서 install 복사해서
    노드에 설치후 사용, 위에 import까지 시켜야 사용됨.
*/

const masonryOptions = { transitionDuration: '0.5s' };
const [Items, setItems] = useState([]);    
const [Loading, setLoading] = useState(true);
const [EnableClick, setEnableClick] = useState(true);
const [Index, setIndex] = useState(0);
const frame = useRef(null);
const input = useRef(null);
const pop = useRef(null);  
 //useRef부모가 쓰는데 자식인pop을 호출해야함. 이걸 자식으로 넘길거고 forwardRef로 가져오기

/*
interest 방식 호출
getFlickr({
    type: 'interest',
})
search 방식 버튼
getFlickr({
    type:'search',
    tags: '검색키워드',
})
*/

const getFlickr = async (opt) => {
    const key = '4612601b324a2fe5a1f5f7402bf8d87a';
    const method_interest = "flickr.interestingness.getList";
    const method_search = "flickr.photos.search";
    const method_user = "flickr.people.getPhotos";
    const num = 50; //50이 적당함
    let url = '';


    if (opt.type === 'interest') {
        url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    }
    if (opt.type === 'search') {
        url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${opt.tags}`;
    }
    if (opt.type === 'user') {
        url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${opt.user}`;
    }
    
    
     // await axios.get(url).then((json) => {
        //     setItems(json.data.photos.photo);
        // })

    // //async함수앞에 붙이면 됨, (url)함수
    // const getFlickr = async (url) => {
    //     const result = await axios.get(url);
    //     setItems(result.data.photos.photo);

    const result = await axios.get(url);
    if(result.data.photos.photo.length === 0) return alert('해당 검색어의 이미지가 없습니다.');
    // console.log(result.data.photos.photo);
    setItems(result.data.photos.photo);
        

    //셋타임아웃을이용해 비동기화 시키고 1초 딜레이를 준뒤 로딩바를 안보이게 false로 바꾼뒤에 on을 프레임에 붙여서 보이게한다.

        setTimeout(()=>{    
           setLoading(false);
            frame.current.classList.add('on'); 
            setTimeout(()=>{
                setEnableClick(true);  //확실한 비동기화를 위해 셋타임안에 또 셋타임해서넣기
            },500); //프레임에 on붙이고 위로올라오는 모션기간동안 0.5s 홀딩
            
        },1000); //이미지 호출이 완료되고 masonry모션 적용시간까지 홀딩하는1초
        
    };

    //위 아래 같은 내용
    // const getFlickr = async (url) => {
    //     await axios.get(url).then((json)=>{
    //         setItems(json.data.photos.photo);
    //     })
    // };

    
    //처음 마운트가 될때 정보를 요청해서 불러와야 한다
    
    // useEffect(()=>{
    //     axios.get(url).then((json)=>{         //json의 형태로 받아온다.
    //         console.log(json.data.photos.photo);
    //     })
    // },[]);

    // type: 'search', tags: "green"
    
    useEffect(() => getFlickr({ type: 'user', user: "196629878@N05"}), []);
    //()=>getFlickr '()=>'이거를 꼭 넣어야함, 함수의 정의형태로 콜백함수가 들어와야한다, 함수를 단순 호출하는 형태는 읽어들일 수 없다.
    const showSearch = () => {
        const result = input.current.value.trim();
        input.current.value = '';
        if(!result) return alert('검색어를 입력하세요.');
        if (!EnableClick) return;
        setEnableClick(false);
        setLoading(true);
        frame.current.classList.remove('on');
        getFlickr({ type: 'user' });
    };

    //쇼서치에 트림적용->공백을없애는메소드

 


    //https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
    return (
        <>
            <Layout name={'Gallery'}>
                {Loading && (
                    <img
                        className="loading"
                        src={`${process.env.PUBLIC_URL}/img/6.gif`}
                    />
                )}

                <div className="controls">
                    <nav>
                        <button
                            onClick={() => {
                                if (!EnableClick) return;
                                //모션중이면 false일테니 return으로 방지
                                setEnableClick(false);
                                //true로 들어와서 다시 false로 바꾸어 재이벤트 방지
                                setLoading(true);
                                frame.current.classList.remove('on');
                                getFlickr({ type: 'interest' });
                            }}
                        >
                            Interest Gallery
                        </button>
                        <button
                            onClick={() => {
                                if (!EnableClick) return;
                                setEnableClick(false);
                                setLoading(true);
                                frame.current.classList.remove('on');
                                getFlickr({ type: 'user', user: "196629878@N05" });
                            }}
                        >
                            My Gallery
                        </button>
                    </nav>
                    <div className="searchBox">
                    <input type="text" ref={input} placeholder='검색어를 입력하세요'
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') showSearch();
                            }} />
                        <button
                            onClick={showSearch}
                        >Search</button>
                    </div>
                </div>
                

                <div className="frame" ref={frame}>
                    <Masonry elementType={'div'} options={masonryOptions}>


                    {Items.map((item,idx)=>{
                        return(
                            <article key={idx}>
                                <div className="inner">
                                    <div className="pic" 
                                    onClick={()=>{
                                        pop.current.open(); //popup에 있는값
                                        setIndex(idx); // youtube에 있는값
                                    }}
                                    >
                                        <img 
                                        src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} 
                                        alt={item.title} />
                                    </div>
                                    <h2>{item.title}</h2>
                                    
                                    <div className="profile">
                                        <img src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`} alt={`${item.owner}`} 
                                        onError={(e)=>{e.target.setAttribute('src','https://www.flickr.com/images/buddyicon.gif');
                                        }}
                                        />
                                        <span
                                            onClick={(e)=>{
                                                if (!EnableClick) return;
                                                setEnableClick(false);
                                                setLoading(true);
                                                frame.current.classList.remove('on');
                                                getFlickr({ type: 'user', user: e.target.innerText });   
                                            }}
                                        >{item.owner}</span>
                                    </div>
                                </div>
                            </article>
                        )
                    })}
                    </Masonry>                
                </div>
            </Layout>

            <Popup ref={pop}>
                {Items.length !== 0 && (  
// {Items.length !== 0 && (  아이템이 비어있지 않다면
                    <img 
                     src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
                )}
            </Popup>
        </>
        
    );
}

// /*
// ? 형태는 쿼리스트링하는 형태의 방법이다
// 쿼리스트링은 ??

// 사용자가 입력 데이터를 전달하는 방법중의 하나로 url주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다.
// 파라미터는 물음표 뒤에 =으로 연결된 key value 부분을 말한다. 
// url에 붙여서 추가적인 정보를 서버측에 전달하는 내용이다. 
// 클라이언트가 어떤 특정 리소스에 접근하고 십어하는지의 정보를 담는것

// 형식(방법)
// : 정해진 앤드포인트 주소이후에 ? 를 쓰는것으로 쿼리스트링이 시작함을 알린다. 
// : parameter = value 로 필요한 파라미터의 값을 적는다
// : 파라미터가 여러개일경우 &를 붙여서 여러개의 파라미터를 넘길수 있다
// : 앤드포인트주소/추가적인주소?파라미터=값&파라미터=값 이런식으로 쓴다

// */