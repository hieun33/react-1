import { useEffect, useRef, useState } from "react";
import Header from "../common/Header";
import News from "./News";
import Pics from "./Pics";
import Vids from "./Vids";
import Visual from "./Visual";
import Btns from "./Btns";
import Anime from "../../asset/Anime";

function Main(){
    const main = useRef(null); //참조값
    const pos = useRef([]);   //변수를 useref에 저장 getpos하려고 만든것
    let secs = null;
    //섹션 선언, const였는데 let으로 전역변수로 바꿈 다른데서도 쓰기위해서

    const [Index, setIndex] = useState(0);
    //스크롤을 클릭해서 변화시킬수잇게 usestate사용 근데 인덱스를 사용해서 변화시킬거라서
    //[Index, setIndex]사용

    const [Scrolled, setScrolled] = useState(0);

    //getpos의 역할 : 스크롤의 위치값을 알아내는함수 offsetTop값
    const getPos = ()=>{
        pos.current = []; //pos값을 버리고
        //메인의 마이스크롤이라는애들을 잔뜩데려올것. 다시담고
        secs = main.current.querySelectorAll('.myScroll');
        //섹션 선언, const였는데 let으로 전역변수로 바꿈 다른데서도 쓰기위해서
        
        for (const sec of secs) pos.current.push(sec.offsetTop);
        //반복을 돌면서 각sec섹션에 오프셋탑값을 넣을것,각각의높이
        console.log(pos.current);
    }

    //스크롤에 따라 버튼활성화
    const activation =  ()=>{
        const base = -window.innerHeight / 2; //현화면의 절반이 넘어가면 스크롤btn이 내려감
        const scroll = window.scrollY; //진짜스크롤값
        const btns = main.current.querySelectorAll('.scroll_navi li')

        setScrolled(scroll);

        pos.current.map((pos,idx)=>{
            //현재 스크롤한 값과 pos의 값을 비교해서
            if(scroll >= pos + base){
                //btns에 반복을 돌며 각각의요소btn에 //일단 모두 비활성화 
                for(const btn of btns) btn.classList.remove('on');
                for(const sec of secs) sec.classList.remove('on');
                //특정버튼을 활성화
                btns[idx].classList.add('on');
                secs[idx].classList.add('on');

            }

            
        });
    };

    useEffect(()=>{
        getPos();
        //리사이즈 이벤트가 발생하면 스크롤 값을 다시 불러온다.
        window.addEventListener('resize', getPos);
        //스크롤이벤트가 발생하면  activation 함수를 가져온다.
        window.addEventListener('scroll', activation);
        //끝나면 다 리무브한다.
        return () => {
        window.removeEventListener('resize',getPos);
        window.removeEventListener('scroll', activation);

        }
        
    },[]);

    //인덱스로 효과를 나타내기
    useEffect(()=>{
        new Anime(window,{
            prop : 'scroll',
            value : pos.current[Index],
            duration : 500, //0.5s

        });
    },[Index]);
    /*
    리액트를 사용하는 프로젝트에서도 간혹 리얼돔을 직접 선택해야 하는 상황이 종종 발생한다.
    예> input에 focus를 주거나, 지금과 같은 스크롤 위치 알아내기, 특정 DOM의 크기를 측정할때 사용

    왜 리액트에서 뭐리셀렉터를 지양하라고 하는가?
    이유: 리얼돔보다 가상돔의 참조값이 리액트에게는 더 신뢰할 만한 값이기 때문
    그래서 ref를 이용해 참조한다. 

    그러면 쿼리셀렉터는 사용하면 안되나요? 아니다~
     document.querySelector : 명령형 (a에서 c 가는데 a-b b-c 로 가,전부 알려줌)

    main.current.querySelector :선언형 (a에서 c 가는데 알아서가)

    ref대신 querySelector?
    ref도 남발하면 문제가 된다.
    >>리액트의 생명주기때문에

    결론은 ref든 쿼리셀렉터든 리액트의 생명주기 사이클에 영향을 주면 안된다.


    */

    return(
        <main ref={main}>
        <Header type={'main'}/>
        <Visual />        
        <Pics Scrolled={Scrolled} start={pos.current[2]} />
        <Vids />
        <News />
        <Btns setIndex={setIndex} />
        
        </main>
    );
}

export default Main;