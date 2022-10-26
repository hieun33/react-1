import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
//useEffect를 통해 팝되었을때 스크롤 안되게 오버플로우 히든부여
//html 에서는 scss에 부여하지만 리액트에서는 js에 부여

//AnimatePresence 모션이 끝날때까지 컴포넌트의애니메이션유지

const Popup=forwardRef((props,ref)=>{

    const [Open, setOpen] = useState(false); 
    useImperativeHandle(ref,()=>{
        return{
            open : ()=> setOpen(true),
        };
    });

    // useEffect(()=>{
    //         document.body.style.overflow = "hidden";
    //         //overflow = "hidden";으로 팝업시 스크롤안생기게부여

    //         return()=>{
    //             document.body.style.overflow = "auto";
    //         }
    //         //클린업함수 사용, 팝업클로즈 후 overflow hidden 오토로 바꿔서 다시 위아래 스크롤로 움직일수있게함.
    //     },[]);

    useEffect(() => {
        Open ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "auto");
    }, [Open]);


    return(
        <AnimatePresence>
            {Open && (
                <motion.aside className="pop"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate:0,transition: { duration: 1 } }}
                    exit={{ opacity: 0, scale: 0,rotate:0, transition: { duration: 0.5, delay:0.5 } }}>
                    <motion.div 
                    className="con"
                    initial={{opacity:0}}
                    animate={{opacity:1,transition:{duration:0.5,delay:1}}}
                    exit={{opacity:0,transition:{delay:0}}}>{props.children}</motion.div>
                    <motion.span 
                    initial={{x:50, opacity:0}}
                    animate={{x:0, opacity:1, transition:{delay:1}}}
                    className="close" 
                    onClick={() => setOpen(false)}>close</motion.span>
                </motion.aside>
            )}
        </AnimatePresence>


        // AnimatePresence 모션을 줄 요소의 부모요소에 이거로 감싸주기
        // 모션을 줄 요소 앞에 motion.붙이기
        //initial={{객체}}
       
    );
});


export default Popup;

/*
forwardRef 
1단계 : 기존의 컴포넌트 함수를 (popup이라는 컴포넌트 함수를) 대입형으로 전환해줘야한다. 
(선언형은 다른곳에 갖다 쓸수없고 대입형은 prop등으로 갖다 쓸수있음.)

2단계 : 해당 화살표함수를 forwardRef로 감싸, 인수로 전달한다.
3단계 : 화살표함수(forwardRef로 전달되는) 두번째 인수로 ref 추가
4단계 : forwardRef안쪽에 새로운함수호출 : useImperativeHandle 함수호출
5단계 : 해당함수를 객체를반환해서 해당 객체값을 부모 컴포넌트로 전달
6단계 : 부모 컴포넌트에 useRef로 forwardRef로 전달되는 자식 컴포넌트를 참조한다.
7단계 : 

*/