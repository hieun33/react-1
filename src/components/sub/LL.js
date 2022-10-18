import { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout"

export default function Location() {

    const { kakao } = window;
    //윈도우 객체에 등록되어 있는 카카오키를 변수명으로 비구조화할당을 한것.
    //윈도우 객체가 카카오 객체를 사용할 수 있도록 하는 코드
    //리액트에서는 카카오인식을 위해 꼭 진행해야함.
    //const kakao = (window).kakao;

    const info = [
        {
            title:"삼성동 코엑스",
            latlng: new kakao.maps.LatLng(37.5116828, 127.059151),
            imgUrl: `${process.env.PUBLIC_URL}img/marker1.png`,
            imgSize: new kakao.maps.Size(232,99),
            imgPos: {offset: new kakao.maps.Point(116, 69)},
        },
        {
            title:"중동 채민집",
            latlng: new kakao.maps.LatLng(37.4941355, 126.7681066),
            imgUrl: `${process.env.PUBLIC_URL}img/marker2.png`,
            imgSize: new kakao.maps.Size(232,99),
            imgPos: {offset: new kakao.maps.Point(116, 69)},
        },
        {
            title:"더 현대",
            latlng: new kakao.maps.LatLng(37.5258975, 126.9284261),
            imgUrl: `${process.env.PUBLIC_URL}img/marker3.png`,
            imgSize: new kakao.maps.Size(232,99),
            imgPos: {offset: new kakao.maps.Point(116, 69)},
        }
    ];


    //var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스 ->리얼돔에서 참조하는 방법으로 해당방법은 가상돔인 리액트에서는 사용할수 없다. -> 그래서 리액트에서는 useRef라는 훅을 이용해 가상으로 생성된 DOM을 참조할 수 있다.

    const container = useRef(null);
    //useRef를 이용해 가상돔을 참조할 변수로 컨테이너를 생성한 뒤, null값으로 빈 구역을 만들어둠
    const btns = useRef(null);
    
    const [Location, setLocation] = useState(null);
    //useEffect에서 만들어진 map_instance를 담을 state를 생성하는것

    const [Traffic, setTraffic] = useState(false);
    //traffic 토글 기능구현을 위한 state값 추가,
    // 블린값을 부여한다.->스위치가 가능한 블린값을 주는것

    const [Info] = useState(info);
    //setInfo는 info가 바뀔일이없고 필요없어 삭제
    const [Index, setIndex] = useState(0);
    //인덱스가 변화될때 렌더링이 필요하므로 useState에 담아 관리하다.
 
    //그냥 지도
    const option = { //지도를 생성할 때 필요한 기본 옵션
	center: Info[Index].latlng, //지도의 중심좌표. 기존 0에서 index로 변경해준다.
	level: 3 //지도의 레벨(확대, 축소 정도)
    };

    //그냥 마커
    const markerPosition  = Info[Index].latlng;
    // 마커위치 인스턴스 생성

    const imageSrc = Info[Index].imgUrl;
    const imageSize = Info[Index].imgSize;
    const imageOption = Info[Index].imgPos; //이거는 뭔지 잘 모르겟음
    //마커 이미지 변경에 필요한 정보값 3개를 등록

    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption);

    const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage
    });     //위치 인스턴스 값을 인수로 전달해서 다시 마커 인스턴스 생성


    //지도에 마커를 셋업 , 최종지도출력상태
    // useEffect 3가지사용 있는데 여기서는 처음 마운트될때 출력되게하는것.
    useEffect(() => {
        container.current.innerHTML = '';
        //지도 인스턴스 최종생성코드
       const map_instance = new kakao.maps.Map(container.current, option); 
       //container.current 리액트에서 current를 붙이는 이유?
       
       marker.setMap(map_instance);
       //지도 인스턴스를 활용해서 마커를 생성하는 코드

       setLocation(map_instance);   

       const mapTypeControl = new kakao.maps.MapTypeControl();
       map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

       const zoomControl = new kakao.maps.ZoomControl();
        map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

       for(const btn of btns.current.children) btn.classList.remove("on");
       btns.current.children[Index].classList.add("on");

       window.addEventListener("resize",()=>{
            map_instance.setCenter(Info[Index].latlng); //리사이즈할때ㅔ
       });
    }, [Index]); //<--기존 컴포넌트가 처음 마운트 되었을때만 지도를 출력하다가, index가 변경될때 지도가 렌더링 되는 방식으로 바꿈(업데이트시 랜더링)


        
        //트래픽 토글전용 useEffect 
    useEffect(()=>{
        if(!Location) return; //location값이 비어있으면 return해라
        //location state값은 두번째 호출부터 값이 담겨 사이클이 돌아가므로 처음값이 존재하지 않는 초기오류방지를 위해 조건문 처리함

        //트래픽값에 따라서 생성과 삭제로 나누어서 코드를 제공, 구현
        Traffic 
            ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) 
            : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)

    },[Traffic]); //<--트래픽스테이트의 값이 변경될때 마다 실행이 되는 구문
     

    return (
        <Layout name={"Location"}>
            <div id="map" ref={container}></div>
            
            {/* 기존의 두개의 버튼에서 한개의 토글버튼으로 바꿈 
            버튼 클릭시 트래픽값을 반전처리=> !traffic  */}

            <div className="btnSet">
                <button onClick={()=>{ setTraffic(!Traffic) }}>
                    {Traffic ? "Traffic Off" : "Traffic On"}
                    {/* Traffic 값에 따라 버튼의 내용도 변경 */}
                </button>

                <ul className="branch" ref={btns}>
                    {/* 각 버튼을 클릭할때 마다 index 값을 변경 */}
                    {
                        Info.map((el, idx) => {
                            // let on = '';
                            // Index === idx ? (on = "on") : (on = '');
                            return(
                                <li key={idx} onClick={() => setIndex(idx)}>{el.title}
                                </li>
                            );
                    })
                }
                </ul>
            </div>
        </Layout>
    );
}

 {/* 
                <li key={idx} onClick={()=>setIndex(idx)}>{el.title}</li>
                위와 아래 셋 같음.
                <li onClick={()=>setIndex(0)}>삼성동 코엑스</li>
                <li onClick={()=>setIndex(1)}>중동 채민집</li>
                <li onClick={()=>setIndex(2)}>더 현대</li>
                 */}




//  return (
//     <Layout name={"Location"}>
//     <div id="map" ref={container}></div>

//     <button onClick={()=>{Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}}>
//         Traffic On
//     </button>

//     <button onClick={()=>{Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}}>
//         Traffic Off
//     </button>
// </Layout>
// );