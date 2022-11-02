import { useEffect, useRef, useState } from "react";
import Layout from "../common/Layout";

export default function Location(){

    const { kakao } = window;
      // 윈도우 객체에 등록되어 있는 카카오키를 변수명으로 비구조화할당을 한것.
  // 윈도우 객체가 카카오 객체를 사용할 수 있도록 하는 코드.
  // const kakao = (window).kakao;

    const info = [
        {
            title:"삼성동 사무실",
            latlng: new kakao.maps.LatLng(37.5116828, 127.059151),
            imgUrl: `${process.env.PUBLIC_URL}/img/marker.png`,
            imgSize: new kakao.maps.Size(70,70),
            imgPos: {offset: new kakao.maps.Point(116, 69)},
        },
        {
            title:"중동 사무실",
            latlng: new kakao.maps.LatLng(37.4941355, 126.7681066),
            imgUrl: `${process.env.PUBLIC_URL}/img/marker.png`,
            imgSize: new kakao.maps.Size(70,70),
            imgPos: {offset: new kakao.maps.Point(70, 69)},
        },
        {
            title:"더 현대 사무실",
            latlng: new kakao.maps.LatLng(37.5258975, 126.9284261),
            imgUrl: `${process.env.PUBLIC_URL}/img/marker.png`,
            imgSize: new kakao.maps.Size(70,70),
            imgPos: {offset: new kakao.maps.Point(70, 69)},
        }
    ];


    const container = useRef(null);
    const btns = useRef(null);

    const [Location, setLocation] = useState(null); //useEffct에서 만들어진 지도 인스턴스를 담을 state를 생성하는것
    const [Traffic, setTraffic] = useState(false); // Traffic 토글 기능 구현을 위한 state을 추가, 불림값을 부여한다. 스위치가 가능한 불린값을 주는것
    const [Info] = useState(info); //setInfo 는 info가 바뀔 일이 없으므로 필요가 없다
    const [Index, setIndex] = useState(0); //인덱스가 변화될때 렌더링이 필요하므로 useState에 담아 관리한다


    // 지도
    const option = {
        center: Info[Index].latlng,  //기존 0에서 Index로 변경해준다
        level: 3
    }

    //마커
    const markerPosition = Info[Index].latlng;
    const imageSrc = Info[Index].imgUrl;
    const imageSize = Info[Index].imgSize;
    const imageOption = Info[Index].imgPos ;

    const markerImage = new kakao.maps.MarkerImage(
        imageSrc, imageSize, imageOption
    );

    const marker = new kakao.maps.Marker({
        position : markerPosition,
        image : markerImage
    });

    //마커가 지도에 표시되어 나타나는 모양
    useEffect(()=>{
        const map_instance = new kakao.maps.Map(container.current, option);
        marker.setMap(map_instance);
        setLocation(map_instance);

        const mapTypeControl = new kakao.maps.MapTypeControl();
       map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

       const zoomControl = new kakao.maps.ZoomControl();
        map_instance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // for (const btn of btns.current.children) btn.classList.remove("on");
        // btns.current.children[Index].classList.add("on");

        window.addEventListener("resize", ()=>{
            map_instance.setCenter(Info[Index].latlng);
        });
    },[Index]); //<--- 기존 컴포넌트가 처음 마운트 되었을 때만 지도를 출력하던 방식에서, Index 가 변경될때 지도가 다시 렌더링 되는 방식으로 바꿈

    //트래픽 토글전용 useEffect
    useEffect(()=>{
        if(!Location) return;
         //Location state의 값은 두번째 호출부터 값이 담겨 사이클이 돌아가므로 처음 값이 존재하지 않는 초기 오류방지를 위해 조건문 처리함

         //트레픽값에 따라서 생성과 삭제로 나누어서 코드를 제공, 구현
         Traffic
         ? Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
         : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    },[Traffic]);  //<---[Traffic] traffic state의 값이 변경될때 마다 실행이 되는 구문

    return(
        <Layout name={"Location"}>
            <div id="map" ref={container}></div>
            
            <div className="btnSet">
            {/* 두개버튼에서 한개버튼으로 수정, 버튼클릭시 트래픽값을 반전처리=> 버튼클릭하면 트래픽값이 true면 false로 false면 true로 반전처리한다는뜼 */}
            <button onClick={()=>{setTraffic(!Traffic)}}>
                
            {/* 트래픽 값에 따라 버튼 내용도 변경시킨다 */}
            {Traffic ? 'Traffic Off' : 'Traffic On'}
            </button>

            <ul className="branch" /*ref={btns}*/>
                { Info.map((el, idx)=>{
                    let on='';
                    Index === idx ? (on='on') : (on = '');
                    return(
                        <li key={idx} onClick={()=> setIndex(idx)} className={on}>{el.title}</li>
                    );})}
            </ul>


            </div>
            
            

        </Layout>

    );
    }

/* 
트래픽 온오프 버튼 두개 만들기
<Layout name={"Location"}>
            <div id="map" ref={container}></div>

            <button onClick={()=>{
                Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            }}>
                Traffic On
            </button>
            <button onClick={()=>{
                Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
            }}>
                Traffic off
            </button>

        </Layout>
         */

/* 장소버튼 3개
<ul className="branch">
                //각 버튼을 클릭할때 마다 Index의 값을 변경 
                <li onClick={() => setIndex(0)}>삼성동 코엑스</li>
                <li onClick={() => setIndex(1)}>올림픽 공원</li>
                <li onClick={() => setIndex(2)}>서울 시청</li>
            </ul>
*/
