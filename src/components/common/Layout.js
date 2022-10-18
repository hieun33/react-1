import { useRef, useEffect } from 'react';
function Layout(props) {
    const frame = useRef(null);

    useEffect(() => {
        frame.current.classList.add("on");
    }, []);

    return (
        <section className={`content ${props.name}`} ref={frame}>
            <figure></figure>
            <div className="inner">
                <h1>{props.name}</h1>
                {props.children}
            </div>
        </section>
    );
}
export default Layout;

/*
useEffect

- 컴포넌트가 마운트 되었을때
=> 처음나타났을때 <---
=> props로 받은 값을 컴포넌트의 로컬상태로 설정할때
=> 외부  API요청이 있을때 
=> setIntercal, setTimeout 통해 작업이 예약될때

- 컴포넌트가 언마운트 되었을때
=> 사라질때 
=> setIntercal, setTimeout을 사용하여 등록한 작업들이 클리어 되었을때
=> 라이브러리 인스턴스가 제거됬을때

- 컴포넌트가 업데이트될때
=> 특정 props가 바뀔때


useRef

-js비유하자면 쿼리셀럭터로 해당돔을 선택하는용도(참조)

- 변수를 저장하는 용도 : 랜더링을 발생시키지 않음 ,변하지않음 
 current : ()<===해당값이 저장됨
*/